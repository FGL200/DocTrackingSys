MAIN.addNotif("Welcome!", "ADMIN USER");

const HOME = {

    /**
     * For Searching 
     */
    SEARCH: {

        /**
         * 
         */
        quickSearch: async function (search_value) {
            await fetch(base_url + 'api/quicksearch/' + search_value)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(data);
                    MAIN.addNotif('Error occured!', err, 'r');
                })
        },

        /**
         * Add search filter on submit
         */
        onSubmit: function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                if (document.getElementById("search-filter-holder").children.length < 1) {
                    MAIN.addNotif("Search Failed!", "Filter is empty!", "r");
                } else {
                    // ADD SEARCH METHOD HERE!



                    // close modal
                    MAIN.addNotif("Search in Progress!", "Filtering Tables...", "g");
                    MODAL.close();
                }
            });
        },

        /**
         * Open Search Modal
         */
        open: function () {
            MODAL.setTitle("Search Filter");
            MODAL.setBody(`
                <div style="width: 50%; margin: 0 auto;">
                    <select id="search-filter" class="form-control" onchange="HOME.SEARCH.addFilter(this)">
                        <option data-id="0" value="0_VALUE" selected disabled>--Select Filter--</option>
                        <option data-id="1" value="1_Student">Student</option>
                        <option data-id="2" value="2_Profile">Profile</option>
                        <option data-id="3" value="3_Remarks">Remarks</option>
                    </select>
                </div>
                <div id="search-filter-holder" class="d-flex flex-row flex-wrap gap-1 justify-content-center"></div>
            `);
            MODAL.setFooter('<button class="btn btn-secondary">Search</button>');
            MODAL.setScript(`<script>HOME.SEARCH.onSubmit()</script>`)

            MODAL.open();
        },

        /**
         * Add a search Modal
         * @param {Element} e select tag 
         */
        addFilter: async function (e) {

            const value = String(e.value);
            const id = value.split("_")[0];
            const rawFilterName = value.split("_")[1]
            const filterName = "Search by " + rawFilterName;

            for (let i = 0; i < e.children.length; i++) {
                e.children[i].selected = false;
            }

            e.children[0].selected = true;

            const filter = document.createElement('span');
            filter.setAttribute("class", "card p-2 m-2 d-flex flex-column gap-1 shadow");
            filter.setAttribute("data-id", id);

            const title = document.createElement("span");
            title.setAttribute("class", "d-flex flex-row gap-1 justify-content-around align-content-center");
            title.innerHTML = "<b>" + filterName + "</b>";
            {
                const close = document.createElement("button");
                close.setAttribute("class", "d-flex flex-row justify-content-center align-content-center");
                close.setAttribute("style", "border: none; padding: .5rem; font-size: x-small; border-radius: 100%; height: 25px; width: 25px;")
                close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                close.addEventListener("click", function () {
                    filter.remove();
                });
                title.appendChild(close);
            }
            filter.appendChild(title);

            const body = document.createElement("span");
            body.setAttribute("class", "d-flex flex-column gap-1")
            {
                if (rawFilterName == "Student") {
                    body.innerHTML = `
                        <input id="filter-student-id" type="text" class="form-control" placeholder="Student ID">
                        <input id="filter-student-fname" type="text" class="form-control" placeholder="First Name">
                        <input id="filter-student-mname" type="text" class="form-control" placeholder="Middle Name">
                        <input id="filter-student-lname" type="text" class="form-control" placeholder="Last Name">
                        <input id="filter-student-sfx" type="text" class="form-control" placeholder="SFX">
                    `;
                } else if (rawFilterName == "Profile") {
                    body.innerHTML = `
                        <input id="filter-profile-id" type="text" class="form-control" placeholder="User ID">
                        <input id="filter-profile-uname" type="text" class="form-control" placeholder="User Name">
                        <input id="filter-profile-fname" type="text" class="form-control" placeholder="First Name">
                        <input id="filter-profile-lname" type="text" class="form-control" placeholder="Last Name">
                    `;
                } else if (rawFilterName == "Remarks") {
                    body.innerHTML = `
                        <input id="filter-remarks-value" type="text" class="form-control" placeholder="Remarks Value">
                        <select id="filter-remarks-category" class="form-control">
                            <option value="" disabled selected>--Select Category--</option>
                        </select>
                    `;
                }

            }
            filter.append(body);


            const itemsHolder = document.getElementById("search-filter-holder");
            let copy = 0;
            for (let i = 0; i < itemsHolder.children.length; i++) {
                if (itemsHolder.children[i].getAttribute('data-id') == id) copy++;
            }
            if (copy == 0) {
                itemsHolder.appendChild(filter);
            }

            // get all categories and save is to the Remarks option 'select' tag
            await fetch(base_url + 'api/categories')
            .then(response=>response.json())
            .then(categories=>{
                let categs = `<option value="" disabled selected>--Select Category--</option>`;
                for(i in categories)
                    categs += `<option value="${categories[i]}">${categories[i]}</option>`;
                $("#filter-remarks-category").html(categs);
            })
        }
    },

    /**
     * For Inserting new Record
     */
    NEW_RECORD: {
        open: async function () {
            MODAL.setTitle("New Record");
            MODAL.setBody(`
            <div class="d-flex flex-row flex-wrap gap-2">
                <section class="sticky-top d-flex flex-column flex-wrap flex-grow-1 gap-1 card p-2 m-2 flex-end align-self-start">
                    <span class="flex-grow-1">
                        <b>Information</b>
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_id" name="stud_id" type="text" class="p-2 card" placeholder="Student ID">
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_fname" name="stud_fname" type="text" class="p-2 card" placeholder="First Name" required>
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_mname" name="stud_mname" type="text" class="p-2 card" placeholder="Middle Name">
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_lname" name="stud_lname" type="text" class="p-2 card" placeholder="Last Name">
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_sfx" name="stud_sfx" type="text" class="p-2 card" placeholder="SFX">
                    </span>
                    <hr>
                    <span class="flex-grow-1">
                        <b>Remarks</b>
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="remarks_value" name="remarks_value" type="text" class="p-2 card" placeholder="Remarks">
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <select id="remarks-category" name="remarks-category" class="form-control">
                            <option value="" disabled selected>--Select Category--</option>
                        </select>
                    </span>
                </section>
                <section class="d-flex flex-column flex-grow-1 gap-1 card p-2 m-2">
                    <span>
                        <b>Documents</b>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_regi_form">Registration Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_regi_form" name="doc_val_regi_form" type="checkbox" class="cb-doc">
                            <input id="doc_scan_regi_form" name="doc_scan_regi_form" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_regi_form').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_good_moral">Good Moral</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_good_moral" name="doc_val_good_moral" type="checkbox" class="cb-doc">
                            <input id="doc_scan_good_moral" name="doc_scan_good_moral" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_good_moral').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_f137">Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_f137" name="doc_val_f137" type="checkbox" class="cb-doc">
                            <input id="doc_scan_f137" name="doc_scan_f137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_f137').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_f138">Form 138</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_f138" name="doc_val_f138" type="checkbox" class="cb-doc">
                            <input id="doc_scan_f138" name="doc_scan_f138" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_f138').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_birth_cert">Birth Certificate</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_birth_cert" name="doc_val_birth_cert" type="checkbox" class="cb-doc">
                            <input id="doc_scan_birth_cert" name="doc_scan_birth_cert" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_birth_cert').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_tor">Transcript of Records</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_tor" name="doc_val_tor" type="checkbox" class="cb-doc">
                            <input id="doc_scan_tor" name="doc_scan_tor" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_tor').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_app_grad">App for Graduation</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_app_grad" name="doc_val_app_grad" type="checkbox" class="cb-doc">
                            <input id="doc_scan_app_grad" name="doc_scan_app_grad" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_app_grad').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_cert_of_complete">Certificate of Completion</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_cert_of_complete" name="doc_val_cert_of_complete" type="checkbox" class="cb-doc">
                            <input id="doc_scan_cert_of_complete" name="doc_scan_cert_of_complete" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_cert_of_complete').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_req_clearance_form">Request for Clearance</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_req_clearance_form" name="doc_val_req_clearance_form" type="checkbox" class="cb-doc">
                            <input id="doc_scan_req_clearance_form" name="doc_scan_req_clearance_form" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_req_clearance_form').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_req_credentials">Request for Credentials Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_req_credentials" name="doc_val_req_credentials" type="checkbox" class="cb-doc">
                            <input id="doc_scan_req_credentials" name="doc_scan_req_credentials" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_req_credentials').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_hd_or_cert_of_trans">Honorable Dismisal / Certificate of Transferee</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_hd_or_cert_of_trans" name="doc_val_hd_or_cert_of_trans" type="checkbox" class="cb-doc">
                            <input id="doc_scan_hd_or_cert_of_trans" name="doc_scan_hd_or_cert_of_trans" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_hd_or_cert_of_trans').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    
                </section>
            </div>
            `);
            MODAL.setFooter(`<button type="submit" class="btn btn-success">Save</button>`);
            MODAL.setScript(`<script>HOME.NEW_RECORD.onSubmit(); HOME.NEW_RECORD.onFileChange();</script>`);
            MODAL.open();

            // when modal is opened, load all the categories in remarks
            await fetch(base_url + 'api/categories')
            .then(response=>response.json())
            .then(categories=>{
                let categs = `<option value="" disabled selected>--Select Category--</option>`;
                for(i in categories)
                    categs += `<option value="${categories[i]}">${categories[i]}</option>`;
                $("#remarks-category").html(categs);
            });

            $("#stud_id").focus();
        },

        onSubmit: function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                // get values
                const form = new FormData(document.getElementById("modal-container"));

                // for debugging
                form.forEach((val, key) => {
                    console.log({ key, val })
                })

                // insert data (invoke fetch)base_url + 
                await fetch(base_url + "student/insert-record", {
                    method: "post",
                    body: form
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data);

                        // reset fields and add success notify
                        document.getElementById("modal-container").reset();
                        MAIN.addNotif("Record Saved!", "New Record has been saved!", "g");;
                        document.querySelectorAll(".btnFile").forEach(button => {
                            button.classList.add("btn-success");
                            button.classList.remove("btn-warning");
                            button.disabled = true;
                        })
                        $("#stud_id").focus();
                    })
                    .catch(err => {
                        console.log(err);
                        MAIN.addNotif("Error occured!", err, "r");;
                    });
            })
        },

        onFileChange: function () {
            document.querySelectorAll(".scaned-doc").forEach(fileTag => {
                fileTag.addEventListener("change", function () {
                    const btnTag = "#" + this.id + " + button";
                    document.querySelector(btnTag).classList.remove("btn-success");
                    document.querySelector(btnTag).classList.add("btn-warning");
                });
            });

            document.querySelectorAll(".cb-doc").forEach(checkBox => {
                checkBox.addEventListener("change", function () {
                    const fileTag = "#" + this.id + " ~ button";
                    document.querySelector(fileTag).disabled = !this.checked;
                })
            })
        }
    },

    /**
     * For Importing excel file
     */
    IMPORT_EXCEL: {
        open: function () {
            MODAL.setTitle("Import Excel");
            MODAL.setBody(`
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <i class="fa-solid fa-newspaper"></i> FEATURE COMMING SOON!
                </div>
            `);
            MODAL.setFooter(``);
            MODAL.setScript(`<script>HOME.IMPORT_EXCEL.onSubmit()</script>`);
            MODAL.open();
        },

        onSubmit: function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                // IMPORT EXCEL


                MODAL.close();
            })
        }
    },

    /**
     * For generating qr codes
     */
    GENERATE_QR: {
        open: function () {
            MODAL.setTitle("Genrate QR");
            MODAL.setBody(`
            
            `);
            MODAL.setFooter(``);
            MODAL.setScript(`<script>HOME.GENERATE_QR.onSubmit()</script>`);
            MODAL.open();
        },

        onSubmit: function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                // GENERATE_QR


                MODAL.close();
            })
        }
    },

    /**
     * For Inserting new user
     */
    NEW_USER: {
        open: function () {
            MODAL.setTitle("New User");
            MODAL.setBody(`
                <div class="d-flex flex-column gap-1 card p-3">
                    <span>
                        <b>User Information</b>
                    </span>
                    <span>
                        <input type="text" name="uname" class="card p-2" placeholder="Username" style="width: 100%;">
                    </span>
                    <span>
                        <select name="role" class="card p-2" style="width: 100%;">
                            <option value="V">Viewer</option>
                            <option value="E">Encoder</option>
                            <option value="A">Admin</option>
                        </select>
                    </span>
                    <span>
                        <p class="card p-2" style="width: 100%; color: grey;">Password is set to 'default'</p>
                    </span>
                </div>
            `);
            MODAL.setFooter(`<button class="btn btn-success">Add User</button>`);
            MODAL.setScript(`<script>HOME.NEW_USER.onSubmit()</script>`);
            MODAL.open();
        },

        onSubmit: async function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                // NEW_USER
                const form = new FormData(document.getElementById("modal-container"));
                await fetch(base_url + 'new_user', {
                    method: 'post',
                    body : form
                })
                .then(response=> response.text())
                .then(result=>{ 
                    if(result){
                        MAIN.addNotif("Added new User!", "Successfully added new user", "g");
                        MODAL.close();
                    }
                })
                .catch(err=>{
                    MAIN.addNotif("Error Occured!", "Something went wrong", "r");
                    console.log(err);
                })
            })
        }
    },

    /**
     * Load Records on dashboard
     */
    DASHBOARD: {
        load_student_records: async function () {
            await fetch(base_url + 'student/all')
                .then(response => response.json())
                .then((apiResponse) => {

                    $('#table-container').removeClass('loading');

                    if($.fn.DataTable.isDataTable( '#dataTable' )){
                        $('#dataTable').DataTable().destroy();
                        $('#dataTable').html("");
                    }
                    
                    const N_TABLE = apiResponse.result; 
                    if(N_TABLE) {
                        if(N_TABLE.length > 0){
                            let table = `
                            <thead>
                                <tr>
                                    <th style="white-space: nowrap;">Record ID</th>
                                    <th style="white-space: nowrap;">First Name</th>
                                    <th style="white-space: nowrap;">Middle Name</th>
                                    <th style="white-space: nowrap;">Last Name</th>
                                    <th style="white-space: nowrap;">Suffix</th>
                                    <th style="white-space: nowrap;">Remarks</th>
                                    <th style="white-space: nowrap;">Category</th>
                                </tr>
                            </thead>
                            <tbody>`;
                            for(let i=0; i<N_TABLE.length; i++) {
                                table += '<tr>';
                                table += '<td><a href="' + base_url + 'record/' + N_TABLE[i]['Record ID'] + '" target="_blank">' + N_TABLE[i]['Record ID'] + '</a></td>';
                                table += '<td>' + (N_TABLE[i]['First Name'] ? N_TABLE[i]['First Name'] : '') + '</td>';
                                table += '<td>' + (N_TABLE[i]['Middle Name'] ? N_TABLE[i]['Middle Name'] : '') + '</td>';
                                table += '<td>' + (N_TABLE[i]['Last Name'] ? N_TABLE[i]['Last Name'] : '') + '</td>';
                                table += '<td>' + (N_TABLE[i]['Suffix'] ? N_TABLE[i]['Suffix'] : '') + '</td>';
                                table += '<td>' + (N_TABLE[i]['Remarks'] ? N_TABLE[i]['Remarks'] : '') + '</td>';
                                table += '<td>' + (N_TABLE[i]['Category'] ? N_TABLE[i]['Category'] : '') + '</td>';
                                // Object.values(row).forEach(val => { table += '<td>' + val + '</td>'; });
                                table += '</tr>';
                            };
                            table += '<tbody>';
                            $("#table-container").css({"max-width":"1000px", "max-height":"500px"});
                            $("#dataTable").html(table);
                            $('#dataTable').DataTable();
                        }
                    }else{
                        $("#dataTable").html('<p style="white-space: nowrap; margin: 0;">No data found <i class="fa-regular fa-face-frown-open"></i></p>')
                        $("#table-container").css({"max-width":"1000px", "max-height":"500px"});
                    }

                })
                .catch(err => {
                    MAIN.addNotif('Error occured!', err, 'r');
                    console.error(err);
                })
        }
    }

}

// on windows load, fetch all the student records
$(window).on('load', HOME.DASHBOARD.load_student_records);

// on ENTER in search bar, trigger quick-search
$('#id-input-search').on('keydown', async function (e) {
    if (e.keyCode === 13) {
        if ($(this).val()) await HOME.SEARCH.quickSearch($(this).val())
        else MAIN.addNotif('Search failed', 'Please enter any key word', 'r')
    }
});