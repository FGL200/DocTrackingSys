import { Helper } from "../../shared/helper.js";

(async () => {
  await Load_Table();
})();

async function Load_Table() {
  const resp = (await Helper.api('student/record/trash', 'json', new FormData()));
  console.log(resp);
  Helper.f("#table_content");
}
