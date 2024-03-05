let _remarks = []
let _records = {};
Helper.onSubmit("#record_form", e => e.preventDefault());




// ********************************************
// *          Static Event Functions          *
// ********************************************

Helper.onClick("#btn_back", () => {
  const param = getURLParams();
  if (!param.from) window.close();
  MAIN.goto(`shelf/${param.from}`);
});


Helper.onClick("#btn_merge", async () => {
  MODAL.setSize('md');
  MODAL.setTitle('<i class="fa-solid fa-object-ungroup"></i>  Merge Records');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('viewRecord/merge'), { options: (await p_Load_AvaliableMerge()) }));
  MODAL.setFooter('<button class="btn btn-primary">Merge</button>');
  MODAL.onSubmit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ["id"], v => v == '').length) {
      Helper.Promt_Error('* Required fields must be filled.')
      return;
    }

    const id = Helper.getDataFromFormData(form_data).id;

    Helper.Promt_Clear();
    const resp = (await Helper.api(`student/record/${_records.id}/merge`, "json", Helper.createFormData({ to: id })))
    if (resp.status == 1) {
      MAIN.addNotif("Successful", "Merge was successful!", "g");
      await p_Load_Everything();
      MODAL.close();
    } else {
      MAIN.addNotif("Error", "Error Occurred. Try again later.", "r");
    }
  });
  MODAL.open();
});

Helper.onClick("#btn_move", async () => {
  MODAL.setSize('md');
  MODAL.setTitle('<i class="fa-solid fa-arrows-left-right"></i> Move Record');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('viewRecord/move'), { options: (await p_Load_Shelves()) }));
  MODAL.setFooter('<button class="btn btn-primary">Move</button>');
  MODAL.onSubmit(async (e, form_data) => {

  });
  MODAL.open();
});

Helper.onClick("#btn_archive", async () => {
  MODAL.setSize('md');
  MODAL.setTitle('<i class="fa-solid fa-box-archive"></i> Archive Record');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('viewRecord/archive'), {}));
  MODAL.setFooter('<button class="btn btn-warning">Archive</button>');
  MODAL.onSubmit(async (e, form_data) => {

  });
  MODAL.open();
});

Helper.onClick("#btn_save", async () => {
  MODAL.setSize('md');
  MODAL.setTitle('<i class="fa-solid fa-floppy-disk"></i> Save');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('viewRecord/save'), {}));
  MODAL.setFooter('<button class="btn btn-success">Save</button>');
  MODAL.onSubmit(async (e, form_data) => {

  });
  MODAL.open();
});

// ************************************
// *          Init Functions          *
// ************************************

async function Load_Values() {

  const resp1 = (await Helper.api('', "json"))

  _records = To_ObjcetValue((await Helper.api(`student/record/${CONST_RECORD_ID}`, "json")).result);

  console.log({ _records });

  Helper.formBindValues('#record_form', _records.student);
  await p_Load_Documents();
  await p_Load_Remarks();
}

(async () => {
  await p_Load_Everything();
})();




// **************************************
// *          Custom Functions          *
// **************************************
async function p_Load_Everything() {

  Helper.f("#stud_rec_id").innerHTML = CONST_RECORD_ID;
  await Load_Values();
  Helper.setupFor(CONST_ROLE);


  // On Click event
  Helper.fm(".remarks-component", rc => {
    Helper.on(rc, "click", function (e) {
      if (CONST_ROLE != "E") return;

      _remarks = _remarks.filter(v => v != this.innerHTML)
      console.log({ _remarks })
    });
  });

  // On Click event
  Helper.fm(".document-component", dc => {
    Helper.find(dc, ".doc-check", doc => {
      Helper.on(doc, "click", () => Helper.find(dc, 'input[type="checkbox"]', input => {
        if (CONST_ROLE != "E") return;

        input.checked = !input.checked
        toggleDocumentColor(dc, input.checked);
      }));
    });
  });
}

async function p_Load_AvaliableMerge() {
  const body = {
    stud_fname: _records.student.stud_fname,
    stud_mname: _records.student.stud_mname,
    stud_lname: _records.student.stud_lname,
    current_shelf: _records.shelf.id,
  };
  const list = (await Helper.api('student/record/shelf', "json", Helper.createFormData(body)));
  let options = ''
  list.map(v => JSON.parse(v.shelf)).forEach(v => options += `<option value="${v.ID}">${v.Name}</option>`);
  return options;
}

async function p_Load_Shelves() {
  let options = ``;
  const shelves = await Helper.api('api/shelves', "json");
  shelves.forEach(v => options += `<option value="${v.id}" >${v.name}</option>`);
  return options;
}

async function p_Load_Remarks() {
  const layout_remarks = (await Helper.template('viewRecord/remarks-component'));
  _records.remarks.forEach(async (value, i) => {
    _remarks.push(value);
    const template = Helper.replaceLayout(layout_remarks, { value, i });
    Helper.f("#remarks-holder").innerHTML += template;
  });
}

async function p_Load_Documents() {
  const layout_documents = (await Helper.template('viewRecord/document-component'));
  Helper.ObjectToArray(_records.documents).forEach(async doc => {
    const template = Helper.replaceLayout(layout_documents, {
      dir: doc.value.dir,
      doc_name: GetDocName(doc.name),
      doc_identity: doc.name,
      checked: doc.value.val == 1 ? 'checked' : '',
      color: doc.value.val == 1 ? 'success' : 'danger',
    });
    Helper.f("#documents-holder").innerHTML += template;
  });
}

function GetDocName(document_name) {
  switch (document_name) {
    case 'app_grad': return 'App for Graduation';
    case 'birth_cert': return 'Birth Certificate';
    case 'cert_of_complete': return 'Certificate of Completion';
    case 'f138': return 'Form 138';
    case 'good_moral': return 'Good Moral';
    case 'hd_or_cert_of_trans': return 'Honorable Dismisal / Certificate of Transferee';
    case 'j_f137': return 'Junior Form 137';
    case 'regi_form': return 'Registration Form';
    case 'req_clearance_form': return 'Request for Clearance';
    case 'req_credentials': return 'Request for Credentials Form';
    case 's_f137': return 'Senior Form 137';
    case 'tor': return 'Transcript of Records';
    default: return ''
  }
}

function toggleDocumentColor(elementNode, checkedVal_BOOL) {
  const cList = elementNode.classList;
  if (checkedVal_BOOL) {
    cList.remove('alert-danger');
    cList.add('alert-success');
    cList.remove('border-danger');
    cList.add('border-success');
  } else {
    cList.add('alert-danger');
    cList.remove('alert-success');
    cList.add('border-danger');
    cList.remove('border-success');
  }
}

function To_ObjcetValue(nonObject) {
  return {
    documents: {
      regi_form: JSON.parse(nonObject.regi_form),
      good_moral: JSON.parse(nonObject.good_moral),
      app_grad: JSON.parse(nonObject.app_grad),
      j_f137: JSON.parse(nonObject.j_f137),
      s_f137: JSON.parse(nonObject.s_f137),
      f138: JSON.parse(nonObject.f138),
      birth_cert: JSON.parse(nonObject.birth_cert),
      tor: JSON.parse(nonObject.tor),
      cert_of_complete: JSON.parse(nonObject.cert_of_complete),
      hd_or_cert_of_trans: JSON.parse(nonObject.hd_or_cert_of_trans),
      req_clearance_form: JSON.parse(nonObject.req_clearance_form),
      req_credentials: JSON.parse(nonObject.req_credentials),
    },
    shelf: {
      id: Number(nonObject.shelf),
      shelf_histories: JSON.parse(nonObject.shelf_histories),
      merged_shelves: JSON.parse(nonObject.merged_shelves),
    },
    remarks: [
      ...JSON.parse(nonObject.value.includes('[') ? nonObject.value : '[]')
    ],
    student: {
      stud_fname: nonObject.stud_fname,
      stud_lname: nonObject.stud_lname,
      stud_mname: nonObject.stud_mname,
      stud_sfx: nonObject.stud_sfx,
      stud_id: nonObject.stud_id,
    },
    id: CONST_RECORD_ID
  }
}