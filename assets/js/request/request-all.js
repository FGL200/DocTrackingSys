import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";
import { Modal } from "../../shared/modal.js";

Helper.onClick("#reload_content", () => {
	Load_List();
});

(async () => {
	await Load_List();
})();

async function Load_List(search = null) {
	let resp = [];
	if (!search) {
		resp = await Helper.api("request/all", "json", new FormData());
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
        <th>Due Date</th>
      </tr>
    </thead>
  `;

	let tbody = "<tbody>";
	resp.forEach((req) => {
		let tr = "<tr c>";

		Object.keys(req).forEach((val, index) => {
			let td = '<td class="relative">';
			switch (val) {
				case "ID":
					const rawID = Helper.AsID(req[val], 4, "0", "#");
					req[val] = `<div>
                          <a data-bs-toggle="dropdown" class='request-id' href='${
														Helper.getURL() + "#" + rawID
													}' data-binder-req-id='${rawID}'>${rawID}</a>
                          <ul class='dropdown-menu'>
                            <li><button class="dropdown-item archive-file border" data-binder-req-id = "${
															req[val]
														}">Archive</button><li>
                            <li><button class="dropdown-item update-file border" data-binder-req-id = "${
															req[val]
														}">Edit</button><li>
                          </ul>
                      </div>`;
					break;
				case "Requested Date":
					req[val] = to12HoursFormat(req[val]);
					break;
				case "Requested File":
					const newVal = JSON.parse(req[val]);
					let div = "<div class='d-flex gap-3 dropdown'>";
					console.log(newVal)
					let td = "";
					if(newVal.length > 0) 
						newVal.forEach((v, k) => {
							const statusColor =
								v["Status"].value == "Pending"
									? "btn-warning"
									: v["Status"].value == "Released"
									? "btn-success"
									: "btn-danger";
							const isDropdown = v["Status"].value == "Pending" ? true : false;
							const title =
								v["Status"].value == "Not Released" ? v["Status"].reason : "";

							td += `<button title='${title}' class='btn ${statusColor} py-1 px-2' ${
								isDropdown ? 'data-bs-toggle="dropdown"' : ""
							}>${v["Name"]}</button>`;
							if (v["Status"].value == "Pending")
								td += `
										<ul class="dropdown-menu">
										<li><button class="dropdown-item req-file-action" data-binder-req-file='${JSON.stringify(
																{ ID: v["ID"], Action: "Released" }
															)}'>Released</button></li>
										<li><button class="dropdown-item req-file-action" data-binder-req-file='${JSON.stringify(
																{ ID: v["ID"], Action: "Not Released" }
															)}'>Not Released</button></li>
										</ul>
									`;
						});
					else 
						td += '<div></div>'
						
					div += td + "</div>";
					req[val] = div;
					break;
			}
			td += req[val];
			tr += td;
		});

		tr += "</tr>";
		tbody += tr;
	});
	tbody += "</tbody>";

	Helper.DataTable_Reset("#table_content");
	Helper.DataTable_Init("#table_content", thead + tbody, null, null, {ordering : false});

	Helper.fm("li > button.archive-file", (btn) => {
		Helper.on(btn, "click", async (e) => {
			const target = e.target;
			const data = Helper.getDataBind(target, "req-id");

			let modal_body = "";

			Modal.setTitle(`Archive Request`);
			Modal.setBody(`
                      <p>Are your sure to move this Request (#${data.padStart(
												4,
												"0"
											)}) in Archive ?</p>
                    `);
			Modal.setFooter(await Modal.button("Confirm", "success"));
			Modal.submit(async (e, formdata) => {
				const resp = await Helper.api(
					`request/${data}/update`,
					"json",
					Helper.createFormData({ deleted_flag: 1 }, formdata)
				);

				if (resp["status"] > 0) {
					CustomNotification.add(
						"Success",
						"Request moved in archive",
						"success"
					);
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} else {
					CustomNotification.add("Error", resp["message"], "danger");
				}
			});
			Modal.open();
		});
	});

	Helper.fm("li > button.update-file", (btn) => {
		Helper.on(btn, "click", async (e) => {
			const target = e.target;
			const data = Helper.getDataBind(target, "req-id");

      let s_Req = await Helper.api(`request/${data}`, 'json');
      s_Req = s_Req[0];

      s_Req['Requested File'] = JSON.parse(s_Req['Requested File']);

			Modal.setTitle(`Update Request`);
			Modal.setBody(`
                        <section class="section container-fluid">
                        
                          <div class="card-title">Request details</div>                    
                            <div class="col-lg-4 col-md-4 col-sm-4">
                              <div class="form-group mb-3">
                                <label for="lname">Last Name <small class="text-danger">*</small></label>
                                <input id="lname" name="lname" type="text" class="form-control" value="${s_Req['Requestor'].split(',')[0]}">
                              </div>
                            </div>
                    
                            <div class="col-lg-4 col-md-4 col-sm-4">
                              <div class="form-group mb-3">
                                <label for="fname">First Name <small class="text-danger">*</small></label>
                                <input id="fname" name="fname" type="text" class="form-control" value="${s_Req['Requestor'].split(',')[1]}">
                              </div>
                            </div>
                    
                            <div class="col-lg-4 col-md-4 col-sm-4">
                              <div class="form-group mb-3">
                                <label for="mname">Middle Name</label>
                                <input id="mname" name="mname" type="text" class="form-control" value="${s_Req['Requestor'].split(',')[2] ?? ''}">
                              </div>
                            </div>
                           
                            <div class="col-12">
                              <div class="form-group mb-3">
                                <span>Purpose</span>
                                <textarea name="reason" id="" class="form-control" rows="1">${s_Req['Reason']}</textarea>
                              </div>
                            </div>
                    
                            <div class="col-6">
                              <div class="form-group mb-3">
                                <label for="due_date">Due Date</label>
                                <input id="due_date" name="due_date" type="date" value="${s_Req['Due Date']}" class="form-control">
                              </div>
                            </div>
                    
                            <div class="col-6 align-self-center">
                              <div class="form-check form-switch mb-3">
                                <input type="checkbox" ${s_Req['Priority'] > 0 ? 'checked' : ''} name="priority" class="form-check-input" id="switchPriority">
                                <label for="switchPriority" class="form-check-label">High Priority</label>
                              </div>
                            </div>          
                      </section>
                    `);
			
			Modal.setFooter(await Modal.button("Save", "success"));

			Modal.submit(async (e, formdata) => {
				const resp = await Helper.api(
					`request/${data}/update`,
					"json",
          formdata
				);

				if (resp["status"] > 0) {
					CustomNotification.add(
						"Success",
						"Request successfully updated",
						"success"
					);
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} else {
					CustomNotification.add("Error", resp["message"], "danger");
				}
			});
			Modal.open();
		});
	});

	Helper.fm("li > button.req-file-action", (btn) => {
		Helper.on(btn, "click", async (e) => {
			const target = e.target;
			const data = JSON.parse(Helper.getDataBind(target, "req-file"));

			let modal_body = "";
			let notif_message = "";

			switch (data["Action"]) {
				case "Released":
					modal_body = `
          <input type='hidden' name='id' value='${data["ID"]}' />
          <input type='hidden' name='status' value='${data["Action"]}' />
          
          <p> Are you sure to mark this requested file as ${data["Action"]} ? </p>
          `;
					break;
				case "Not Released":
					modal_body = `
                        <input type='hidden' name='id' value='${data["ID"]}' />
                        <input type='hidden' name='status' value='${data["Action"]}' />

                        <p> Are you sure to mark this requested file as ${data["Action"]} ? </p>
                        <input type='text' name='reason' class='form-control' placeholder='Reason ...'/>
                        `;
					break;
			}

			notif_message = `Request #${data["ID"]} is now mark as ${data["Action"]}.`;
			Modal.setTitle(` ${data["Action"]} requested file `);
			Modal.setBody(modal_body);

			Modal.setFooter(await Modal.button("Confirm", "success"));

			Modal.submit(async (e, formdata) => {
				if (!Helper.isValidForm(formdata, ["reason"])) return;

				const resp = await Helper.api(
					`requested-file/update`,
					"json",
					formdata
				);

				if (resp["status"] > 0) {
					CustomNotification.add("Success", notif_message, "success");
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} else {
					CustomNotification.add("Error", resp["message"], "danger");
				}
			});
			Modal.open();
		});
	});
}

Helper.onClick("#advance_search", async () => {
	Modal.setSize("lg");
	Modal.setTitle("Advance Search");
	Modal.setBody(await Helper.template("request/advance-search"));
	Modal.setFooter(await Modal.button("Search", "success"));
	Modal.open();
	Modal.submit(async (e, form_data) => {
		if (
			Helper.ObjectToArray(Helper.getDataFromFormData(form_data)).filter(
				(v) => v.value != ""
			).length == 0
		) {
			await Load_List();
			Modal.close();
			return;
		}

		const req = Helper.getDataFromFormData(form_data);

		let resp = await Helper.api(
			"request/search",
			"json",
			Helper.createFormData({ ...req, uid: const_uid })
		);
		await Load_List(resp);
		Modal.close();
	});
});

function to12HoursFormat(dateString) {
	let date = new Date(dateString);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let PA = hour >= 12 ? "PM" : "AM";
	hour = hour > 12 || hour == 0 ? Math.abs(hour - 12) : hour;
	return `${month < 10 ? "0" + month : month}-${
		day < 10 ? "0" + day : day
	}-${year} ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${
		sec < 10 ? "0" + sec : sec
	} ${PA}`;
}

// window.addEventListener("click", e => {
//   Helper.fm(".request-actions", ra => {
//     if (!ra.contains(e.target)) {
//       if (!ra.classList.contains("d-none")) ra.classList.add("d-none");
//     }
//   });
// });
