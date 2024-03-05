import { Helper } from "../../shared/helper.js";

(async () => {
  await Load_Records();
  Helper.setupFor(const_role);
})();

async function Load_Records() {
  const resp = (await Helper.api('student/record/all', "json", Helper.createFormData({ shelf: const_shelf_name })))
  console.log({ resp })
}

Helper.f("#table_content");