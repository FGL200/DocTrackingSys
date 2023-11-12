let home_current_open_modal = null;

const HOME = {

    /**
     * For Searching 
     */
    SEARCH: {

        scan : async function () {

            MODAL.disableCloseButton();
            
            MODAL.setTitle(`Scan QR <i class="fa-solid fa-qrcode"></i>`);
            MODAL.setBody(`<div class="d-flex flex-column gap-2">
            <video id="qr-camera" style="max-height: 300px"></video>
                <button type="button" onclick="DTS_QR.swapCamera()" class="btn btn-primary align-self-center"><i class="fa-solid fa-rotate"></i></button>
            </div>`);
            MODAL.open();
            
            await DTS_QR.initialize();

            DELAY_FUNCTION(()=>{
                MODAL.disableCloseButton(false);
            }, 2);
            
            MODAL.onClose(()=>{ DTS_QR.stopScanner(); });

        },

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
                    console.log(err);
                    MAIN.addNotif('Server error', "Something went wrong while running quick search", 'r');
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
                    const form = new FormData();
                    form.append("shelf", CONST_SHELF_NAME);
                    const inputs_values = $("#search-filter-holder > span > span:last-of-type");

                    for(let i = 0; i < inputs_values.length ; i++) {
                        
                        for(let j = 0; j < inputs_values[i].children.length; j++) {
                            
                            const id = inputs_values[i].children[j].id;
                            const val = inputs_values[i].children[j].value;
                            if(val.trim().length > 0) form.append(id, val);
                            
                        }
                    }
                    HOME.DASHBOARD.load_dashboard_table('student/filter', form)
                    // fetch("student/filter",{
                    //     method : "POST",
                    //     body : form
                    // })
                    // .then(resp => resp.json())
                    // .then(data=>{
                    //     // close modal
                    //     MAIN.addNotif("Search in Progress!", "Filtering Tables...", "g");
                    //     MODAL.close();
                    //     console.log(data)
                    // })
                    // .catch(err=>{
                    //     MAIN.addNotif("Server error", "Something went wrong while adding new user", "r");
                    //     console.log(err);
                    // })
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
                        <option data-id="2" value="2_Encoder">Encoder</option>
                        <option data-id="3" value="3_Remarks">Remarks</option>
                    </select>
                </div>
                <div id="search-filter-holder" class="d-flex flex-row flex-wrap gap-1 justify-content-center"></div>
            `);
            MODAL.setFooter('<button id="search" class="btn btn-secondary">Search</button>');
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
                } else if (rawFilterName == "Encoder") {
                    body.innerHTML = `
                        <input id="filter-enocoder-id" type="text" class="form-control" placeholder="User ID">
                        <input id="filter-enocoder-uname" type="text" class="form-control" placeholder="User Name">
                        <input id="filter-enocoder-fname" type="text" class="form-control" placeholder="First Name">
                        <input id="filter-enocoder-lname" type="text" class="form-control" placeholder="Last Name">
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
                <div class="d-flex flex-column gap-2">
                    <div onclick="$('#file-upload').trigger('click')" id="file-drop" class="d-flex justify-content-center align-items-center" style="height: 300px; background: rgba(0,0,0,0.1); user-select: none;">
                        Drop Spreadsheet file here
                    </div>
                    <input type="file" id="file-upload" class="hide" name="excel-file" accept=".xls, .xlsx, .csv" />
                    <button class="btn btn-primary">Upload</button>
                </div>
            `);
            MODAL.setFooter(``);
            MODAL.setScript(`HOME.IMPORT_EXCEL.onSubmit();`);
            MODAL.open();
        },

        onSubmit: function () {
            MODAL.onSubmit(function (e) {
                e.preventDefault();

                // const form = new FormData(document.getElementById("modal-container"));

                HOME.IMPORT_EXCEL.readFileData(document.getElementById("file-upload").files[0]);

                // form.forEach((val, key)=>{
                //     console.log(val);
                // })

                
            })
        },
        readFileData(file) {
            const fileReader = new FileReader();

            fileReader.onload = function(e){
                const data = e.target.result;

                const workbook = XLSX.read(data, {
                    type: 'binary'
                  });

                /* get first worksheet */
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                let raw_data = XLSX.utils.sheet_to_json(worksheet, {header:1});
                
                let queries = [];

                const columns = raw_data[0];
                
                raw_data.forEach((row, index_)=>{
                    if(index_ !== 0) { // avoid accessing the header
                        if(row.length > 0) {
                            let stud_rec_query = ["", ""];
                            // stud_rec_query += "(";
                            columns.forEach((data, index)=>{
                                if(data.toLocaleUpperCase() === "Last Name".toLocaleUpperCase() || data.toLocaleUpperCase() === "First Name".toLocaleUpperCase() || data.toLocaleUpperCase() === "Middle Initial".toLocaleUpperCase() ||data.toLocaleUpperCase() === "Suffix".toLocaleUpperCase()) {
                                    let colname = "";
                                    switch(data.toLocaleUpperCase()) {
                                        case "Last Name".toLocaleUpperCase():
                                            colname = 'stud_lname';
                                            break;
                                        case "First Name".toLocaleUpperCase():
                                            colname = 'stud_fname';
                                            break;
                                        case "Middle Initial".toLocaleUpperCase():
                                            colname = "stud_mname";
                                            break;
                                        case "Suffix".toLocaleUpperCase():
                                            colname = "stud_sfx";
                                            break;
                                    }
                                    // console.log(colname);
                                    stud_rec_query[0] += "`" + colname + "` = " + (row[index] ? `'${row[index]}'` : "''") + ",";
                                    
                                } else {
                                    let colname = "";
                                    switch(data.toLocaleUpperCase()) {
                                        case "F137".toLocaleUpperCase():
                                            colname = 'j_f137';
                                            break;
                                        case "BIRTH CERT".toLocaleUpperCase():
                                            colname = 'birth_cert';
                                            break;
                                        case "TOR/HD".toLocaleUpperCase():
                                            colname = "tor";
                                            break;
                                        case "F138".toLocaleUpperCase():
                                            colname = "f138";
                                            break;
                                        case "REQ. CLEARANCE FORM".toLocaleUpperCase():
                                            colname = 'req_clearance_form';
                                            break;
                                        case "APP FOR GRAD".toLocaleUpperCase():
                                            colname = "app_grad";
                                            break;
                                        case "REQ FOR CREDENTIALS".toLocaleUpperCase():
                                            colname = "req_credentials";
                                            break;
                                        case "REGI FORM".toLocaleUpperCase():
                                            colname = 'regi_form';
                                            break;
                                        case "CERT OF TRANSFER".toLocaleUpperCase():
                                            colname = "hd_or_cert_of_trans";
                                            break;
                                        case "COMPLETION FORM".toLocaleUpperCase():
                                            colname = "cert_of_complete";
                                            break;
                                        case "GOOD MORAL".toLocaleUpperCase():
                                            colname = 'good_moral';
                                            break;
                                    }   
                                    if(colname.trim().length > 1) stud_rec_query[1] += "`" + colname + "` = " + (row[index] ? `'{"val" : "${row[index]}", "dir" : ""}'` : '\'{"val" : "0", "dir" : ""}\'') + ",";
                                    
                                }
                                
                                
                            })
                            stud_rec_query[0] = stud_rec_query[0].slice(0, -1);
                            stud_rec_query[1] = stud_rec_query[1].slice(0, -1);
                            // stud_rec_query = stud_rec_query.slice(0, stud_rec_query.length - 1);
                            // stud_rec_query += ")";
                            queries.push(stud_rec_query);
                        }
                    }
                });

                
                let form = new FormData();
                form.append("filename", file.name);
                form.append("shelf", CONST_SHELF_NAME);
                form.append("students", JSON.stringify(queries));

                fetch(base_url + "student/record/insert/excel", {
                    method : "post",
                    body : form
                })
                .then(response=>response.json())
                .then(response=>{

                    MAIN.addNotif(response.status, response.message , response.status == "success" ? 'g' : 'r' );
                })
                .catch(err=>{
                    MAIN.addNotif("Server Error!", "Error in importing the file" , 'r');
                });
            }

            fileReader.readAsBinaryString(file);
        }
    },

    /**
     * For generating qr codes
     */
    GENERATE_QR: {
        open: async function () {
            home_current_open_modal = 'GENERATE_QR';

            await fetch(`${base_url}assets/templates/qr_option_generate.html`)
            .then(response => response.text())
            .then(response => {
                MODAL.setTitle("Genrate QR");
                MODAL.setBody(`${response}`);
                MODAL.setFooter(`<button class='btn btn-primary'>Generate</button>`);
                MODAL.setScript(`HOME.GENERATE_QR.onSubmit();`);
                MODAL.open();
            })
            .catch(err => console.error(err));
        },

        onSubmit: function () {
            MODAL.onSubmit(async function (e) {
                e.preventDefault();

                const datas = new FormData();
                datas.append("type", selected_type);
                
                switch(selected_type) {
                    case "all" : 
                        window.open(new URL(base_url + "generate-qr?get=all"), "_blank");
                        break;
                    case "last-letter" : 
                        datas.append("from", $("#last-letter-from").val());
                        datas.append("to", $("#last-letter-to").val());

                        window.open(new URL(base_url + `generate-qr?from=${$("#last-letter-from").val()}&to=${$("#last-letter-to").val()}`), "_blank");
                        break;
                    case "specific" : 
                        let students = [];
                        $(".generate-specific-student").each(function(e){
                            students.push("id[]=" + $(this).html());
                        });
                        students = students.join("&");
                        console.log(students);

                        datas.append("students", JSON.stringify(qr_generate_selected_students));
                        
                        window.open(new URL(base_url + `generate-qr?${students}`),"_blank");
                        break;
                    default : 
                        break;
                }
                
                //check passed values
                // datas.forEach((val, key)=>{
                //     console.log({key, val});
                // })

                MAIN.addNotif("QR Generating!", "QR codes are being generated!", "g");
            })
        }
    },

    /**
     * Load Records on dashboard
     */
    DASHBOARD: {

        // load_user_viewers : async function() {
        //     const form = new FormData();
        //     form.append('uid', CONST_UID);
        //     await this.load_dashboard_table('user/viewers', form);
        // },

        // load_user_encoders : async function() {
        //     const form = new FormData();
        //     form.append('uid', CONST_UID);
        //     await this.load_dashboard_table('user/encoders', form);
        // },
        // load_user_all : async function() {
        //     const form = new FormData();
        //     form.append('uid', CONST_UID);
        //     await this.load_dashboard_table('user/all', form);
        // },

        /**
         * Load the dashboard table
         * @param {*} route 
         */
        load_dashboard_table: async function (route = null, form_data = null, _order = 'asc') {
            if (!route) return;

            // Add the loading page
            if ($.fn.DataTable.isDataTable('#dataTable')) {
                $('#dataTable').DataTable().destroy();
                $('#dataTable').html("");
            }
            $('#dataTable').addClass('loading');


            await fetch(`${base_url}${route}`,{
                method : form_data ? 'post' : 'get',
                body : form_data ? form_data : null
            })
            .then(response => response.json())
            .then((apiResponse) => {
                
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
                        $('#dataTable').DataTable({
                            order : [[0, _order]]
                        });

                        // For formality and avoid warnings (the next line is removable)
                        $('#dataTable_wrapper input[type="search"]').prop("name", "dataTable_quickSearch");
                    }
                } else {
                    MAIN.addNotif("Table loaded", "No data found");
                    $("#dataTable").html('');
                }

                $('#dataTable').removeClass('loading');

            })
            .catch(err => {
                MAIN.addNotif('Server error', "Something went wrong while loading table", 'r');
                console.error(err);
            })
        }
    }

}

function loadTable() {
    const form = new FormData();
    form.append("uid", CONST_UID);
    if(CONST_SHELF_NAME !== "trash") form.append("shelf", CONST_SHELF_NAME);
    HOME.DASHBOARD.load_dashboard_table(
        CONST_SHELF_NAME === 'trash' ? 'student/record/trash' :
        'student/record/all'
    , form); 



    if(CONST_SHELF_NAME === 'trash') {
        $("#nav-search-stud").remove();
    }
}

// on windows load, fetch all the student records
$(window).on('load', loadTable);

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
        loadTable();
    } else if (home_current_open_modal === 'IMPORT_EXCEL') {
        () => { /** SET EFFECT HERE */ }
    } else if (home_current_open_modal === 'GENERATE_QR') {
        () => { /** SET EFFECT HERE */ }
    } else if (home_current_open_modal === 'NEW_USER') {
        () => { /** SET EFFECT HERE */ }
    }
    home_current_open_modal = null;
}