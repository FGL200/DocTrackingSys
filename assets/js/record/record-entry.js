import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

let global_rotate = 0;
let global_remarks = [];
let global_record = undefined;

(async () => {
  Helper.importCSS("record/record-entry")
  await Load_Data();
})();

async function Load_Data() {
  const resp = (await Helper.api(`student/record/${const_record_name}`, 'json')).result;
  let record = getStudentInformationObject(resp);
  global_record = record;
  console.log({ resp, record })


  // *************************************
  // *          Bind Shelf Name          *
  // *************************************
  const shlef_name = Helper.f("#shelf_name");
  shlef_name.innerHTML = `Shelf ${record.shelf.Name}`;
  shlef_name.href = `${base_url}shelf/entry/${record.shelf.Name}`;


  // ******************************************************
  // *          Bind Student Record Information           *
  // ******************************************************
  Helper.formBindValues("#information_form", record.student);


  // **********************************
  // *          Bind Remarks          *
  // **********************************
  record.remarks.forEach(v => addRemarks(v));
  Load_RemarksFunctionality();



  // **************************************
  // *          Handle Documents          *
  // **************************************
  Helper.ObjectToArray(record.documents).forEach(v => {
    Helper.f(`#${v.name}`, parent => {
      const el_conatiner = Helper.find(parent, '.alert')[0];                // element of input file
      const el_input_file = Helper.find(parent, 'input[type="file"]')[0];   // element of input file
      const el_input_cb = Helper.find(parent, 'input[type="checkbox"]')[0]; // element of checkbox
      const el_btn_file_add = Helper.find(parent, '.add_image')[0];         // element of button file for adding file
      const el_btn_file_rem = Helper.find(parent, '.remove_image')[0];      // element of button file for removing file
      const el_btn_view = Helper.find(parent, '.view_image')[0];            // element of view image


      // **********************************************
      // *          When checkbox is changed          *
      // **********************************************
      Helper.on(el_input_cb, "change", () => {
        if (el_input_cb.checked) {
          setContiner(el_conatiner, 'success');
          setDisabledClass(el_btn_file_add, false)
        } else {
          setContiner(el_conatiner, 'secondary');
          setDisabledClass(el_btn_file_add, true)
        }
      });


      // *******************************************
      // *          When image is uploaded         *
      // *******************************************
      Helper.on(el_input_file, "change", () => {
        const files = el_input_file.files;
        if (files.length > 0) {
          setDisabledClass(el_btn_view, false);

          for (const img of files) {
            if (!img.type.match('image/*')) {
              CustomNotification.add("Error", "Files uploaded conatains non-image.")
              return;
            }

            const file_reader = new FileReader();
            file_reader.onload = (e) => {
              v.value.dir += `,${e.target.result}`;
              if (v.value.dir[0] == ',') v.value.dir.replace(',', '');
            }
            file_reader.readAsDataURL(img);
          }

          setDisplayNoneClass(el_btn_file_add, true);
          setDisplayNoneClass(el_btn_file_rem, false);

        } else {
          setDisabledClass(el_btn_view, true);
        }
      });


      // ******************************************
      // *          When view is clicked          *
      // ******************************************
      Helper.on(el_btn_view, "click", async () => {


        // *****************************************
        // *          Initialize Carousel          *
        // *****************************************
        const saved_images = []
        const raw = (v.value.dir.split(','));
        for (let i = 0; i < raw.length; i++) {
          const v = raw[i];

          if (v.includes('data:image/jpeg;base64')) {
            saved_images.push(raw[i] + ',' + raw[i + 1]);
            ++i;
          } else {
            if (v == '') continue;
            saved_images.push(v);
          }
        }
        let items = '';
        saved_images.forEach((v, i) => items += `
          <div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="0">
            <div class="d-flex justify-content-center w-100">
              <img src="${v}" class="d-block w-75 rotate" alt="...">
            </div>
          </div>
        `);
        Modal.setTitle('View Image');
        Modal.setBody(`
          <div id="document_images" class="carousel carousel-dark slide" data-bs-ride="carousel"> 
            <div class="carousel-inner">${items}</div>
            <button class="carousel-control-prev reset-rotate" type="button" data-bs-target="#document_images" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next reset-rotate" type="button" data-bs-target="#document_images" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        `);
        // Modal.setFooter('<small class="w-100"><i class="bi bi-info-circle"></i> Click to rotate. Scroll to zoom in and out.</small>')
        Modal.setFooter('<small class="w-100"><i class="bi bi-info-circle"></i> Click to rotate.</small>')
        Modal.open();


        // ***************************************
        // *          Rotetion of image          *
        // ***************************************
        global_rotate = 0;
        Helper.fm("img.rotate", simg => Helper.on(simg, "click", () => {
          Helper.fm('.reset-rotate', rr => Helper.on(rr, "click", () => {
            global_rotate = 0;
            simg.style.transform = `rotate(${global_rotate}deg)`;
          }));
          global_rotate += 90;
          if (global_rotate >= 360) global_rotate = 0;
          simg.style.transform = `rotate(${global_rotate}deg)`;
        })); // emd of image rotate


      }); // end of view is clicked


      // **************************************************
      // *          When remove image is clicked          *
      // **************************************************
      Helper.on(el_btn_file_rem, "click", async () => {
        Modal.setTitle('Remove Images');
        Modal.setBody('<div class="alert alert-danger">This document contains images. Are you sure you want to <b>Overwrite</b> it?</div>');
        Modal.setFooter(await Modal.button('Overwrite', 'danger'))
        Modal.open();
        Modal.submit(() => {
          v.value.dir = "";
          setDisplayNoneClass(el_btn_file_add, false);
          setDisplayNoneClass(el_btn_file_rem, true);
          setDisabledClass(el_btn_view, true);
          el_input_file.value = null;
          Modal.close();
        });
      });


      // **************************************
      // *          Vlidate documets          *
      // **************************************
      if (v.value.val == 1) el_input_cb.click();
      if (v.value.dir != "") {
        setDisabledClass(el_btn_view, false);
        setDisplayNoneClass(el_btn_file_add, true);
        setDisplayNoneClass(el_btn_file_rem, false);
      }

      ``
    }); // end of getting every <div> corresponding to a document
  }); // end of iteration of documents
}





// ****************************************
// *          Ducoment Functions          *
// ****************************************
function setContiner(node, type = 'success') {
  if (type == 'success') {
    node.classList.remove('alert-secondary');
    node.classList.add('alert-success');
  } else {
    node.classList.remove('alert-success');
    node.classList.add('alert-secondary');
  }
}

function setButtonFile(node, type = 'success') {
  if (type == 'success') {
    node.classList.remove('btn-danger');
    node.classList.add('btn-success');
    Helper.find(node, 'i.sym', icon => {
      icon.classList.remove('bi-dash')
      icon.classList.add('bi-plus')
    });
  } else {
    node.classList.remove('btn-success');
    node.classList.add('btn-danger');
    Helper.find(node, 'i.sym', icon => {
      icon.classList.remove('bi-plus')
      icon.classList.add('bi-dash')
    });
  }
}

function setDisabledClass(node, disabled = true) {
  if (disabled) {
    node.classList.add("disabled");
  } else {
    node.classList.remove("disabled");
  }
}

function setDisplayNoneClass(node, displayNone = true) {
  if (displayNone) {
    node.classList.add("d-none");
  } else {
    node.classList.remove("d-none");
  }
}







// ************************************
// *          Handle Remarks          *
// ************************************
Helper.onSubmit('#remark_form', e => {
  Helper.preventDefault(e);
  const form = Helper.f("#remark_form");
  const form_data = new FormData(form);
  const remark = Helper.getDataFromFormData(form_data).remark;

  if (Helper.formValidator(form_data, ["remark"], v => v == '').length > 0) {
    Helper.Promt_Error('Enter valid Remarks.')
    return;
  }

  addRemarks(remark);

  Helper.Promt_Clear();
  form.reset();
});


function Load_RemarksFunctionality() {
  Helper.fm(".remark_item", e => Helper.on(e, "click", () => {
    global_remarks = global_remarks.filter(v => Helper.removeWhiteSpaces(v).toLocaleLowerCase() != Helper.removeWhiteSpaces(e.innerHTML).toLocaleLowerCase());


    console.log({ global_remarks })
    e.remove()
    Helper.f("#remarks_holder", rh => {
      if (Helper.removeWhiteSpaces(rh.innerHTML) == '') rh.innerHTML = "No Remarks";
    });
  }));
}

function getRemarkItemComponent(value) {
  return `
    <div class="alert alert-danger p-2 m-0 remark_item">
      ${value}
    </div>
  `;
}

function addRemarks(remark) {
  remark = remark.toUpperCase();

  if (!global_remarks.some(e => e == remark)) global_remarks.push(remark);
  console.log({ global_remarks })

  Helper.f("#remarks_holder", rh => {
    if (Helper.removeWhiteSpaces(rh.innerHTML) == 'NoRemarks') rh.innerHTML = "";

    let exsisting = false;

    // check if remark already exist
    Helper.fm(".remark_item", ri => exsisting = Helper.removeWhiteSpaces(ri.innerHTML.toLocaleLowerCase()) == Helper.removeWhiteSpaces(remark.toLocaleLowerCase()));

    // append if not existing
    if (!exsisting) {
      rh.innerHTML += getRemarkItemComponent(remark);
      Load_RemarksFunctionality();
    }
  });
}



// ************************************
// *          Handle Merging          *
// ************************************
Helper.onClick("#btn_merge", async e => {
  e.preventDefault();
  Modal.setTitle('<i class="bi bi-intersect"></i> Merge record');
  Modal.setBody(Helper.replaceLayout(await Helper.template('record/merge'), {}));
  Modal.setFooter(await Modal.button('Merge', 'primary'))
  Modal.open()
  Modal.submit(async (e, form_data) => {

  })
});


// ***********************************
// *          Handle Moving          *
// ***********************************
Helper.onClick("#btn_move", async e => {
  e.preventDefault();
  Modal.setTitle('<i class="bi bi-arrows-move"></i> Move record');
  Modal.setBody(Helper.replaceLayout(await Helper.template('record/move'), {}));
  Modal.setFooter(await Modal.button('Move', 'primary'))
  Modal.open()
  Modal.submit(async (e, form_data) => {

  })
});


// **************************************
// *          Handle Archiving          *
// **************************************
Helper.onClick("#btn_archive", async e => {
  e.preventDefault();
  Modal.setTitle('<i class="bi bi-dash-circle"></i> Archive Record');
  Modal.setBody(await Helper.template('record/archive'));
  Modal.setFooter(await Modal.button('Archive', 'danger'))
  Modal.open()
  Modal.submit(async (e, form_data) => {
    const resp = (await Helper.api('student/record/delete', 'json', ))
  })
});


// ***********************************
// *          Handle Saving          *
// ***********************************
Helper.onClick("#btn_save", async e => {
  e.preventDefault();
  Modal.setTitle('<i class="bi bi-floppy"></i> Overwrite Record');
  Modal.setBody(await Helper.template('record/save'));
  Modal.setFooter(await Modal.button('Save', 'success'))
  Modal.open()
  Modal.submit(async (e, form_data) => {

  })
});






// *************************************
// *          Others Functions         *
// *************************************
function getStudentInformationObject(raw_data) {
  return {
    documents: {
      regi_form: JSON.parse(raw_data.regi_form ?? '{"val": "", "dir":""}'),
      j_f137: JSON.parse(raw_data.j_f137 ?? '{"val": "", "dir":""}'),
      s_f137: JSON.parse(raw_data.s_f137 ?? '{"val": "", "dir":""}'),
      f138: JSON.parse(raw_data.f138 ?? '{"val": "", "dir":""}'),
      birth_cert: JSON.parse(raw_data.birth_cert ?? '{"val": "", "dir":""}'),
      good_moral: JSON.parse(raw_data.good_moral ?? '{"val": "", "dir":""}'),

      app_grad: JSON.parse(raw_data.app_grad ?? '{"val": "", "dir":""}'),
      tor: JSON.parse(raw_data.tor ?? '{"val": "", "dir":""}'),
      cert_of_complete: JSON.parse(raw_data.cert_of_complete ?? '{"val": "", "dir":""}'),
      hd_or_cert_of_trans: JSON.parse(raw_data.hd_or_cert_of_trans ?? '{"val": "", "dir":""}'),
      req_clearance_form: JSON.parse(raw_data.req_clearance_form ?? '{"val": "", "dir":""}'),
      req_credentials: JSON.parse(raw_data.req_credentials ?? '{"val": "", "dir":""}'),
    },
    shelf: JSON.parse(raw_data.shelf ?? '{}'),
    remarks: [
      ...JSON.parse(raw_data.value.includes('[') ? raw_data.value : '[]')
    ],
    student: {
      stud_fname: raw_data.stud_fname ?? '',
      stud_lname: raw_data.stud_lname ?? '',
      stud_mname: raw_data.stud_mname ?? '',
      stud_sfx: raw_data.stud_sfx ?? '',
      stud_id: raw_data.stud_id ?? '',
    },
    id: Number(const_record_name),
  }
}