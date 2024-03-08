import { Helper } from "../../shared/helper.js";

let data = {};

(async () => {
  Helper.importCSS("record/record-entry")
  await Load_Data();

  Load_RemarksFunctionality();
})();

async function Load_Data() {
  const resp = (await Helper.api(`student/record/${const_record_name}`, 'json')).result;
  let record = getStudentInformationObject(resp);

  Helper.formBindValues("#record_form", record.student)
  
}


Helper.onSubmit('#remark_form', e => {
  Helper.preventDefault(e);
  const form = Helper.f("#remark_form");
  const form_data = new FormData(form);
  const remark = Helper.getDataFromFormData(form_data).remark;

  if (Helper.formValidator(form_data, ["remark"], v => v == '').length > 0) {
    Helper.Promt_Error('Enter valid Remarks.')
    return;
  }

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

  Helper.Promt_Clear();
  form.reset();
});











function Load_RemarksFunctionality() {
  Helper.fm(".remark_item", e => Helper.on(e, "click", () => {
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
    shelf: {
      id: Number(raw_data.shelf ?? 0),
      shelf_histories: JSON.parse(raw_data.shelf_histories ?? '{}'),
      merged_shelves: JSON.parse(raw_data.merged_shelves ?? '{}'),
      name: raw_data?.shelf_name ?? '',
    },
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