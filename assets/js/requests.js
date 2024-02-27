class RequestInterface {
  id = ''; lanme = ''; fname = ''; mname = ''; file = ''; reason = ''; created_at = ''; created_by = ''; updated_at = ''; updated_by = ''; deleted_flag = '';
  constructor(data = {}) {
    this.id = data.id ?? ''; this.lanme = data.lanme ?? ''; this.fname = data.fname ?? ''; this.mname = data.mname ?? ''; this.file = data.file ?? ''; this.reason = data.reason ?? ''; this.created_at = data.created_at ?? ''; this.created_by = data.created_by ?? ''; this.updated_at = data.updated_at ?? ''; this.updated_by = data.updated_by ?? ''; this.deleted_flag = data.deleted_flag ?? '';
  }
}

// let data_list = Array(10).fill(new RequestInterface());
let data_list = [];
async function Load_RequestList() {

  const resp = Array(10).fill(new RequestInterface());
  resp.forEach(v => data_list.push(v));
  data_list = data_list.map((v, i) => new RequestInterface({
    ...v,
    id: `${i}-id`,
    lanme: `${i}-lanme`,
    fname: `${i}-fname`,
    mname: `${i}-mname`,
    file: `${i}-file`,
    reason: `${i}-reason`,
    created_at: `2024-1-22`,
    created_by: `2024-1-22`,
    updated_at: null,
    updated_by: null,
    deleted_flag: `0`,
  }));
  console.log({ data_list })
}

(async () => {

  await Load_RequestList();

})()