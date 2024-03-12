import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";

Helper.onSubmit("#shelf_form", async function (e) {
  e.preventDefault();
  const form_data = new FormData(this);
  if (Helper.formValidator(form_data, ['name'], v => v == '').length > 0) {
    Helper.Promt_Error('Enter valid name.')
    return;
  }
  
  const resp = (await Helper.api('shelf/insert', "json", form_data));
  if (resp.status == 'success') {
    this.reset();
    Helper.Promt_Clear();
    CustomNotification.add('Success', 'New shelf added', "success");
  } else {
    Helper.Promt_Error('Server error. Try again later.');
    CustomNotification.add('Error', 'Server Error. Try again later', "danger");
  }
});