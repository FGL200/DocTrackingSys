import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";


Helper.onClick("#reload_content", () => { Load_List() });

(async () => {
  await Load_List();
})();

async function Load_List(search = null) {
  let resp = [];
  if (!search) {
    resp = await Helper.api('request/all', 'json', new FormData());
  } else {
    resp = search;
  }

  let thead = `
    <thead>
      <tr>
        <th>#</th>
        <th>Requestor</th>
        <th>Request Date</th>
        <th>Files</th>
        <th>Status</th>
        <th>Due Date</th>
      </tr>
    </thead>
  `;

  
  let tbody = '<tbody>';
  resp.forEach(req => {
    let tr = '<tr>';

    Object.keys(req).forEach((val, index) => {
      let td = '<td class="relative">';
      switch (val) {
        case 'ID':
          const rawID = Helper.AsID(req[val], 4, '0', '#');
          req[val] = `<a class='request-id' href='${Helper.getURL() + '#' + rawID}' data-binder-req-id='${rawID}'>${rawID}</a>`
          req[val] += `<div class='d-flex flex-column d-none b-color-w rounded border request-actions' style='position:absolute;'>
                                ${JSON.parse(req['Status'])['value'] == 'Pending'
              ? `<button class='btn btn-req-action' data-binder-req-id='${rawID}' data-binder-req-status='Released' style='font-size : 1rem;'>Released</button>
                                                            <button class='btn btn-req-action' data-binder-req-id='${rawID}' data-binder-req-status='Not Released' style='font-size : 1rem;'>Not Released</button>
                                                            `
              : `<button class='btn btn-req-action' data-binder-req-id='${rawID}' data-binder-req-status='Archive' style='font-size : 1rem;'>Archive</button>`}
                            </div>
                            `
          break
        case 'Status':
          req[val] = JSON.parse(req[val])['value'];
          break
        case 'Requested Date':
          req[val] = to12HoursFormat(req[val]);
          break
      }
      td += req[val];
      tr += td;
    })

    tr += '</tr>';
    tbody += tr;
  })
  tbody += '</tbody>';


  Helper.DataTable_Reset('#table_content');
  Helper.DataTable_Init('#table_content', thead + tbody);

  Helper.fm('table tr', req => {
    Helper.find(req, 'a', (a) => {
      Helper.on(a, 'click', (e) => {
        Helper.preventDefault(e);
        $(".request-id + div").addClass('d-none');
        $(e.target).next('div').toggleClass('d-none');
      })
    })
  })
  Helper.fm('button.btn-req-action', (btn) => {
    Helper.on(btn, 'click', async (e) => {
      const target = e.target;

      const id = Helper.getDataBind(target, 'req-id').replaceAll("#", '');
      const req_action = Helper.getDataBind(target, 'req-status');
      console.log({ id })

      let modal_body = "";
      let notif_message = '';

      switch (req_action) {
        case 'Released':
        case 'Not Released':
          modal_body = `<p> Are you sure to mark this request #${id} as ${req_action} ? </p>`
          notif_message = `Request #${id} is now mark as ${req_action}.`
          break
        case 'Archive':
          modal_body = `<p> Are you sure to move this request #${id} in ${req_action} ? </p>`
          notif_message = `Request #${id} is moved in ${req_action}.`
          break
      }

      Modal.setTitle(` ${req_action} Request `);
      Modal.setBody(modal_body)

      Modal.setFooter(await Modal.button('Confirm', 'success'));
      Modal.submit(async (e, formdata) => {
        let form_body = {};

        if (['Released', 'Not Released'].includes(req_action)) form_body['status'] = req_action;
        else if (req_action == 'Archive') form_body['deleted_flag'] = 1;

        const resp = (await Helper.api(`request/${Number(id)}/update`, 'json', Helper.createFormData(form_body, formdata)));
        console.log({ resp })
        const { status, message } = resp;

        if (status == 1) {
          CustomNotification.add('Success', notif_message, 'success');
        } else {
          CustomNotification.add('Error', `Error in Request #${id}`, 'danger');
          console.warn(message)
        }
      })
      Modal.open()
    })
  });
}

Helper.onClick("#advance_search", async () => {
  Modal.setSize('lg');
  Modal.setTitle('Advance Search');
  Modal.setBody(await Helper.template('request/advance-search'));
  Modal.setFooter(await Modal.button('Search', 'success'))
  Modal.open();
  Modal.submit(async (e, form_data) => {
    if (Helper.ObjectToArray(Helper.getDataFromFormData(form_data)).filter(v => v.value != '').length == 0) {
      await Load_List();
      Modal.close();
      return;
    }

    const resp = (await Helper.api('request/search', 'json', form_data));
    await Load_List(resp);
    Modal.close();
  });
});




function to12HoursFormat(dateString) {
  let date = new Date(dateString);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  let PA = hour >= 12 ? 'PM' : 'AM'
  hour = hour > 12 || hour == 0 ? Math.abs(hour - 12) : hour
  return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year} ${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec} ${PA}`
}


// window.addEventListener("click", e => {
//   Helper.fm(".request-actions", ra => {
//     if (!ra.contains(e.target)) {
//       if (!ra.classList.contains("d-none")) ra.classList.add("d-none");
//     }
//   });
// });