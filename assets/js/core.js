import { CustomNotification } from "../shared/custom-notification.js";
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

Helper.onClick("#user_edit_profile", async () => {
  const resp = (await Helper.api('user', 'json', Helper.createFormData({ uid: const_uid, rid: const_uid }))).result[0];
  Modal.setSize('md');
  Modal.setBody(await Helper.template('profile/profile'));
  Modal.setTitle('<i class="bi bi-person-circle"></i> My Information')
  Helper.formBindValues(Modal.id, {
    'profile-uname': resp.uname,
    'profile-fname': resp.fname,
    'profile-mname': resp.mname,
    'profile-lname': resp.lname,
    'profile-bday': resp.bday,
    'profile-g': resp.gender,
  });
  Modal.setFooter(await Modal.button('Save', 'success'));
  Modal.open();
  Modal.submit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ["profile-fname", "profile-mname", "profile-lname", "profile-uname", "profile-bday", "profile-g"], v => v == '').length > 0) {
      Helper.Promt_Error('* Required fields must be filled.')
      return;
    }

    if (Helper.formValidator(form_data, ["profile-bday"], v => Helper.getAge(v) < 18).length > 0) {
      Helper.Promt_Error('* Birthdate is not valid. Age must be greater than 18.')
      return;
    }

    if (Helper.f("#profile-old-pass").value || Helper.f("#profile-new-pass").value) {
      if (Helper.formValidator(form_data, ["profile-old-pass", "profile-new-pass"], v => v == '').length > 0) {
        Helper.Promt_Error('* Old and New password reuqired.')
        return;
      }
    }

    Helper.Promt_Clear();
    const resp = (await Helper.api('user/update', 'json', Helper.createFormData({ uid: const_uid, rid: const_uid }, form_data))).status;

    if (resp == "success") {
      CustomNotification.add("Profile Updated!", "Information saved!", "success");
      Modal.close();
      setTimeout(() => { location.reload(); }, 1000);
    } else {
      CustomNotification.add("Error", "Error occured. Try again later.", "danger");
    }

  });
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