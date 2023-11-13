const RECORD = {
    /**
     * For Inserting new Record
     */
    NEW: {
        __remarksValue__: [],
        __ROTATION__ : 0,

        open: async function () {
            try {
                home_current_open_modal = 'NEW';
                
                const requestLayout = await fetch(`${base_url}assets/templates/newRecord.html`)
                const layout = await requestLayout.text();
                
                MODAL.setTitle("New Record");
                MODAL.setBody(layout);
                MODAL.setFooter(`<button id="btn-form-submit" type="submit" class="btn btn-success" id="btn-form-submit">Save</button>`);
                MODAL.setScript(`RECORD.NEW.init_onSubmit(); RECORD.NEW.init_onFileChange();  RECORD.NEW.init_addRemarks();`);
                MODAL.open();
    
                // when modal is opened, load all the categories in remarks
                // await LOAD_REMARKS_ON_ID('remarks-category');
                await this.init_addRemarks();
    
                $("#stud_lname").focus();

            } catch (error) {
                MAIN.addNotif("Server error", "Failed to load new record layout", "r");
            }
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
                form.append("shelf", CONST_SHELF_NAME);

                // insert data (invoke fetch)base_url + 
                form.forEach((val, key)=>{
                    console.log({key , val})
                })
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
                        const keys = Object.keys(data);
                        let html = ""
                        for(const k of keys) {
                            if(html.length > 0) html += "<br>";
                            html += `<b>${k}:</b> ${data[k]}`
                        }
                        MAIN.addNotif("Error occured!", html, "r");
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


            $("#rotate-img").on("click", function(e){
                RECORD.NEW.__ROTATION__ += 90;
                if(RECORD .NEW.__ROTATION__ >= 360) RECORD .NEW.__ROTATION__ = 0;
            
                updateRotateOfImg();
            });
            
            


            $(".viewScan").on("click", function(){
                if(!$(this).hasClass('imgLoaded')){
                    $("img.image-viewer").remove();

                    // Get the id, name, and, source of clicked buttons
                    const id = $(this).attr('id');
                    const name = id.replace('view_scan_', '');
                    // const source = document.getElementById("doc_scan_" + name).files[0];

                    let count = 0;
                    for(let src of document.getElementById("doc_scan_" + name).files) {
                        // console.log(src);
                        // continue;
                        
                        const reader = new FileReader();
                        
                        reader.addEventListener('load', ()=>{
                            // console.log(reader.result);
                            $("#rotate-img").before(`<img class='image-viewer${count===0?"":" hide"}'  height = '500' width = '500' src='${reader.result}'>`);
                            // $(".image-viewer").prop("src", reader.result);
                            count++;
                        });

                        
                        
                        if(src) {
                            reader.readAsDataURL(src);
                        }
                    } 
                    
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
        dts_alert({
            title : "Removing scanned document",
            body : "Are you sure you want to <b>remove</b> the scanned document?",
            buttons : ["yes", "no"]
        }, function(ans){
            if(!ans) return;
            
            $(inFile).val('')
            $(btnFile).removeClass('btn-danger');
            $(btnFile).addClass('btn-success')
            $(btnFile).find('span').text('+')
            set_BtnView(btnView, true);
        });
        // if(confirm('Are you sure you want to replace/remove the scaned document?')){
        //     $(inFile).val('')
        //     $(btnFile).removeClass('btn-danger');
        //     $(btnFile).addClass('btn-success')
        //     $(btnFile).find('span').text('+')
        //     set_BtnView(btnView, true);
        // }
    }else{
        $(inFile).trigger('click');
    }
}

function updateRotateOfImg() {
    $(".image-viewer").css({"transform" : `rotate(${RECORD.NEW.__ROTATION__}deg)`});
}