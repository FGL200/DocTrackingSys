import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

(async () => {
  await Load_Records();
  Helper.setupFor(const_role);
})();

Helper.onClick("#reload_shelf", () => { Load_Records() });

async function Load_Records(search = null) {
  let resp = [];
  if (!search)
    resp = (await Helper.api('student/record/all', "json", Helper.createFormData({ shelf: const_shelf_name }))).result;
  else
    resp = search;

  const thead = `
    <thead>
      <tr>
        <th class="text-center align-middle">#</th>
        <th class="align-middle">Record Information</th>
        <th class="text-center" style="width: 250px">Remarks</th>
      </tr>
    </thead>
  `;
  let tbody = '';
  resp
    .map(v => ({
      ...v,
      id: v['Record ID'],
      Remarks: v.Remarks == '--' ? [] : String(v.Remarks).includes('[') ? JSON.parse(v.Remarks) : [v.Remarks],
      fullname: `${v['Last Name']}, ${v['First Name']} ${v['Middle Name']} ${v['Suffix'] == '--' ? '' : v['Suffix']}`,
      number: v['Student ID'],
    }))
    .forEach((v, i) => tbody += `
    <tr>
      <td class="text-center align-middle">
        <a href="${base_url}record/entry/${v.id}" class="link text-primary text-decoration-underline small">#${v.id}</a>
      </td>
      <td class="align-middle">
        <a 
          class="link link-primary d-block small mb-2 mt-2" 
          data-bs-toggle="collapse" 
          data-bs-target="#collapse-info-${i}" 
          aria-expanded="false" 
          aria-controls="collapse-info-${i}" 
          href="#${v.id}"
        >
          ${v.fullname}
        </a>
        <div class="collapse" id="collapse-info-${i}">
          <div class="small">
            <p class="m-0">${v.number != null ? `<b>Student Number: </b> ${v.number}` : ''}</p>
            <p class="m-0">${v.cby != null ? `<b>Created by: </b> ${v.cby}` : ''}</p>
            <p class="m-0">${v.cdate != null ? `<b>Created on: </b> ${v.cdate}` : ''}</p>
            <p class="m-0">${v.uby != null ? `<b>Updated by: </b> ${v.uby}` : ''}</p>
            <p class="m-0">${v.udate != null ? `<b>Updated on: </b> ${v.udate}` : ''}</p>
          </div>
        </div>
      </td>
      <td class="text-center align-middle" style="width: 250px">
        ${v.Remarks.length == 0 ? '<div class="text-success small">No Remarks</div>' : `
          <button 
            type="button"
            class="btn btn-danger btn-sm mb-2 mt-2" 
            data-bs-toggle="collapse" 
            data-bs-target="#collapse-remarks-${i}" 
            aria-expanded="false" 
            aria-controls="collapse-remarks-${i}"
          >
            Show ${v.Remarks.length} Remark(s) <i class="bi bi-caret-down-fill"></i>
          </button>
          <div class="collapse" id="collapse-remarks-${i}">
            <div class="d-flex flex-wrap justify-content-center gap-2">
              ${String(v.Remarks.map(v => `<div class="alert alert-danger p-2 m-0 small pt-1">${v}</div>`)).replaceAll(',', '')}
            </div>
          </div>
        `}
      </td>
    </tr>
  `);

  console.log({ resp })
  Helper.DataTable_Reset("#table_content");
  Helper.DataTable_Init("#table_content", thead + tbody)
}

Helper.f("#table_content");

Helper.onClick("#advance_search", async () => {
  Modal.setSize('lg')
  Modal.setTitle('Advance Search');
  Modal.setBody(await Helper.template('shelf/advance-search'), () => {
    Helper.onChange("#search_filter", function () {
      const value = this.value;
      this.value = "";
      switch (value) {
        case 'Student': Helper.f("#btn_student").click(); break;
        case 'Transcriber': Helper.f("#btn_transcriber").click(); break;
        case 'Remarks': Helper.f("#btn_remarks").click(); break;
        case 'By Me': Helper.f("#btn_byme").click(); break;
        default: break;
      }
    });
    Helper.onClick("#btn_byme", async () => {
      const resp = (await Helper.api(`student/record/by/${const_uid}`, 'json'));
      await Load_Records(resp.result)
      Modal.close();
    });
  });
  Helper.setupFor(const_role);
  Modal.setFooter(await Modal.button('Search', 'primary'));
  Modal.open();
  Modal.submit(async (e, form_data) => {
    if (Helper.ObjectToArray(Helper.getDataFromFormData(form_data)).filter(v => v.value != '').length == 0) {
      await Load_Records();
      Modal.close();
      return;
    }

    const resp = (await Helper.api('student/filter', 'json', Helper.createFormData({ shelf: const_shelf_name }, form_data)));
    await Load_Records(resp.result);
    Modal.close();
  });
});

Helper.onClick("#new_record", () => {
  localStorage.setItem('selected_shelf', const_shelf_name);
  location.href = `${base_url}record/new`;
});