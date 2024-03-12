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
  resp.map(v => ({ ...v, fullname: `${v.lname}, ${v.fname} ${v.mname}` })).forEach((v, i) => tbody += `
    <tr>
      <td class="text-center" style="width: 30px;">${i + 1}</td>
      <td>${v.fullname}</td>
      <td>${v.file}</td>
      <td style="width: 100px;">
        <button class="btn btn-primary restore" data-binder-id="${Number(v['Record ID'])}">
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
      };

      // const resp = (await Helper.api(`student/record/${data.id}/update`, 'json', Helper.createFormData({ uid: const_uid, deleted_flag: 0 })));
      const resp = { status: 0 };
      console.log({ resp })
      if (resp.status == 1) {
        CustomNotification.add("Success", `Shelf ${data.name} is restored`, "success");
        await Load_Table();
      } else {
        CustomNotification.add("Error", "Error occurred. Try again later.", "danger");
      }
    }));
  });
}
