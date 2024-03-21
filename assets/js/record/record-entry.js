import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

let global_rotate = 0;
let global_remarks = [];
let global_record = undefined;
let global_document = {};

(async () => {
  Helper.importCSS("record/record-entry")
  await Load_Data();
  await Load_RemarksCategory();
})();

async function Load_Data() {
  const resp = (await Helper.api(`student/record/${const_record_name}`, 'json')).result;
  if (!resp) location.href = `${base_url}shelf/all`;

  let record = getStudentInformationObject(resp);
  global_record = record;


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
  Helper.fm(".document_item", function (v) {

    const parent = v;
    const id = parent.id;
    const container = Helper.find(parent, '.alert')[0];
    const btn_viewIMGs = Helper.find(parent, '.view_image')[0];
    const cb_Input = Helper.find(parent, `#${id}-cb`)[0];
    const file_Input = Helper.find(parent, `input[type="file"]`)[0];

    let selected_image = 0;

    global_document[id] = { list: { images: [], files: [] } };

    // **********************************************
    // *          When checkbox is changed          *
    // **********************************************
    Helper.on(cb_Input, "change", () => {
      if (cb_Input.checked) {
        setContiner(container, 'success');
        setDisabledClass(btn_viewIMGs, false);
        setDisabledClass(file_Input, false);
      } else {
        setContiner(container, 'secondary');
        setDisabledClass(btn_viewIMGs, true);
        setDisabledClass(file_Input, true);
      }
    });
    if (record.documents[id].val == 1) cb_Input.click();

    // ***************************************
    // *          Initialize Images          *
    // ***************************************
    const dir = record.documents[id].dir;
    let dirLength = 0;
    function InitializedSavedImages() {
      if (dir != '') {
        const directory = dir.split(',').map(v => `${base_url}${v}`);
        directory.forEach(img => global_document[id].list.images.push(img));
        dirLength = directory.length;
      }
    }
    InitializedSavedImages();

    // ************************************************
    // *          When View Image is clicked          *
    // ************************************************
    Helper.on(btn_viewIMGs, "click", async (e) => {
      // layout for carousel component
      const carouselTemplate = `
        <div id="document_images" class="carousel carousel-dark slide" data-bs-ride="carousel"> 
          <div class="carousel-indicators">{{pagination}}</div>
          <div class="carousel-inner">{{imageSource}}</div>
          <button id="carousel_prev" class="carousel-control-prev reset-rotate" type="button" data-bs-target="#document_images" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button id="carousel_next" class="carousel-control-next reset-rotate" type="button" data-bs-target="#document_images" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      // *************************************************************
      // *          Function For binding images in carousel          *
      // *************************************************************
      function bindImagestToCarousel() {
        let imageSource = '';
        let pagination = '';
        global_document[id].list.images.forEach((v, i) => {
          pagination += `
            <button type="button" data-bs-target="#document_images" data-bs-slide-to="${i}" data-binder-index="${i}" class="carousel_navigator ${i == 0 ? 'active' : ''}" aria-current="true" aria-label="Slide 1"></button>
          `;
          imageSource += `
            <div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="9999999999">
              <div class="d-flex justify-content-center w-100">
                <img src="${v}" class="d-block w-75 rotate" alt="...">
              </div>
            </div>
          `;
        });
        Modal.setBody(Helper.replaceLayout(carouselTemplate, { imageSource, pagination }), () => {

          Helper.fm(".carousel_navigator", v => Helper.on(v, "click", () => selected_image = Helper.getDataBind(v, 'index')));

          // ************************************
          // *          Removing image          *
          // ************************************
          Helper.onClick("#carousel_prev", () => selected_image = selected_image == 0 ? global_document[id].list.images.length - 1 : selected_image - 1);
          Helper.onClick("#carousel_next", () => selected_image = selected_image == global_document[id].list.images.length - 1 ? 0 : selected_image + 1);
          const remove_btn = Helper.f("#remove_image");
          Helper.on(remove_btn, "click", () => {

            if (selected_image < dirLength) {
              CustomNotification.add("Error", "Image cannot be removed.", "danger");
              return;
            }

            global_document[id].list.files.splice(selected_image, 1);
            global_document[id].list.images.splice(selected_image, 1);
            selected_image = 0;
            BindLoadedImageToCarousel();
          });
        });

        // ***************************************
        // *          Rotation of image          *
        // ***************************************
        global_rotate = 0;
        Helper.fm("img.rotate", v => Helper.clearEvent(v, "click"));
        Helper.fm("img.rotate", simg => Helper.on(simg, "click", () => {
          Helper.fm('.reset-rotate', rr => Helper.on(rr, "click", () => {
            global_rotate = 0;
            simg.style.transform = `rotate(${global_rotate}deg)`;
          }));
          global_rotate += 90;
          if (global_rotate >= 360) global_rotate = 0;
          simg.style.transform = `rotate(${global_rotate}deg)`;
        })); // end of image rotate

        if (global_document[id].list.images.length == 0) setDisplayNoneClass(Helper.f("#remove_image"), true)
        else setDisplayNoneClass(Helper.f("#remove_image"), false);

      }// end of binding function

      Modal.setTitle('View Image');
      Modal.setFooter(`
        <div class="row w-100">
          <div class="col-sm-4">
            <small class="w-100 mb-3"><i class="bi bi-info-circle"></i> Click image to rotate.</small>
          </div>
          <div class="col-sm-8 text-end">
            <button class="btn btn-danger" id="remove_image">Remove</button>
            <label for="${id}-file" id="add_image" class="btn btn-success"><i class="bi bi-plus"></i> New <i class="bi bi-card-image"></i></label>
            <button class="btn btn-primary" id="save_uploaded_images">Save</button>
          </div>
        </div>
      `, () => {

        // ***************************************
        // *          Adding new Images          *
        // ***************************************
        Helper.on(file_Input, "change", function () {
          const uploaded_files = [];
          for (const file of this.files) uploaded_files.push(file);
          this.files = null;
          this.value = null;

          uploaded_files.forEach(file => {
            Helper.readFileAsImage(file, v => {
              global_document[id].list.images.push(v);
              global_document[id].list.files.push(file);
            });
          });

          selected_image = 0;
          this.disabled = true;
          Modal.setBody(`<div class="alert alert-light m-0">Uploading images...</div>`);
          setTimeout(() => {
            this.disabled = false;
            bindImagestToCarousel();
          }, 1000);
        });

      });

      // ********************************************
      // *          Saving uploaded images          *
      // ********************************************
      const close_btn = Helper.f("#save_uploaded_images");
      Helper.on(close_btn, "click", () => {
        transferVirtualFilesToNodeFile(file_Input, global_document[id].list.files);
        Modal.close();
      });


      // ************************************************
      // *          Binding images to carousel          *
      // ************************************************
      function BindLoadedImageToCarousel() {
        Modal.setBody(`<div class="alert alert-light m-0">Loading Images...</div>`);

        if (global_document[id].list.images.length == 0) setDisplayNoneClass(Helper.f("#remove_image"), true)
        else setDisplayNoneClass(Helper.f("#remove_image"), false);

        setDisabledClass(Helper.f("#remove_image"), true);
        setDisabledClass(Helper.f("#add_image"), true);
        setDisabledClass(Helper.f("#save_uploaded_images"), true);

        setTimeout(() => {
          setDisabledClass(Helper.f("#remove_image"), false);
          setDisabledClass(Helper.f("#add_image"), false);
          setDisabledClass(Helper.f("#save_uploaded_images"), false);

          if (global_document[id].list.images.length > 0) {
            bindImagestToCarousel();
          } else {
            Modal.setBody('<div class="alert alert-info m-0">No scanned document yet.</div>');
          }
        }, 1000);
      }
      BindLoadedImageToCarousel();

      Modal.onClose(function () {
        console.log("CLOSED!", this)
      })
      Modal.open();
      Modal.submit(() => { });

    }); // end of when image is clicked

  });

  if (Helper.removeWhiteSpaces(Helper.f("#other_documents>.row").innerHTML) == '') {
    Helper.f("#other_documents_holder").remove();
  }
}




// ****************************************
// *          Ducoment Functions          *
// ****************************************
function transferVirtualFilesToNodeFile(nodeFile, vitualFiles = []) {
  const dt = new DataTransfer();
  vitualFiles.forEach(v => dt.items.add(v));
  const newFileList = dt.files;
  nodeFile.files = newFileList;
}

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
    node.disabled = true;
    node.classList.add("disabled");
  } else {
    node.disabled = false;
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
async function Load_RemarksCategory() {
  const resp = (await Helper.api('categories', 'json'));
  let datalist = '';
  resp.forEach(v => datalist += `<option value="${v}" />`)
  Helper.f("#remarks_category").innerHTML = datalist;
}

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
    // stud_fname: global_record.student.stud_fname,
    // stud_lname: global_record.student.stud_lname,
    // stud_mname: global_record.student.stud_mname,
    stud_id: global_record.student.stud_id,
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

    // disable input file that has no items
    Helper.fm(".document_item", parent => {
      const file_input = Helper.find(parent, 'input[type="file"]')[0];
      if (file_input.files.length == 0) file_input.disabled = true;
    });

    const form_info = new FormData(Helper.f("#information_form"));
    const form_doc = new FormData(Helper.f("#document_form"))

    const body = {
      remarks: JSON.stringify(global_remarks),
      stud_rec: JSON.stringify(Helper.getDataFromFormData(form_info)),
    };

    if (Helper.formValidator(form_info, ['stud_lname'], v => v == '').length > 0) {
      Helper.Promt_Error("* Please fill required fields.")
      return;
    }

    const resp = (await Helper.api(`student/record/${global_record.id}/update`, 'json', Helper.createFormData({ ...body }, form_doc)));
    if (resp.status == 1) {
      CustomNotification.add("Success", "Successfully updated!", "success");
      Modal.close();
      // setTimeout(() => { location.reload() }, 1000);
    } else {
      CustomNotification.add("Error", "Error occurred. Try again later.", "danger");
    }
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