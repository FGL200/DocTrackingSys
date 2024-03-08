import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

Helper.onClick("#btn_new_category", async () => {
  Modal.setSize('sm');
  Modal.setTitle('New Category')
  Modal.setBody(await Helper.template('request/new-category'));
  Modal.setFooter(await Modal.button('Save', 'success'));
  Modal.open();
  Modal.submit(async (e, form_data) => {
    if (Helper.formValidator(form_data, ['name'], v => v == '').length > 0) {
      Helper.Promt_Error('Enter valid name for category.');
      return;
    }

    Helper.Promt_Clear();
    Modal.close();

  });
});