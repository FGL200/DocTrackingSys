const RECORD = {
    /**
     * For Inserting new Record
     */
    NEW: {
        _remarksValue: [],

        open: async function () {
            home_current_open_modal = 'NEW';
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
                    <span class="d-flex align-items-center gap-1">
                        <select id="remarks-category" name="remarks-category" class="p-2 card flex-grow-1">
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
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_j_f137">Junior Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_j_f137" name="doc_val_j_f137" type="checkbox" class="cb-doc">
                            <input id="doc_scan_j_f137" name="doc_scan_j_f137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_j_f137').trigger('click');}" >
                            + <i class="fa-solid fa-image"></i>
                            </button>
                        </span>
                    </span>

                    <span class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_s_f137">Senior Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input id="doc_val_s_f137" name="doc_val_s_f137" type="checkbox" class="cb-doc">
                            <input id="doc_scan_s_f137" name="doc_scan_s_f137" type="file" accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="{$('#doc_scan_s_f137').trigger('click');}" >
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
            MODAL.setScript(`RECORD.NEW.init_onSubmit(); RECORD.NEW.init_onFileChange();  RECORD.NEW.init_addRemarks();`);
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
                RECORD.NEW._loadRemearksVal();
            });
            let count = 0;
            $("#remarks-holder").find('span').each(function (e) {
                if ($(this).html() === span.html()) count++;
            });
            if (count === 0) $("#remarks-holder").append(span);
            RECORD.NEW._loadRemearksVal();
        },

        _loadRemearksVal: function () {
            RECORD.NEW._remarksValue = [];
            $("#remarks-holder").find('span').each(function (e) {
                RECORD.NEW._remarksValue.push($(this).text());
            });
        },

        init_addRemarks: function () {
            $("#remarks-category").on("change", function (e) {
                // Get current value
                RECORD.NEW.addRemarksOnChange($("#remarks-category").val());
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
                form.append("remarks", RECORD.NEW._remarksValue);

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
}