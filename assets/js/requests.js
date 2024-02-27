class RequestInterface {
  id = ''; lname = ''; fname = ''; mname = ''; file = ''; reason = ''; created_at = ''; created_by = ''; updated_at = ''; updated_by = ''; deleted_flag = '';
  constructor(data = {}) {
    this.id = data.id ?? ''; this.lname = data.lname ?? ''; this.fname = data.fname ?? ''; this.mname = data.mname ?? ''; this.file = data.file ?? ''; this.reason = data.reason ?? ''; this.created_at = data.created_at ?? ''; this.created_by = data.created_by ?? ''; this.updated_at = data.updated_at ?? ''; this.updated_by = data.updated_by ?? ''; this.deleted_flag = data.deleted_flag ?? '';
  }
}

async function Load_RequestList() {

  const resp = (await Helper.api('request/all', "json", Helper.createFormData()));
  console.log({ resp })

  Helper.DataTable_Reset("#table-request");

  const data_list = Array(10).fill(new RequestInterface()).map((v, i) => new RequestInterface({ ...v, id: i }));
  const thead = `
    <thead>
      <tr>
        <th>#</th>
        <th>Student</th>
        <th>File</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
  `;

  let tbody = ''
  data_list.forEach(v => tbody += `
    <tr>
      <td>${Helper.AsID(v.id, 6, "0")}</td>
      <td>${v.lname}, ${v.fname} ${v.mname}</td>
      <td>${v.file}</td>
      <td>${v.created_at}</td>
      <td>
        asdas
      </td>
    </tr>
  `);

  Helper.DataTable_Init("#table-request", thead + tbody, async () => {

  });

}

(async () => {

  await Load_RequestList();

})()