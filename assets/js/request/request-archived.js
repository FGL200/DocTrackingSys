import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";

(async () => {
  await Load_Table();
})();

async function Load_Table() {
  const resp = (await Helper.api('request/archives', 'json', Helper.createFormData({ uid: const_uid })));
  console.log({ resp })
  const thead = `
    <thead>
      <tr>
        <th class="text-center" style="width: 30px;">#</th>
        <th>Requestor's Name</th>
        <th>File</th>
        <th style="width: 100px;">Action</th>
      </tr>
    </thead>
  `;
  let tbody = '';
  resp.map(v => ({ ...v, fullname: v['Requestor'], file : JSON.parse(v['Requested File']).map(f => `<button class='btn ${f.Status.value == "Pending" ? 'btn-warning' : f.Status.value == "Released" ? "btn-success" : "btn-danger"}'>${f.Name}</button>`), /**status: JSON.parse(v.status)**/ })).forEach((v, i) => tbody += `
    <tr>
      <td class="text-center" style="width: 30px;">${i + 1}</td>
      <td>${v.fullname}</td>
      <td>${v.file}</td>
      <td style="width: 100px;">
        <button class="btn btn-primary restore" data-binder-id="${v.ID}" data-binder-fullname="${v.fullname}">
          <i class="bi bi-save"></i> Restore
        </button>
      </td>
    </tr>
  `);
  Helper.DataTable_Reset("#table_content");
  Helper.DataTable_Init("#table_content", thead + tbody, () => {
    Helper.fm(".restore", v => Helper.on(v, "click", async function (e) {
      const data = {
        id: Helper.getDataBind(this, 'id'),
        fullname: Helper.getDataBind(this, 'fullname'),
      };

      const resp = (await Helper.api(`/request/${data.id}/recover`, 'json', Helper.createFormData({ uid: const_uid })));
      // const resp = { status: 0 };
      console.log({ resp })
      if (resp.status == 1) {
        CustomNotification.add("Success", `Request of ${data.fullname} is restored.`, "success");
        await Load_Table();
      } else {
        CustomNotification.add("Error", "Error occurred. Try again later.", "danger");
      }
    }));
  });
}
