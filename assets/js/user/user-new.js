import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

Helper.onSubmit("#user_form", async function (e) {
  Helper.preventDefault(e);
  const form_data = new FormData(this);

  if (Helper.formValidator(form_data, ['user-uname', 'user-role', 'fname', 'mname', 'lname', 'bday', 'gender'],
    v => v == '').length > 0) {
    Helper.Promt_Error('* Please fill out the required fields.')
    return;
  }

  if (Helper.formValidator(form_data, ['bday'], v => Helper.getAge(v) < 18).length > 0) {
    Helper.Promt_Error('* Invalid Birthday. Age must be 18 years or above.')
    return;
  }

  Helper.Promt_Clear();
  const resp = (await Helper.api('user/new', "json", form_data)).status;

  if (resp == "1") {
    CustomNotification.add("Success", "Successfully added new user", "success");
    this.reset();
  } else {
    CustomNotification.add("Error", "Error occurred. Try again later.", "danger");
  }

});