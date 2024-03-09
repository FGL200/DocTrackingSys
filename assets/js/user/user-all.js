import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

(async () => {
  await Load_Users();
})();

async function Load_Users() {
  const resp = (await Helper.api('user/all', 'json', Helper.createFormData({ uid: const_uid }))).result;

  const thead = `
    <thead>
      <tr>
        <td class=" text-center" style="width: 30px;">#</td>
        <td>Username</td>
        <td>Role</td>
        <td>Status</td>
      </tr>
    </thead>
  `;
  let tbody = '';
  resp.forEach((v, i) => tbody += `
    <tr>
      <td class="align-middle text-center" style="width: 30px;">${i + 1}</td>
      <td class="align-middle">
        <i class="bi bi-person-circle"></i> 
        <a class="link link-primary editUserById" data-binder-id="${v['User ID']}" href="#${v.Username}">${v.Username}</a>
      </td>
      <td class="align-middle">${getRoleById(v.Role)}</td>
      <td class="align-middle">${v.Status == '1' ? '<div class="alert alert-success p-2 m-0">Active</div>' : '<div class="alert alert-danger p-2 m-0">Deactivated</div>'}</td>
    </tr>
  `);

  Helper.DataTable_Reset("#table_content");
  Helper.DataTable_Init("#table_content", thead + tbody, () => {
    Helper.fm(".editUserById", v => Helper.on(v, "click", function () {
      openModal(Helper.getDataBind(this, 'id'));
    }));
  });
}

function getRoleById(roleInitial) {
  switch (roleInitial) {
    case 'A': return 'Admin'; break;
    case 'V': return 'Checker'; break;
    case 'E': return 'Transcriber'; break;
    default: return ''; break;
  }
}

async function openModal(selected_id) {
  const resp = (await Helper.api('user', 'json', Helper.createFormData({ uid: selected_id, rid: const_uid }))).result[0];
  Modal.setTitle('Update User');
  Modal.setBody(Helper.replaceLayout(await Helper.template('profile/edit-profile'), {
    uid: selected_id,
    button_for_activation: resp.active == '1' ?
      `
      <button id="deactive" type="button" class="btn btn-danger w-100">
        <i class="bi bi-ban"></i>  Deactivate
      </button>
      ` :
      `
      <button id="reactive" type="button" class="btn btn-success w-100">
        <i class="bi bi-check2"></i>  Reactivate
      </button>
      `
  }));
  Helper.formBindValues(Modal.id, resp);
  Modal.setFooter(await Modal.button('Save', 'success'))
  Modal.open()
  Modal.submit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ["uname", "fname", "mname", "lname", "bday", "gender"], v => v == '').length > 0) {
      Helper.Promt_Error('*Please fill up required feilds.')
      return;
    }
    if (Helper.formValidator(form_data, ["bday"], v => Helper.getAge(v) < 18).length > 0) {
      Helper.Promt_Error('*Invalid Birthday. Age must be greater or equal to 18.')
      return;
    }
    Helper.Promt_Clear();
    let body = {};
    Helper.ObjectToArray(Helper.getDataFromFormData(form_data)).forEach(v => {
      if (v.name == "gender") v.name = "g";
      if (["role", "uid"].includes(v.name)) {
        body[v.name] = v.value;
        return;
      };
      body[`profile-${v.name}`] = v.value;
    });
    const status = (await Helper.api('user/update', 'json', Helper.createFormData({ ...body }))).status;
    ValidateStatus(status);
  });

  Helper.onClick("#reset_password", async (e) => {
    e.preventDefault();
    const status = (await Helper.api('user/update', 'json', Helper.createFormData({ uid: selected_id, action: 'reset-password' }))).status;
    ValidateStatus(status);
  });

  if (resp.active == '1') {
    Helper.onClick("#deactive", async (e) => {
      e.preventDefault();
      const status = (await Helper.api('user/update', 'json', Helper.createFormData({ uid: selected_id, active: '0', uname: resp.uname, action: 'set-active' }))).status;
      ValidateStatus(status);
    });

  } else {
    Helper.onClick("#reactive", async (e) => {
      e.preventDefault();
      const status = (await Helper.api('user/update', 'json', Helper.createFormData({ uid: selected_id, active: '1', uname: resp.uname, action: 'set-active' }))).status;
      ValidateStatus(status);
    });
  }
}

function ValidateStatus(status = 0) {
  if (status == 1) {
    CustomNotification.add("Success", "Successfully updated user.", "success");
    Modal.close();
    Load_Users();
  } else {
    CustomNotification.add("Error", "Error Occurred. Try again later.", "danger");
  }
}