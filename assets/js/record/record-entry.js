import { Helper } from "../../shared/helper.js";

let data = {};

(async () => {
  await Load_Data();
})();

async function Load_Data() {
  const resp = (await Helper.api(`student/record/${const_record_name}`, 'json')).result;
  data = StudentInformationObject(resp);
  
}




















function StudentInformationObject(raw_data) {
  return {
    documents: {
      regi_form: JSON.parse(raw_data.regi_form ?? '{"val": "", "dir":""}'),
      good_moral: JSON.parse(raw_data.good_moral ?? '{"val": "", "dir":""}'),
      app_grad: JSON.parse(raw_data.app_grad ?? '{"val": "", "dir":""}'),
      j_f137: JSON.parse(raw_data.j_f137 ?? '{"val": "", "dir":""}'),
      s_f137: JSON.parse(raw_data.s_f137 ?? '{"val": "", "dir":""}'),
      f138: JSON.parse(raw_data.f138 ?? '{"val": "", "dir":""}'),
      birth_cert: JSON.parse(raw_data.birth_cert ?? '{"val": "", "dir":""}'),
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