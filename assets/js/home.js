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
                        $('#dataTable').html(table);
                        $('#dataTable').DataTable();

                        // For formality and avoid warnings (the next line is removable)
                        $('#dataTable_wrapper input[type="search"]').prop("name", "dataTable_quickSearch");
                    }
                } else {
                    MAIN.addNotif("Table loaded", "No data found");
                    $("#dataTable").html('');
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
$(window).on('load', ()=>{ HOME.DASHBOARD.load_dashboard_table('student/record/all'); });

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
    } else if (home_current_open_modal === 'NEW') {
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