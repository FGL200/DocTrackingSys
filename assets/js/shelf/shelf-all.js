import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

(async () => {
  await Load_Shelves();

  Helper.setupFor(const_role);
})();


async function Load_Shelves() {
  Helper.fm(".shelf-item", e => e.remove());

  const resp = (await Helper.api('shelf/all-info', "json", new FormData()));
  const shelf_template = (await Helper.template('shelf/shelf-component'));
  let shelf_layout = '';
  resp
    .map(v => ({
      id: v.id ?? '',
      name: v.name ?? '',
      count_records: v.total ?? '',
      count_encoders: v.users ?? '',
      last_date: v.last_date ? Helper.toDetailedDate(v.last_date) : 'No update',
      base_url: base_url,
    }))
    .forEach(v => shelf_layout += Helper.replaceLayout(shelf_template, v));
  Helper.f("#shelves_container").innerHTML += shelf_layout;

  Helper.fm(".shelf_rename", e => Helper.on(e, "click", async function () {
    const data = {
      id: Helper.getDataBind(this, 'id'),
      name: Helper.getDataBind(this, 'name'),
    };
    console.log({ data })
    Modal.setSize('sm');
    Modal.setTitle('Rename Shelf');
    Modal.setBody(Helper.replaceLayout(await Helper.template('shelf/shelf-rename'), data));
    Modal.setFooter(await Modal.button('Save', 'success'));
    Modal.open();
    Modal.submit(async (e, form_data) => {
      const body = Helper.getDataFromFormData(form_data);
      if (Helper.formValidator(form_data, ["name"], v => v == '').length > 0) {
        Helper.Promt_Error('* Required fields must be filled.')
        return;
      }
      if (Helper.formValidator(form_data, ['name'], v => v.includes(' ')).length > 0) {
        Helper.Promt_Error('Name must not contain spaces.')
        return;
      }
      Helper.Promt_Clear();
      const resp = (await Helper.api(`shelf/${data.id}/update`, "json", Helper.createFormData({ name: body.name, uid: const_uid })));
      if (resp.status == 1) {
        CustomNotification.add("Success", "Shelf renamed.", "success");
        await Load_Shelves();
        Modal.close();
      } else {
        CustomNotification.addNotif("Error", "Error Occurred. Try again later.", "danger");
      }
    });
  }));

  Helper.fm(".shelf_hide", e => Helper.on(e, "click", async function () {
    const data = {
      id: Helper.getDataBind(this, 'id'),
      name: Helper.getDataBind(this, 'name'),
      uid: const_uid
    };
    console.log({ data })
    Modal.setSize('sm');
    Modal.setTitle('Hide Shelf');
    Modal.setBody(Helper.replaceLayout(await Helper.template('shelf/shelf-hide'), data));
    Modal.setFooter(await Modal.button('Hide', 'danger'));
    Modal.open();
    Modal.submit(async (e, form_data) => {
      const resp = (await Helper.api(`shelf/${data.id}/delete`, "json", new FormData()));
      if (resp.status == 1) {
        CustomNotification.add("Success", "Shelf archived.", "success");
        await Load_Shelves();
        Modal.close();
      } else {
        CustomNotification.addNotif("Error", "Error Occurred. Try again later.", "danger");
      }
    });
  }));
}