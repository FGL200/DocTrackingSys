MAIN.addNotif("Welcome!", CONST_UNAME);
let home_current_open_modal = null;

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
            home_current_open_modal = 'SEARCH';
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
            MODAL.setScript(`HOME.SEARCH.onSubmit();`)

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
                            <option value="" disabled selected>--Select Remarks--</option>
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
                .then(response => response.json())
                .then(categories => {
                    let categs = `<option value="" disabled selected>--Select Remarks--</option>`;
                    for (i in categories)
                        categs += `<option value="${categories[i]}">${categories[i]}</option>`;
                    $("#filter-remarks-category").html(categs);
                })
        }
    },

    /**
     * For Inserting new Record
     */
    NEW_RECORD: {
        _remarksValue: [],

        open: async function () {
            home_current_open_modal = 'NEW_RECORD';
            MODAL.setTitle("New Record");
            MODAL.setBody(`
            <div class="d-flex flex-row flex-wrap gap-2">
                <section class="shadow   d-flex flex-column flex-wrap flex-grow-1 gap-1 card p-2 m-2 flex-end align-self-start">
                    <span class="flex-grow-1">
                        <b>Information</b>
                    </span>
                    <span class="d-flex justify-content-center align-items-center gap-1">
                        <input id="stud_id" name="stud_id" type="text" autocomplete="off" class="p-2 card" placeholder="Student ID">
                    </span>
                    <span class="d-flex justify-content-center align-items-center gap-1">
                        <input id="stud_lname" name="stud_lname" type="text" autocomplete="off" class="p-2 card" placeholder="Last Name">
                    </span>
                    <span class="d-flex justify-content-center align-items-center gap-1">
                        <input id="stud_fname" name="stud_fname" type="text" autocomplete="off" class="p-2 card" placeholder="First Name" required>
                    </span>
                    <span class="d-flex justify-content-center align-items-center gap-1">
                        <input id="stud_mname" name="stud_mname" type="text" autocomplete="off" class="p-2 card" placeholder="Middle Name">
                    </span>
                    <span class="d-flex justify-content-center align-items-center gap-1">
                        <input id="stud_sfx" name="stud_sfx" type="text" autocomplete="off" class="p-2 card" placeholder="SFX">
                    </span>
                    <hr>
                    <span class="flex-grow-1">
                        <b>Remarks</b>
                    </span>
                    <span class="d-flex justify-content-center align-items-center gap-1">
                        <select id="remarks-category" name="remarks-category" class="p-2 card">
                            <option value="" disabled selected>--Select Remarks--</option>
                        </select>
                        <button type="button" onclick="$('#_remarksValue_other_holder').removeClass('hide'); $('#_remarksValue_other').focus();" class="btn btn-primary">Other</button>
                    </span>
                    <span id="_remarksValue_other_holder" class="d-flex flex-grow-1 gap-2 hide">
                        <input class="card p-1 flex-grow-1" type="text" name="_remarksValue_other" id="_remarksValue_other" placeholder="Enter Remarks" />
                        <button type="button" onclick="$('#_remarksValue_other_holder').addClass('hide'); $('#_remarksValue_other').val('');" class="btn btn-danger"><i class="fa-solid fa-xmark"></i></button>
                    </span>
                    <span id="remarks-holder" class="d-flex flex-row flex-wrap gap-1 p-1 card" style="background-color: rgba(0,0,0,0.1); max-width: 380px;">
                        No Remarks
                    </span>
                    
                </section>
                <section class="shadow   d-flex flex-column flex-grow-1 gap-1 card p-2 m-2">
                    <span>
                        <b>Documents</b>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_regi_form">Registration Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_regi_form" name="doc_val_regi_form" type="checkbox" class="cb-doc">
                            <input id="doc_scan_regi_form" name="doc_scan_regi_form" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_regi_form').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_good_moral">Good Moral</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_good_moral" name="doc_val_good_moral" type="checkbox" class="cb-doc">
                            <input id="doc_scan_good_moral" name="doc_scan_good_moral" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_good_moral').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_f137">Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_f137" name="doc_val_f137" type="checkbox" class="cb-doc">
                            <input id="doc_scan_f137" name="doc_scan_f137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_f137').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_f138">Form 138</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_f138" name="doc_val_f138" type="checkbox" class="cb-doc">
                            <input id="doc_scan_f138" name="doc_scan_f138" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_f138').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_birth_cert">Birth Certificate</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_birth_cert" name="doc_val_birth_cert" type="checkbox" class="cb-doc">
                            <input id="doc_scan_birth_cert" name="doc_scan_birth_cert" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_birth_cert').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_tor">Transcript of Records</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_tor" name="doc_val_tor" type="checkbox" class="cb-doc">
                            <input id="doc_scan_tor" name="doc_scan_tor" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_tor').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_app_grad">App for Graduation</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_app_grad" name="doc_val_app_grad" type="checkbox" class="cb-doc">
                            <input id="doc_scan_app_grad" name="doc_scan_app_grad" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_app_grad').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_cert_of_complete">Certificate of Completion</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_cert_of_complete" name="doc_val_cert_of_complete" type="checkbox" class="cb-doc">
                            <input id="doc_scan_cert_of_complete" name="doc_scan_cert_of_complete" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_cert_of_complete').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_req_clearance_form">Request for Clearance</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_req_clearance_form" name="doc_val_req_clearance_form" type="checkbox" class="cb-doc">
                            <input id="doc_scan_req_clearance_form" name="doc_scan_req_clearance_form" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_req_clearance_form').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_req_credentials">Request for Credentials Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_req_credentials" name="doc_val_req_credentials" type="checkbox" class="cb-doc">
                            <input id="doc_scan_req_credentials" name="doc_scan_req_credentials" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_req_credentials').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_hd_or_cert_of_trans">Honorable Dismisal / Certificate of Transferee</label>
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
            MODAL.setFooter(`<button id="btn-form-submit" type="submit" class="btn btn-success" id="btn-form-submit">Save</button>`);
            MODAL.setScript(`HOME.NEW_RECORD.init_onSubmit(); HOME.NEW_RECORD.init_onFileChange();  HOME.NEW_RECORD.init_addRemarks();`);
            MODAL.open();

            // when modal is opened, load all the categories in remarks
            await LOAD_REMARKS_ON_ID('remarks-category');

            $("#stud_lname").focus();
        },

        addRemarksOnChange: function (value) {
            if ($("#remarks-holder").html().replaceAll(' ', '').replaceAll(/(\r\n|\n|\r)/gm, "") === "NoRemarks")
                $("#remarks-holder").html("");
            const span = $(`<span class="card"></span>`);
            span.text(value);
            span.css({ "cursor": "pointer", "padding": "5px 10px" });
            span.hover(
                function () { $(this).css("background-color", "#FDEDEC"); },
                function () { $(this).css("background-color", "#fff"); }
            );
            span.on("click", function (e) {
                e.preventDefault();
                $(this).remove();
                if ($("#remarks-holder").html().replaceAll(' ', '').replaceAll(/(\r\n|\n|\r)/gm, "") === "")
                    $("#remarks-holder").html("No Remarks");
                HOME.NEW_RECORD._loadRemearksVal();
            });
            let count = 0;
            $("#remarks-holder").find('span').each(function (e) {
                if ($(this).html() === span.html()) count++;
            });
            if (count === 0) $("#remarks-holder").append(span);
            HOME.NEW_RECORD._loadRemearksVal();
        },

        _loadRemearksVal: function () {
            HOME.NEW_RECORD._remarksValue = [];
            $("#remarks-holder").find('span').each(function (e) {
                HOME.NEW_RECORD._remarksValue.push($(this).text());
            });
        },

        init_addRemarks: function () {
            $("#remarks-category").on("change", function (e) {
                // Get current value
                HOME.NEW_RECORD.addRemarksOnChange($("#remarks-category").val());
                // Get all the option elements within the select
                $(this).find('option').each(function () {
                    // Remove the "selected" attribute from each option
                    $(this).prop("selected", false);
                });
                // Select the first option
                $(this).find('option:first').prop("selected", true);
            });
        },

        init_onSubmit: function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                // disable save button
                $("#btn-form-submit").prop('disabled', true);

                // enable save button after 3 seconds
                DELAY_FUNCTION(() => { $("#btn-form-submit").prop('disabled', false); });

                // get values
                const form = new FormData(document.getElementById("modal-container"));
                form.append("remarks", HOME.NEW_RECORD._remarksValue);

                // insert data (invoke fetch)base_url + 
                await fetch(base_url + "student/record/insert", {
                    method: "post",
                    body: form
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === "success") {
                            // reset fields and add success notify
                            document.getElementById("modal-container").reset();
                            MAIN.addNotif("Record Saved!", "New Record has been saved!", "g");
                            $("btnFile").each(function (e, i) {
                                console.log(i);
                            })
                            document.querySelectorAll(".btnFile").forEach(button => {
                                button.classList.add("btn-success");
                                button.classList.remove("btn-warning");
                                button.disabled = true;
                            })

                            $("#stud_lname").focus();
                        }else{
                            MAIN.addNotif("Error occured!", 
                            "<b>Message:</b> " + data.message + 
                            "<br><b>Columns:</b> " + data.columns + 
                            "<br><b>Status:</b>   "+ data.status, 
                            "r");;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        MAIN.addNotif("Error occured!", err, "r");;
                    });
            })
        },

        init_onFileChange: function () {
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
            home_current_open_modal = 'IMPORT_EXCEL';
            MODAL.setTitle("Import Excel");
            MODAL.setBody(`
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <i class="fa-solid fa-newspaper"></i> FEATURE COMMING SOON!
                </div>
            `);
            MODAL.setFooter(``);
            MODAL.setScript(`HOME.IMPORT_EXCEL.onSubmit();`);
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
            home_current_open_modal = 'GENERATE_QR';
            MODAL.setTitle("Genrate QR");
            MODAL.setBody(`
            
            `);
            MODAL.setFooter(``);
            MODAL.setScript(`HOME.GENERATE_QR.onSubmit();`);
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
            home_current_open_modal = 'NEW_USER';
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
                        <p class="card p-2" style="width: 100%; color: grey; background-color: #E5E5E5;">Password is set to 'default'</p>
                    </span>
                </div>
            `);
            MODAL.setFooter(`<button  id="btn-form-submit" class="btn btn-success">Add User</button>`);
            MODAL.setScript(`HOME.NEW_USER.onSubmit();`);
            MODAL.open();
        },

        onSubmit: async function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                // NEW_USER
                const form = new FormData(document.getElementById("modal-container"));
                await fetch(base_url + 'user/new', {
                    method: 'post',
                    body: form
                })
                    .then(response => response.text())
                    .then(result => {
                        if (result) {
                            MAIN.addNotif("Added new User!", "Successfully added new user", "g");
                            MODAL.close();
                        }
                    })
                    .catch(err => {
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

        load_user_viewers : async function() {
            const form = new FormData();
            form.append('uid', CONST_UID);
            await this.load_dashboard_table('user/viewers', form);
        },

        load_user_encoders : async function() {
            const form = new FormData();
            form.append('uid', CONST_UID);
            await this.load_dashboard_table('user/encoders', form);
        },
        load_user_all : async function() {
            const form = new FormData();
            form.append('uid', CONST_UID);
            await this.load_dashboard_table('user/all', form);
        },

        /**
         * Load the dashboard table
         * @param {*} route 
         */
        load_dashboard_table: async function (route = null, form_data = null) {
            if (!route) return;
            await fetch(`${base_url}${route}`,{
                method : form_data ? 'post' : 'get',
                body : form_data ? form_data : null
            })
                .then(response => response.json())
                .then((apiResponse) => {

                    $('#dataTable').removeClass('loading');

                    if ($.fn.DataTable.isDataTable('#dataTable')) {
                        $('#dataTable').DataTable().destroy();
                        $('#dataTable').html("");
                    }

                    const N_TABLE = apiResponse.result;
                    if (N_TABLE) {
                        MAIN.addNotif("Table loaded", N_TABLE.length + " item(s) found", "g");
                        if (N_TABLE.length > 0) {

                            let cols = Object.keys(N_TABLE[0]);
                            
                            let table = `<thead><tr>`;
                            for(let i = 0; i < cols.length; i++)
                                table += `<th style="white-space: nowrap;">${cols[i]}</th>`;
                            table += `</tr></thead><tbody>`;

                            for (let i = 0; i < N_TABLE.length; i++) {
                                table += `<tr>`;
                                for(let j = 0; j < cols.length; j++)
                                    table += `<td>${N_TABLE[i][cols[j]]}</td>`;
                                table += `</tr>`;
                            };
                            table += '</tbody>';
                            $("#table-container").css({ "max-width": "1000px", "max-height": "500px" });
                            $("#dataTable").html(table);
                            $('#dataTable').DataTable();
                        }
                    } else {
                        MAIN.addNotif("Table loaded", "No data found");
                        $("#dataTable").html('');
                        $("#table-container").css({ "max-width": "1000px", "max-height": "500px" });
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
$(window).on('load', HOME.DASHBOARD.load_dashboard_table('student/record/all'));

const LOAD_REMARKS_ON_ID = async (element_id) => {
    await fetch(base_url + 'api/categories')
        .then(response => response.json())
        .then(categories => {
            let categs = `<option value="" disabled selected>--Select Remarks--</option>`;
            for (i in categories) categs += `<option value="${categories[i]}">${categories[i]}</option>`;
            $("#" + element_id).html(categs);
        });
}

const ON_MODAL_CLOSE = () => {
    if (home_current_open_modal === 'SEARCH') {
        () => { /** SET EFFECT HERE */ }
    } else if (home_current_open_modal === 'NEW_RECORD') {
        HOME.DASHBOARD.load_dashboard_table('student/record/all');
    } else if (home_current_open_modal === 'IMPORT_EXCEL') {
        () => { /** SET EFFECT HERE */ }
    } else if (home_current_open_modal === 'GENERATE_QR') {
        () => { /** SET EFFECT HERE */ }
    } else if (home_current_open_modal === 'NEW_USER') {
        () => { /** SET EFFECT HERE */ }
    }
    home_current_open_modal = null;
}