import { Helper } from "../../shared/helper.js";

(async () => {
  await Load_Users();
})();

async function Load_Users() {
  const resp = (await Helper.api('user/all', 'json', Helper.createFormData({ uid: const_uid })));
  console.log({ resp })
  Helper.DataTable_Reset("#table_content");

  Helper.DataTable_Init("#table_content");
}