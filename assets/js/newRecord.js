const RECORD = {
    /**
     * For Inserting new Record
     */
    NEW: {
        __remarksValue__: [],

        open: async function () {
            home_current_open_modal = 'NEW';
            MODAL.setTitle("New Record");
            MODAL.setBody(`
            <div class="d-flex flex-row flex-wrap gap-2">
                <section class="d-flex flex-column flex-wrap flex-grow-1 gap-1 card p-2 m-2 flex-end align-self-start">
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
                    <span class="d-flex align-items-center gap-1">
                        <div class="dropdown flex-grow-1 d-flex">
                            <button class="btn dropdown-toggle flex-grow-1 card d-flex flex-row justify-content-center align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Select Remarks
                            </button>
                            <ul id="remarks-category" class="dropdown-menu"></ul>
                        </div>
                        <button type="button" onclick="$('#_remarksValue_other_holder').removeClass('hide'); $('#_remarksValue_other').focus();" class="btn btn-primary">Other</button>
                    </span>
                    <span id="_remarksValue_other_holder" class="d-flex align-items-center justify-content-between flex-grow-1 gap-2 hide">
                        <div class="d-flex flex-column">
                            <label for="_remarksValue_other" style="font-size: 10pt; text-align: center; color: rgba(0,0,0,0.5);">Press 'Enter' to add to list</label>
                            <input class="card p-2 flex-grow-1" type="text" name="_remarksValue_other" id="_remarksValue_other" placeholder="Add Remarks" />
                        </div>
                        <button type="button" onclick="$('#_remarksValue_other_holder').addClass('hide'); $('#_remarksValue_other').val('');" class="btn btn-danger"><i class="fa-solid fa-xmark"></i></button>
                    </span>
                    <span id="remarks-holder" class="d-flex flex-row flex-wrap gap-1 p-1 card" style="background-color: rgba(0,0,0,0.1); max-width: 380px;">
                        No Remarks
                    </span>
                    
                </section>
                <section class="d-flex flex-column flex-grow-1 gap-1 card p-2 m-2">
                    <span>
                        <b>Documents</b>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_regi_form">Registration Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_regi_form" name="doc_val_regi_form" type="checkbox" class="cb-doc">
                            <input id="doc_scan_regi_form" name="doc_scan_regi_form" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_regi_form')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_regi_form" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_good_moral">Good Moral</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_good_moral" name="doc_val_good_moral" type="checkbox" class="cb-doc">
                            <input id="doc_scan_good_moral" name="doc_scan_good_moral" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_good_moral')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_good_moral" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                            <label class="flex-grow-1 align-items-stretch" for="doc_val_j_f137">Junior Form 137</label>
                            <span class="d-flex flex-nowrap gap-1">
                                <input id="doc_val_j_f137" name="doc_val_j_f137" type="checkbox" class="cb-doc">
                                <input id="doc_scan_j_f137" name="doc_scan_j_f137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                                <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_j_f137')" >
                                <span> + </span> <i class="fa-solid fa-image"></i>
                                </button>
                                <button class="viewScan btn btn-secondary" id="view_scan_j_f137" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                            </span>
                        </span>

                        <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                            <label class="flex-grow-1 align-items-stretch" for="doc_val_s_f137">Senior Form 137</label>
                            <span class="d-flex flex-nowrap gap-1">
                                <input id="doc_val_s_f137" name="doc_val_s_f137" type="checkbox" class="cb-doc">
                                <input id="doc_scan_s_f137" name="doc_scan_s_f137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                                <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_s_f137')" >
                                <span> + </span> <i class="fa-solid fa-image"></i>
                                </button>
                                <button class="viewScan btn btn-secondary" id="view_scan_s_f137" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                            </span>
                        </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_f138">Form 138</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_f138" name="doc_val_f138" type="checkbox" class="cb-doc">
                            <input id="doc_scan_f138" name="doc_scan_f138" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_f138')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_f138" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_birth_cert">Birth Certificate</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_birth_cert" name="doc_val_birth_cert" type="checkbox" class="cb-doc">
                            <input id="doc_scan_birth_cert" name="doc_scan_birth_cert" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_birth_cert')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_birth_cert" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_tor">Transcript of Records</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_tor" name="doc_val_tor" type="checkbox" class="cb-doc">
                            <input id="doc_scan_tor" name="doc_scan_tor" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_tor')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_tor" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_app_grad">App for Graduation</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_app_grad" name="doc_val_app_grad" type="checkbox" class="cb-doc">
                            <input id="doc_scan_app_grad" name="doc_scan_app_grad" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_app_grad')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_app_grad" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_cert_of_complete">Certificate of Completion</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_cert_of_complete" name="doc_val_cert_of_complete" type="checkbox" class="cb-doc">
                            <input id="doc_scan_cert_of_complete" name="doc_scan_cert_of_complete" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_cert_of_complete')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_cert_of_complete" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_req_clearance_form">Request for Clearance</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_req_clearance_form" name="doc_val_req_clearance_form" type="checkbox" class="cb-doc">
                            <input id="doc_scan_req_clearance_form" name="doc_scan_req_clearance_form" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_req_clearance_form')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_req_clearance_form" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_req_credentials">Request for Credentials Form</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_req_credentials" name="doc_val_req_credentials" type="checkbox" class="cb-doc">
                            <input id="doc_scan_req_credentials" name="doc_scan_req_credentials" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_req_credentials')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_req_credentials" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_hd_or_cert_of_trans">Honorable Dismisal / Certificate of Transferee</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_hd_or_cert_of_trans" name="doc_val_hd_or_cert_of_trans" type="checkbox" class="cb-doc">
                            <input id="doc_scan_hd_or_cert_of_trans" name="doc_scan_hd_or_cert_of_trans" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_hd_or_cert_of_trans')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <button class="viewScan btn btn-secondary" id="view_scan_hd_or_cert_of_tran" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>
                    
                </section>
            </div>
            <div id="image-viewer-container" class="hide">
                <div id="image-viewer-holder">
                    <button type="button" class="btn btn-danger" id="close-image-viewer-container"><i class="fa-solid fa-xmark"></i></button>
                    <img id="image-viewer" src="" />
                </div>
            </div>
            `);
            MODAL.setFooter(`<button id="btn-form-submit" type="submit" class="btn btn-success" id="btn-form-submit">Save</button>`);
            MODAL.setScript(`RECORD.NEW.init_onSubmit(); RECORD.NEW.init_onFileChange();  RECORD.NEW.init_addRemarks();`);
            MODAL.open();

            // when modal is opened, load all the categories in remarks
            // await LOAD_REMARKS_ON_ID('remarks-category');
            await this.init_addRemarks();

            $("#stud_lname").focus();
        },

        addRemark: function (value) {
            // Check if there are no remarks in the Remarks holder
            // If there are none, clean the innerHTML of Remarks holder
            if ($("#remarks-holder").html().replaceAll(' ', '').replaceAll(/(\r\n|\n|\r)/gm, "") === "NoRemarks")
                $("#remarks-holder").html("");
    
            // Creating the Remarks to be place on Remarks holder
            // -- START --
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
                RECORD.NEW.__loadRemarksVal__();
            });
            // -- END --
    
            // Check if current remark already exist in the Remarks holder
            let count = 0;
            $("#remarks-holder").find('span').each(function (e) {
                if ($(this).html() === span.html()) count++;
            });
    
            // Add the remark if not yet existing
            if (count === 0) $("#remarks-holder").append(span);
    
            // reload the remarksvalue saved in the variable
            RECORD.NEW.__loadRemarksVal__();
        },

        init_addRemarks: async function () {
            await fetch(base_url + 'api/categories')
            .then(response => response.json())
            .then(categories => {
                RECORD.NEW.__remarksCategories__ = categories;
                let categs = '';
                for (i in categories)
                    categs += 
                    `<li>  
                        <span href="#remarks-category" class="dropdown-item" onclick="RECORD.NEW.addRemark('${categories[i]}')" style="white-space: nowrap; cursor: pointer;"> ${categories[i]} </span>
                    </li>`;
                $("#remarks-category").html(categs);
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
                form.append("remarks", RECORD.NEW.__remarksValue__);

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
                        $(".btnFile").each(function() {
                            $(this).prop('disabled', true);
                            set_BtnFile('.btnFile', true);
                        });
                        $(".viewScan").each(function() {
                            $(this).prop('disabled', true);
                            set_BtnView('.viewScan', true);
                        });
                        $("#remarks-holder").html("No Remarks");
                        $("#_remarksValue_other_holder").addClass('hide');
                        RECORD.NEW.__remarksValue__ = [];

                        MAIN.addNotif("Record Saved!", "New Record has been saved!", "g");
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
                    MAIN.addNotif('Server error', "Something went wrong while adding new record", "r");
                });
            })
        },

        init_onFileChange: function () {

            $("#_remarksValue_other").on("keydown", function(e){
                const val = $(this).val();
                if(e.key === '"')  {
                    e.preventDefault();
                    MAIN.addNotif("Error", "That character is not allowed", "r");
                }
                if(e.key === "Enter") {
                    e.preventDefault();
                    if(val !== '') {
                        RECORD.NEW.addRemark(val.toUpperCase());
                        $(this).val('')
                    }
                }
            });
            
            $(".scaned-doc").each(function(e){
                $(this).on("change", function(e){
                    const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
                    const btnView = `#${$(this).attr('id')} ~ button.viewScan`;
                    if($(this).val()) { set_BtnView(btnView, false);  /* $(btnView).prop('disabled', false); */ }
                    set_BtnFile(btnFile);
                });
            });
            
            $(".cb-doc").each(function(e){
                $(this).on("change", function(e){
                    const inFile = `#${$(this).attr('id')} ~ input[type='file']`;
                    const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
                    const btnView = `#${$(this).attr('id')} ~ button.viewScan`;
                    const checked = $(this).prop('checked');
                    $(btnFile).prop('disabled', !checked);
                    if(!checked){ 
                        $(inFile).val('');
                        $(inFile).prop('disabled', true);
                        set_BtnView(btnView, true);
                        set_BtnFile(btnFile, true);
                    }else{
                        $(inFile).prop('disabled', false);
                    }
                    if($(inFile).val())
                        set_BtnView(btnView, !checked);
                });
            });

            $("#close-image-viewer-container").on("click", function(){
                $("#image-viewer-container").addClass('fade-out');
                $("#image-viewer-holder").addClass('pop-out');
                $("image-viewer").html('');
            });

            $("#image-viewer-container").on("animationend", function(){
                if($(this).hasClass('fade-in')){
                    $(this).removeClass('fade-in');
                    $(this).removeClass('hide');
                }else if ($(this).hasClass('fade-out')){
                    $(this).removeClass('fade-out');
                    $(this).addClass('hide');
                }
            });


            $(".viewScan").on("click", function(){
                if(!$(this).hasClass('imgLoaded')){
                    const id = $(this).attr('id');
                    const name = id.replace('view_scan_', '');
                    const source = document.getElementById("doc_scan_" + name).files[0];


                    const reader = new FileReader();
                    reader.addEventListener('load', ()=>{
                        $("#image-viewer").prop("src", reader.result);
                    })

                    if(source) reader.readAsDataURL(source);

                    console.log(name);
                    
                    $("#image-viewer-container").removeClass('hide');
                    $("#image-viewer-container").addClass('fade-in');
                    $("#image-viewer-holder").addClass('pop-in');
                }
            });

            $("#image-viewer-holder").on("animationend", function(){
                if($(this).hasClass('pop-in')) $(this).removeClass('pop-in');
                else $(this).removeClass('pop-out');
            }); 
        },

        __loadRemarksVal__: function () {
            RECORD.NEW.__remarksValue__ = [];
            $("#remarks-holder").find('span').each(function (e) {
                RECORD.NEW.__remarksValue__.push($(this).text());
            });
        }
        
    }
}

function set_BtnView(btnView, disabled){
    if(disabled){
        $(btnView).removeClass('btn-primary');
        $(btnView).addClass('btn-secondary');
        $(btnView).prop('disabled', true);
    }else {
        $(btnView).removeClass('btn-secondary');
        $(btnView).addClass('btn-primary');
        $(btnView).prop('disabled', false);
    }
}

function set_BtnFile(btnFile, success) {

    if(success){
        $(btnFile).removeClass("btn-danger");
        $(btnFile).addClass("btn-success");
        $(btnFile).find('span').text('+')

    }else{
        $(btnFile).removeClass("btn-success");
        $(btnFile).addClass("btn-danger");
        $(btnFile).find('span').text('-')
        $(btnFile + ' ~ button.viewScan').prop('disabled', false);
    }
}


function changeFileDir (inFile){
    const btnFile = `${inFile} ~ button.btnFile`;
    const btnView = `${inFile} ~ button.viewScan`;

    if($(btnFile).hasClass('btn-danger')) {
        if(confirm('Are you sure you want to replace/remove the scaned document?')){
            $(inFile).val('')
            $(btnFile).removeClass('btn-danger');
            $(btnFile).addClass('btn-success')
            $(btnFile).find('span').text('+')
            set_BtnView(btnView, true);
        }
    }else{
        $(inFile).trigger('click');
    }
}