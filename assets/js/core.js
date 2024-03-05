import { Helper } from "../shared/helper.js";
import { Modal } from "../shared/modal.js";
import { TermsAndCondition } from "../shared/terms-and-condition.js";

(async () => {
  Navigator();
  Helper.setupFor(const_role);
  TermsAndCondition.init();
})();

Helper.onSubmit("#form_quickSearch", async function (e) {
  e.preventDefault();
  const form_data = new FormData(this);

  let value = Helper.getDataFromFormData(form_data).value;
  const resp = (await Helper.api('student/search', "json", Helper.createFormData({ value }))).data;
  let tbody = '';
  resp.map(v => ({ ...v, Remarks: JSON.parse(v.Remarks == '--' ? '[]' : v.Remarks[0] == '[' ? v.Remarks : '[]') })).forEach(v => {
    tbody += `
      <tr>
        <td><a href="${base_url}record/entry/${v['Record ID']}" class="link text-primary">${v['Record ID']}</a></td>
        <td>
          ${v['Last Name']}, ${v['First Name']} ${v['Middle Name']}
        </td>
        <td>
          <div class="text-nowrap alert alert-${v.Remarks.length > 0 ? 'danger' : 'success'} p-2">${v.Remarks.length > 0 ? `${v.Remarks.length} Remarks` : 'No Remarks'}</div>
        </td>
      </tr>
    `});
  Modal.setSize('lg');
  Modal.setTitle('Result');
  Modal.setBody(resp.length > 0 ? Helper.replaceLayout(await Helper.template('dashboard/quickSearch'), { tbody }) : '<div class="alert alert-light">Nothing found.</div>');
  Modal.open(() => {
    Helper.f("#form_quickSearch").reset();
  })
});

function Navigator() {
  const url = location.href;
  if (url.includes("dashboard")) Helper.f("#link-dashboard").classList.remove('collapsed');
  if (url.includes("user")) Helper.f("#link-manage_users").click();
  if (url.includes("shelf/all")) Helper.f("#link-all_shelves").classList.remove('collapsed');
  if (url.includes("shelf/new")) Helper.f("#link-manage_shelves").click();
  if (url.includes("shelf/archived")) Helper.f("#link-manage_shelves").click();
  if (url.includes("request/all")) Helper.f("#link-requests").click();
  if (url.includes("request/archived")) Helper.f("#link-manage_requests").click();
  if (url.includes("request/archived")) Helper.f("#link-manage_requests").click();
  if (url.includes("record/new")) Helper.f("#link-student_records").click();
}


// {
//   "__ci_last_regenerate": 1709588414,
//   "fname": null,
//   "lname": null,
//   "mname": null,
//   "bday": null,
//   "g": "N",
//   "uid": "1",
//   "role": "A",
//   "uname": "ADMIN",
//   "agree": "0"
// }