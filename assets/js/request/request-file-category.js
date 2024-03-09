import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

(async () => {
  await Load_Categories();
})();

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

    const resp = (await Helper.api('file-request-category/add', 'json', Helper.createFormData({ uid: const_uid }, form_data)));
    if (resp.status == '1') {
      CustomNotification.add('Success', 'Successfully added new category.', 'success');
      Helper.Promt_Clear();
      Modal.close();
      await Load_Categories();
    } else {
      CustomNotification.add('Error', "System Error. Check error logs.", 'danger');
    }
  });
});

async function Load_Categories() {
  const resp = (await Helper.api('file-request-category/all', 'json'));
  console.log({ resp })
  const thead = `
    <thead>
      <tr>
        <th style="width: 20px;"></th>
        <th>Category name</th>
      </tr>
    </thead>
  `;
  let tbody = '';
  resp.forEach((v, i) => tbody += `
    <tr>
      <td class="text-center" style="width: 20px;">
        <div class="btn-group">
          <a class="link link-primary rounded" data-bs-toggle="dropdown" aria-expanded="false" href="#${v.name}">
            <i class="bi bi-three-dots-vertical"></i>
          </a>
          <ul class="dropdown-menu">
            <li><div class="dropdown-header">Action</div></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item edit" data-binder-id="${v.id}" data-binder-name="${v.name}"  href="#${v.name}"><i class="bi bi-pencil-square"></i> Edit </a></li>
            <li><a class="dropdown-item delete" data-binder-id="${v.id}" data-binder-name="${v.name}"  href="#${v.name}"><i class="bi bi-slash-circle"></i> Remove</a></li>
          </ul>
        </div>
      </td>
      <td>${v.name}</td>
    </tr>
  `);
  Helper.DataTable_Reset("#table_content");
  Helper.DataTable_Init("#table_content", thead + tbody, () => {

    Helper.fm(".edit", btn_edit => {
      Helper.on(btn_edit, "click", async () => {
        const data = {
          id: Helper.getDataBind(btn_edit, 'id'),
          name: Helper.getDataBind(btn_edit, 'name'),
        }
        Modal.setTitle('Edit Category');
        Modal.setBody(Helper.replaceLayout(await Helper.template('request/edit-category'), data));
        Modal.setFooter(await Modal.button('Save', 'success'))
        Modal.open();
        Modal.submit(async (e, form_data) => {
          if (Helper.formValidator(form_data, ['name'], v => v == '').length > 0) {
            Helper.Promt_Error('Enter valid name for category.');
            return;
          }
          const resp = (await Helper.api(`file-request-category/${data.id}/update`, 'json', Helper.createFormData({'uid' : const_uid}, form_data)));
          if (resp.status == '1') {
            CustomNotification.add('Success', 'Category updated.', 'success');
            Helper.Promt_Clear();
            Modal.close();
            await Load_Categories();
          } else {
            CustomNotification.add('Error', "System Error. Check error logs.", 'danger');
          }

        });
      });
    });

    Helper.fm(".delete", btn_delete => {
      Helper.on(btn_delete, "click", async () => {
        const data = {
          id: Helper.getDataBind(btn_delete, 'id'),
          name: Helper.getDataBind(btn_delete, 'name'),
        }
        Modal.setTitle('Delete Category');
        Modal.setBody(Helper.replaceLayout(await Helper.template('request/delete-category'), data));
        Modal.setFooter(await Modal.button('Save', 'success'))
        Modal.open();
        Modal.submit(async (e, form_data) => {

          const resp = (await Helper.api(`file-request-category/${data.id}/delete`, 'json', Helper.createFormData({'uid' : const_uid}, form_data)));
          if (resp.status == '1') {
            CustomNotification.add('Success', 'Category deleted.', 'success');
            Helper.Promt_Clear();
            Modal.close();
            await Load_Categories();
          } else {
            CustomNotification.add('Error', "System Error. Check error logs.", 'danger');
          }


        });
      });
    });
  });
}