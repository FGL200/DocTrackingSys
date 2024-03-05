import { Helper } from "../../shared/helper.js";

(async () => {
  await Load_UserLogs();
})();

async function Load_UserLogs() {
  const resp = (await Helper.api('user/logs', 'json', Helper.createFormData({ uid: const_uid })));
  const thead = `
   <thead>
      <tr>
        <th class="text-center">#</th>
        <th>Username</th>
        <th>Action</th>
        <th>Date</th>
      </tr>
    </thead>
  `;
  let tbody = '';
  resp.forEach((v, i) => tbody += `
    <tr>
      <td class="text-center">${i + 1}</td>
      <td class="text-nowrap"><i class="bi bi-person-circle"></i> ${v.username ?? 'Username'}</td>
      <td>${v.title ?? 'Title'}</td>
      <td>${new Date(v?.created_date ?? null).toDateString()}, ${new Date(v?.created_date ?? null).toLocaleTimeString()}</td>
    </tr>
  `);

  Helper.DataTable_Reset('#table_content');
  Helper.DataTable_Init('#table_content', thead + tbody);
  const dataTable = new DataTable("#table_content");

}