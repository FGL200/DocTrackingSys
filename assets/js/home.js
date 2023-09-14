MAIN.addNotif("Welcome!", "ADMIN USER");

const HOME = {

    /**
     * For Searching 
     */
    SEARCH: {

        /**
         * Add search filter on submit
         */
        onSubmit: function () {
            MODAL.onSubmit(function (e) {
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
                        <option data-id="3" value="3_Touch">Touch</option>
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
        addFilter: function (e) {

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
                } else if (rawFilterName == "Touch") {
                    body.innerHTML = `
                        <input id="filter-touch-id" type="text" class="form-control" placeholder="Touch ID">
                        <select id="filter-touch-category" class="form-control">
                            <option value="" default selected>--Select Touch Category--</option>
                            <option value="inc_doc">Incomplete Document</option>
                            <option value="wrong_doc">Incorrect Document</option>
                            <option value="not_orig_doc">Not original Document</option>
                            <option value="not_orig_doc">Missplaced Document</option>
                            <option value="not_orig_doc">Missing Document</option>
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
        }
    },

    /**
     * For Inserting new Record
     */
    NEW_RECORD: {
        open: function () {
            MODAL.setTitle("New Record");
            MODAL.setBody(`
            <div class="d-flex flex-row flex-wrap gap-2">
                <section class="d-flex flex-column flex-grow-1 gap-1 card p-2 m-2 flex-end align-self-start">
                    <span>
                        <b>Information</b>
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_id" name="stud_id" type="text" class="p-2 card" placeholder="Student ID">
                    </span>
                    <span class="d-flex justify-content-between align-items-center gap-1">
                        <input id="stud_fname" name="stud_fname" type="text" class="p-2 card" placeholder="First Name">
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
                </section>
                <section class="d-flex flex-column flex-grow-1 gap-1 card p-2 m-2">
                    <span>
                        <b>Documents</b>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_regi">Registration Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_regi" name="doc_val_regi" type="checkbox" class="cb-doc">
                            <input id="doc_scan_regi" name="doc_scan_regi" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_regi').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_gm">Good Moral</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_gm" name="doc_val_gm" type="checkbox" class="cb-doc">
                            <input id="doc_scan_gm" name="doc_scan_gm" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_gm').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_form137">Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_form137" name="doc_val_form137" type="checkbox" class="cb-doc">
                            <input id="doc_scan_form137" name="doc_scan_form137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_form137').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_form138">Form 138</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_form138" name="doc_val_form138" type="checkbox" class="cb-doc">
                            <input id="doc_scan_form138" name="doc_scan_form138" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_form138').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_bcert">Birth Certificate</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_bcert" name="doc_val_bcert" type="checkbox" class="cb-doc">
                            <input id="doc_scan_bcert" name="doc_scan_bcert" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_bcert').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_tor_hd">TOR/HD</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_tor_hd" name="doc_val_tor_hd" type="checkbox" class="cb-doc">
                            <input id="doc_scan_tor_hd" name="doc_scan_tor_hd" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_tor_hd').trigger('click');}" >
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
                        <label for="doc_val_complete">Completion</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_complete" name="doc_val_complete" type="checkbox" class="cb-doc">
                            <input id="doc_scan_complete" name="doc_scan_complete" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_complete').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_c_trans">Certificate of Transferee</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_c_trans" name="doc_val_c_trans" type="checkbox" class="cb-doc">
                            <input id="doc_scan_c_trans" name="doc_scan_c_trans" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_c_trans').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_cred">Transfer/Request Credentials</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_cred" name="doc_val_cred" type="checkbox" class="cb-doc">
                            <input id="doc_scan_cred" name="doc_scan_cred" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_cred').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>
                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label for="doc_val_clearance_f">Request for Clearance Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_clearance_f" name="doc_val_clearance_f" type="checkbox" class="cb-doc">
                            <input id="doc_scan_clearance_f" name="doc_scan_clearance_f" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_clearance_f').trigger('click');}" >
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
            $("#stud_id").focus();
        },

        onSubmit: function () {
            MODAL.onSubmit(function (e) {
                e.preventDefault();

                // get values
                const form = new FormData(document.getElementById("modal-container"));

                // fot debugging
                form.forEach((val, key) => {
                    console.log({ key, val })
                })

                // insert data (invoke fetch)



                // reset fields and add success notify
                document.getElementById("modal-container").reset();
                MAIN.addNotif("Record Saved!", "New Record has been saved!", "g");;
                document.querySelectorAll(".btnFile").forEach(button=>{
                    button.classList.add("btn-success");
                    button.classList.remove("btn-warning");
                    button.disabled = true;
                })
                $("#stud_id").focus();
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
                checkBox.addEventListener("change", function(){
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
            MODAL.setScript(`<script>HOME.IMPORT_EXCEL.onSubmit</script>`);
            MODAL.open();
        },

        onSubmit: function () {
            MODAL.onSubmit(function (e) {
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
            MODAL.setScript(`<script>HOME.GENERATE_QR.onSubmit</script>`);
            MODAL.open();
        },

        onSubmit: function () {
            MODAL.onSubmit(function (e) {
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
            
            `);
            MODAL.setFooter(``);
            MODAL.setScript(`<script>HOME.NEW_USER.onSubmit</script>`);
            MODAL.open();
        },

        onSubmit: function () {
            MODAL.onSubmit(function (e) {
                e.preventDefault();

                // NEW_USER


                MODAL.close();
            })
        }
    },

}