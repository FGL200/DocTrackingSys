import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

(async () => {
  Helper.importCSS("record/record-new");
  await Init_Shelf();
  await Load_RemarksCategory()
})();

const document_names = [
  'regi_form',
  'j_f137',
  's_f137',
  'f138',
  'birth_cert',
  'good_moral',
  'app_grad',
  'tor',
  'cert_of_complete',
  'hd_or_cert_of_trans',
  'req_clearance_form',
  'req_credentials',
];

let global_document = {};
let global_rotate = 0;
let global_remarks = [];
const documents = {};
document_names.map(v => documents[v] = { val: 0, dir: '' });
console.log({ documents })



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
          global_document[id].list.files.splice(selected_image, 1);
          global_document[id].list.images.splice(selected_image, 1);
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

    Modal.onClose(() => {
      console.log("CLOSED!")
    })
    Modal.open();
    Modal.submit(() => { });

  }); // end of when image is clicked

});


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

Helper.onSubmit('#remark_form', e => {
  Helper.preventDefault(e);
  const form = Helper.f("#remark_form");
  const form_data = new FormData(form);
  const remark = Helper.getDataFromFormData(form_data).remark;

  if (Helper.formValidator(form_data, ["remark"], v => v == '').length > 0) {
    // Helper.Promt_Error('Enter valid Remarks.')
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





// ***********************************
// *          Handle Saving          *
// ***********************************
Helper.onClick("#btn_save", async e => {
  e.preventDefault();

  // disable input file that has no items
  Helper.fm(".document_item", parent => {
    const file_input = Helper.find(parent, 'input[type="file"]')[0];
    if (file_input.files.length == 0) file_input.disabled = true;
  });

  const form_info = new FormData(Helper.f("#information_form"));
  const form_doc = new FormData(Helper.f("#document_form"))

  const doc = Helper.getDataFromFormData(form_doc);
  const body = {
    remarks: JSON.stringify(global_remarks),
    stud_rec: JSON.stringify(Helper.getDataFromFormData(form_info)),
    shelf: localStorage.getItem('selected_shelf'),
    uid: const_uid
  };

  if (Helper.formValidator(form_info, ['stud_lname'], v => v == '').length > 0) {
    Helper.Promt_Error("* Please fill required fields.")
    return;
  }

  Modal.setTitle('<i class="bi bi-floppy"></i> Saving Record');
  Modal.setBody('<div class="alert alert-secondary text-center">Saving...</div>');
  Modal.open();
  const resp = (await Helper.api('student/record/add', 'json', Helper.createFormData({ ...body }, form_doc)));
  if (resp.status == 1) {
    Modal.setBody('<div class="alert alert-success text-center">New record added!</div>');
    setTimeout(() => { Modal.close(); location.reload(); }, 1000);
  } else {
    Modal.setBody('<div class="alert alert-danger text-center">Error saving...</div>');
  }

});




// *******************************************
// *          Handle Changing shelf          *
// *******************************************
Helper.onClick("#btn_change_shelf", async e => { changeShelf() });

async function Init_Shelf() {
  const selected_shelf = localStorage.getItem('selected_shelf');
  if (!selected_shelf) {
    changeShelf();
  } else {
    Helper.f("#shelf_name").href = `${base_url}shelf/entry/${selected_shelf}`;
    Helper.f("#shelf_name").innerHTML = `Shelf ${selected_shelf}`;
  }
}

async function changeShelf() {
  const resp = (await Helper.api('shelf/all-info', "json", new FormData()));
  console.log({ resp });

  let options = '';
  resp.forEach(v => options += `<option value="${v.name}">${v.name}</option>`)

  Modal.setSize('sm')
  Modal.hideCloseButton();
  Modal.setTitle('Choose Shelf');
  Modal.setBody(`
  <select class="form-select" name="shelf" id="selected_shelf_id">
    <option value="">Select Shelf</option>
    ${options}
  </select>
  `);
  Helper.f("#selected_shelf_id").value = localStorage.getItem('selected_shelf') ?? '';
  Modal.setFooter(await Modal.button('Select', 'success'));
  Modal.open();
  Modal.submit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ["shelf"], v => v == '').length > 0) {
      return;
    }

    const data = Helper.getDataFromFormData(form_data);
    localStorage.setItem('selected_shelf', data.shelf)
    Init_Shelf();
    Modal.close();
  });
}