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
  if (!resp) location.href = `${base_url}shelf/all`;

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
  Init_Remarks();


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
              <img src="${base_url}${v}" class="d-block w-75 rotate" alt="...">
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
        // *          Rotation of image          *
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

      // **********************************
      // *          Vlidate Role          *
      // **********************************
      if (const_role == 'A' || const_role == 'V') {
        Helper.removeElement(el_btn_file_add);
        Helper.removeElement(el_btn_file_rem);
        Helper.removeElement(el_input_cb);
        Helper.removeElement(el_input_file);
        if (record.documents[v.name].dir == '') Helper.removeElement(el_btn_view);
        if (record.documents[v.name].val == '0') Helper.removeElement(parent);
      }


    }); // end of getting every <div> corresponding to a document
  }); // end of iteration of documents

  if (Helper.removeWhiteSpaces(Helper.f("#other_documents>.row").innerHTML) == '') {
    Helper.f("#other_documents_holder").remove();
  }
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
Helper.onClick("#remarks_reload", () => {
  Clear_Remarks();
  Init_Remarks();
});

Helper.onSubmit('#remark_form', e => {
  Helper.preventDefault(e);
  const form = Helper.f("#remark_form");
  const form_data = new FormData(form);
  const remark = Helper.getDataFromFormData(form_data).remark;

  if (Helper.formValidator(form_data, ["remark"], v => v == '').length > 0) {
    Helper.Promt_Error('Enter valid Remarks.')
    return;
  }

  Add_Remarks(remark);

  Helper.Promt_Clear();
  form.reset();
});

async function Init_Remarks() {
  global_record.remarks.forEach(v => Add_Remarks(v));
  Load_RemarksFunctionality();
}

function Load_RemarksFunctionality() {
  Helper.fm(".remark_item", e => Helper.on(e, "click", () => {
    if (const_role == 'A' || const_role == 'V') return;

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

function Add_Remarks(remark) {
  remark = remark.toUpperCase();

  if (!global_remarks.some(e => e == remark)) global_remarks.push(remark);

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

function Clear_Remarks() {
  global_remarks = [];
  Helper.f("#remarks_holder", rh => rh.innerHTML = "No Remarks");
}



// ************************************
// *          Handle Merging          *
// ************************************
Helper.onClick("#btn_merge", async e => {
  e.preventDefault();
  Modal.setTitle('<i class="bi bi-intersect"></i> Merge record');
  let options = '';
  (await Helper.api('student/record/shelf', 'json', Helper.createFormData({
    stud_fname: global_record.student.stud_fname,
    stud_lname: global_record.student.stud_lname,
    stud_mname: global_record.student.stud_mname,
    current_shelf: global_record.shelf.ID,
  })))
    .map(v => JSON.parse(v.shelf))
    .forEach(v => options += `<option value="${v.ID}">${v.Name}</option>`);
  Modal.setBody(Helper.replaceLayout(await Helper.template('record/merge'), { options }));
  Modal.setFooter(await Modal.button('Merge', 'primary'))
  Modal.onClose(() => { Helper.Promt_Clear() });
  Modal.submit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ['id'], v => v == '').length > 0) {
      Helper.Promt_Error('* Select shelf for merging.')
      return
    }
    Helper.Promt_Clear();
    const resp = (await Helper.api(`student/record/${global_record.id}/merge`, 'json', form_data));
    if (resp.status == 1) {
      Modal.close();
      CustomNotification.add("Success", "Record merged.", "success");
      setTimeout(() => { location.reload() }, 1000);
    } else {
      CustomNotification.add("Error", "Error occurre. Try again.", "danger");
    }
  });
  Modal.open()
});


// ***********************************
// *          Handle Moving          *
// ***********************************
Helper.onClick("#btn_move", async e => {
  e.preventDefault();
  Modal.setTitle('<i class="bi bi-arrows-move"></i> Move record');
  let options = '';
  const resp = (await Helper.api('shelf/all-info', 'json')).forEach(v => options += `<option value="${v.id}">${v.name}</option>`)
  Modal.setBody(Helper.replaceLayout(await Helper.template('record/move'), { options }));
  Modal.setFooter(await Modal.button('Move', 'primary'))
  Modal.open()
  Modal.submit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ['id'], v => v == '').length > 0) {
      Helper.Promt_Error('* Select shelf for merging.')
      return
    }
    Helper.Promt_Clear();
    const resp = (await Helper.api(`student/record/move/${global_record.id}`, 'json', form_data));
    if (resp.status == '1') {
      CustomNotification.add("Success", "Sucessfully moved the record.", "success");
      await Load_Data();
      Modal.close();
    }
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
    const resp = (await Helper.api(`student/record/${global_record.id}/delete`, 'json', new FormData()));
    if (resp.status == "success") {
      Modal.close();
      CustomNotification.add("Success", "Record has been deleted", "success");
      setTimeout(() => { location.href = `${base_url}shelf/entry/${global_record.shelf.Name}`; }, 1000);
    } else {
      CustomNotification.add("Error", "An error occurred. Try again later.", "danger");
    }
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
    const form_info = new FormData(Helper.f("#information_form"));
    const form_doc = new FormData(Helper.f("#document_form"))

    const doc = Helper.getDataFromFormData(form_doc);
    const body = {
      remarks: JSON.stringify(global_remarks),
      stud_rec: JSON.stringify(Helper.getDataFromFormData(form_info)),
    };

    if (Helper.formValidator(form_info, ['stud_lname'], v => v == '').length > 0) {
      Helper.Promt_Error("* Please fill required fields.")
      return;
    }

    const resp = (await Helper.api(`student/record/${global_record.id}/update`, 'json', Helper.createFormData({ ...body}, form_doc))); // ayos na yung bug dito na isang file lang yung nasesend sa backend

    Modal.setTitle('<i class="bi bi-floppy"></i> Saving Record');
    Modal.setBody('<div class="alert alert-success text-center">Saving...</div>');
    Modal.open();
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