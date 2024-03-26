import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

const template = await Helper.template('user/user-log');
const userLogsList = (await Helper.api('user/logs', 'json', Helper.createFormData({ uid: const_uid })));
let userList = [];
let mainUserList = [];

(async () => {
  await Load_Users();
})();

Helper.onSubmit("#search_form", function (e) {
  Helper.preventDefault(e);
  const form_data = Helper.getDataFromFormData(new FormData(this));
  Search(form_data.query);
});

Helper.onClick("#refresh_table", e => Search());

async function Search(search = '') {
  let contents = '';
  userList
    .filter(v => search != '' ? String(v.Username).toLocaleLowerCase().includes(search) : true)
    .forEach(v => contents += Helper.replaceLayout(template, { uid: v['User ID'], Username: v.Username, Role: toProperRole(v.Role) }));
  if (contents == '') contents = '<div class="alert alert-light">Nothing found. Try searching again.</div>';
  Helper.f("#users_container").innerHTML = contents;
  Helper.fm(".username_item", v => Helper.on(v, 'click', Load_UserLogs));
}

async function Load_Users() {
  userList = [];
  mainUserList = [];
  const resp = (await Helper.api('user/all', 'json', Helper.createFormData({ uid: const_uid }))).result;
  resp.forEach(v => {
    userList.push(v);
    mainUserList.push(v);
  });
  Search();
}

function toProperRole(roleCode) {
  const roles = {
    A: 'Admin',
    E: 'Transcriber',
    V: 'Checker'
  }
  return roles[roleCode] ?? 'No Role';
}



async function Load_UserLogs() {
  const username = Helper.getDataBind(this, 'username');

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
  userLogsList
    .filter(v => username != '' ? String(v.username).includes(username) : true)
    .forEach((v, i) => tbody += `
    <tr>
      <td class="text-center">${i + 1}</td>
      <td class="text-nowrap"><i class="bi bi-person-circle"></i> ${v.username ?? 'Username'}</td>
      <td>${v.title ?? 'Title'}</td>
      <td>${new Date(v?.created_date ?? null).toLocaleDateString()}, ${new Date(v?.created_date ?? null).toLocaleTimeString()}</td>
    </tr>
  `);
  console.log({ tbody });

  Modal.setSize('lg')
  Modal.setTitle(`${username}'s logs`);
  Modal.setBody(`<table class="table table-striped table-sm border" id="table_content"></table>`, () => {
    Helper.DataTable_Reset('#table_content');
    Helper.DataTable_Init('#table_content', thead + tbody);
  });
  Modal.unhideCloseButton();
  Modal.open();

}