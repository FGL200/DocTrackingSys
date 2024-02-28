async function Load_RequestList() {

  const resp = (await Helper.api('request/all', "json", Helper.createFormData()));
  console.log({ resp })

  Helper.DataTable_Reset("#table-request");
  const thead = `
    <thead>
      <tr>
        <th class="text-center">ID</th>
        <th>Student</th>
        <th>File</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
  `;

  let tbody = ''
  resp.forEach((v, i) => tbody += `
    <tr style="width: 10px; !important">
      <td class="text-center">
        <div class="dropdown">
          <a class="btn btn-link dropdown-toggle" href="#" role="button" id="dm-${i}" data-bs-toggle="dropdown" aria-expanded="false">
            ${Helper.AsID(v.id, 6, "0")}
          </a>
          <ul class="dropdown-menu" aria-labelledby="dm-${i}">
            <li>
              <a 
                class="dropdown-item text-success btn-open-released btn-open-released"
                data-binder-id="${v.id}"
                data-binder-lname="${v.lname}"
                data-binder-fname="${v.fname}"
                data-binder-mname="${v.mname}"
                href="#id=${Helper.AsID(v.id, 6, '0')}-released"
              >
                <i class="fa-solid fa-check"></i> Released
              </a>
            </li>
            <hr class="m-1" />
            <li>
              <a 
                class="dropdown-item text-primary btn-open-edit btn-open-edit" 
                data-binder-id="${v.id}"
                data-binder-lname="${v.lname}"
                data-binder-fname="${v.fname}"
                data-binder-mname="${v.mname}"
                data-binder-file="${v.file}"
                data-binder-reason="${v.mname}"
                data-binder-priority="${v.priority}"
                href="#id=${Helper.AsID(v.id, 6, '0')}-edit"
              >
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </a>
            </li>
            <li>
              <a 
                class="dropdown-item text-danger btn-open-remove btn-open-remove" 
                data-binder-id="${v.id}"
                data-binder-lname="${v.lname}"
                data-binder-fname="${v.fname}"
                data-binder-mname="${v.mname}"
                data-binder-id="${v.id}"
                href="#id=${Helper.AsID(v.id, 6, '0')}-remove"
              >
                <i class="fa-solid fa-minus"></i> Remove
              </a>
            </li>
          </ul>
        </div>

      </td>
      <td>${v.lname}, ${v.fname} ${v.mname}</td>
      <td>${v.file}</td>
      <td>${Helper.toDetailedDate(v.created_at)}</td>
      <td>${v.status ?? 'No status'}</td>
    </tr>
  `);



  Helper.DataTable_Init("#table-request", thead + tbody, () => {
    Helper.fm('.btn-open-released', v => {
      Helper.clearEvent(v, 'click', OpenModal_Released);
      Helper.on(v, 'click', OpenModal_Released);
    });

    Helper.fm('.btn-open-edit', v => {
      Helper.clearEvent(v, 'click', OpenModal_Edit);
      Helper.on(v, 'click', OpenModal_Edit);
    });

    Helper.fm('.btn-open-remove', v => {
      Helper.clearEvent(v, 'click', OpenModal_Remove);
      Helper.on(v, 'click', OpenModal_Remove);
    });
  });

}

async function OpenModal_Released(e) {
  const data = {
    id: Number(Helper.getDataBind(this, 'id')),
    lname: Helper.getDataBind(this, 'lname').toUpperCase(),
    fname: Helper.getDataBind(this, 'fname').toUpperCase(),
    mname: Helper.getDataBind(this, 'mname').toUpperCase(),
  };
  MODAL.setTitle('<h4 class="m-3"><i class="fa-solid fa-check"></i> Release Document</h4>');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('request/released'), data));
  MODAL.setFooter(`
    <button type="submit" class="btn btn-success">Save</button>
    <button type="button" onclick="MODAL.close()" class="btn btn-danger">Cancel</button>
  `);
  MODAL.open();
  MODAL.onSubmit(async (e, form_data) => {
    console.log(Helper.getDataFromFormData(form_data));
  });
}

async function OpenModal_Edit() {
  const data = {
    id: Number(Helper.getDataBind(this, 'id')),
    lname: Helper.getDataBind(this, 'lname'),
    fname: Helper.getDataBind(this, 'fname'),
    mname: Helper.getDataBind(this, 'mname'),
    file: Helper.getDataBind(this, 'file'),
    reason: Helper.getDataBind(this, 'reason'),
    priority: Helper.getDataBind(this, 'priority') === "1",
  }
  console.log({ data })
  MODAL.setSize('lg')
  MODAL.setTitle('<h4 class="m-3"><i class="fa-regular fa-pen-to-square"></i> Edit Request</h4>');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('request/edit'), data))
  Helper.f("#high-priority").checked = data.priority;
  MODAL.setFooter(`<button class="btn btn-success">Save</button>`)
  MODAL.open();
  MODAL.onSubmit(async (e, form_data) => {

    if (Helper.formValidator(form_data, ["lname", "fname", "request", "reason"], v => v == '').length > 0) {
      Helper.Promt_Error('* Required fields must be filled.')
      return;
    }

    Helper.Promt_Clear();

    const body = Helper.getDataFromFormData(form_data);
    const status = (await Helper.api(`request/${data.id}/update`, "json", Helper.createFormData({ ...body, priority: body.priority == "on" ? 1 : 0 }))).status;
    if (status == "success") {
      MAIN.addNotif("Success", "Request is updated.", "g");
      MODAL.close();
      await Load_RequestList();
    } else {
      MAIN.addNotif("Error", "Error Occurred. Try again later.", "r");
    }
  });
}

async function OpenModal_Remove() {
  const data = {
    id: Number(Helper.getDataBind(this, 'id')),
    lname: Helper.getDataBind(this, 'lname').toUpperCase(),
    fname: Helper.getDataBind(this, 'fname').toUpperCase(),
    mname: Helper.getDataBind(this, 'mname').toUpperCase(),
  };
  MODAL.setTitle('<h4 class="m-3"><i class="fa-solid fa-box-archive"></i> Remove Request</h4>');
  MODAL.setBody(Helper.replaceLayout(await Helper.template('request/remove'), data));
  MODAL.setFooter(`
    <button type="submit" class="btn btn-danger">Remove</button>
  `);
  MODAL.open();
  MODAL.onSubmit(async (e) => {
    const status = (await Helper.api(`request/${data.id}/delete`, "json")).status;
    if (status == "success") {
      MAIN.addNotif("Success", "Request is added to archived.", "g");
      MODAL.close();
      await Load_RequestList();
    } else {
      MAIN.addNotif("Error", "Error Occurred. Try again later.", "r");
    }
  });

}

(async () => {

  await Load_RequestList();

})()