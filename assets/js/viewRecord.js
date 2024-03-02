const VIEW_RECORD = {
    __ROTATION__ : 0,

    /**
     * Update / Delete data
     */
    onSubmit: function (e) {
        const recordAction = e.id;

        let alert_content = (recordAction === "update-record-btn") ? 
        {
            title :  "Save changes",
            body : `Are you sure you want to <b>overwrite  #${CONST_RECORD_ID}</b> record?`,
            buttons : ["yes", "no"]
        } : (recordAction === "delete-record-btn") ?
        {
            title :  "Archive record",
            body : `Are you sure you want to <b>archive  #${CONST_RECORD_ID}</b> record?`,
            buttons : ["yes", "no"]
        } :
        {
            title :  "Move record",
            body : `Are you sure you want to <b>move  #${CONST_RECORD_ID}</b> to another shelf?`,
            buttons : ["yes", "no"]
        };
        
        dts_alert(alert_content, function(ans){
            if(!ans) return;

            let action = "";
    
            const form = new FormData(document.getElementById("update-record-form"));
            
            if(recordAction === "update-record-btn") {
                action = "update";

                form.append("remarks", VIEW_RECORD.__remarksValue__);
    
                $("#update-record-btn").html('<i class="fa-solid fa-floppy-disk"></i> Saving...');
                $("#update-record-btn").prop("disabled", true);

                VIEW_RECORD.__old_DIRS__.forEach((data,index)=>{
                    const key = Object.keys(data)[0];

                    const old_dir = VIEW_RECORD.__old_DIRS__[index];
                    const new_dir = VIEW_RECORD.__new_DIRS__[index];
                    
                    const cb_name = key.replace("scan", "val").replace("[]","");
                    
                    if(old_dir["val"] != new_dir["val"]) {
                        form.set(cb_name, new_dir["val"]);
                    }
                    
                    if(old_dir["val"] == new_dir["val"]) {
                        form.delete(cb_name);
                    }

                    if(old_dir[key] == new_dir[key]) {
                        form.delete(key);
                    }

                    if(old_dir[key] != new_dir[key]){ 
                        form.set(cb_name, new_dir["val"]);
                    } 
                    
                })
                

            } else if (recordAction === "delete-record-btn") {
                action = "delete";
    
                $("#delete-record-btn").html('<i class="fa-solid fa-floppy-disk"></i> Deleting...');
                $("#delete-record-btn").prop("disabled", true);
            }else {

                // move shelf
                form.append("shelf", $("select#shelf").val());
                form.forEach((val, key)=>{
                    console.log({key, val})
                })
                action = "move";
                // return;

            }
            
            fetch(base_url + 'student/record/' + action, {
                method : 'post',
                body :  form
            })
            .then(respose=>respose.json())
            .then((result)=>{
                if(result.status === "success") {
                    DELAY_FUNCTION(()=>{
                        if(action === "update") {
                            MAIN.addNotif("Success", `Record ${CONST_RECORD_ID} updated!`, "g");
                            $("#update-record-btn").html('<i class="fa-solid fa-floppy-disk"></i> Save');
                            $("#update-record-btn").prop("disabled", false);
                        } else if(action === "delete") {
                            MAIN.addNotif("Success", `Record ${CONST_RECORD_ID} deleted!`, "g");
                            $("#delete-record-btn").html('<i class="fa-solid fa-floppy-disk"></i> Delete');
                            $("#delete-record-btn").prop("disabled", false);
                        } else {
                            MAIN.addNotif("Success", result.message, "g");
                        }

                        fetch(base_url + "student/record/" + $("input[name='stud_rec_id']").val())
                        .then(resp=>resp.json())
                        .then(data=>{
                            const result = data.result;
                            console.log(VIEW_RECORD.__old_DIRS__);
                            VIEW_RECORD.__old_DIRS__ = [];
                            VIEW_RECORD.__new_DIRS__ = [];

                            for(let key of Object.keys(result)) {
                                if(!key.includes("stud") && key !== "value") {
                                    const dir = JSON.parse(result[key])["dir"];
                                    const val = JSON.parse(result[key])["val"]
                                    VIEW_RECORD.__old_DIRS__.push(JSON.parse(`{"doc_scan_${key}[]" : "${dir}" , "val" : ${parseInt(val)}}`));
                                    VIEW_RECORD.__new_DIRS__.push(JSON.parse(`{"doc_scan_${key}[]" : "${dir}" , "val" : ${parseInt(val)}}`));
                                }
                            }

                            console.log(VIEW_RECORD.__old_DIRS__);
                        })
                    }, 1);
                } else {
                    const keys = Object.keys(result);
                    let html = "";
                    for(const k of keys) {
                        if(html.length > 0) html += "<br>";
                        html += `<b>${k}:</b> ${result[k]}`
                    }
                    MAIN.addNotif("Error occured!", html, "r");
                    $("#update-record-btn").html('<i class="fa-solid fa-floppy-disk"></i> Save');
                    $("#update-record-btn").prop("disabled", false);
                }
                
            })
            .catch(err=>{
                console.log(err);
                MAIN.addNotif('Server error', "Something went wrong while updating record", "r");
            });

        });
    },
    /**
     * Add remarks to remark holder
     * @param {String} value The value to be added in remarks holder 
     */
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
        if(CONST_ROLE === 'E'){
            span.on("click", function (e) {
                e.preventDefault();
                $(this).remove();
                if ($("#remarks-holder").html().replaceAll(' ', '').replaceAll(/(\r\n|\n|\r)/gm, "") === "")
                    $("#remarks-holder").html("No Remarks");
                VIEW_RECORD.__loadRemarksVal__();
            });
        }
        // -- END --

        // Check if current remark already exist in the Remarks holder
        let count = 0;
        $("#remarks-holder").find('span').each(function (e) {
            if ($(this).html() === span.html()) count++;
        });

        // Add the remark if not yet existing
        if (count === 0) $("#remarks-holder").append(span);

        // reload the remarksvalue saved in the variable
        VIEW_RECORD.__loadRemarksVal__();
    },

    /**
     * Load the Student record and place it to the approrpiate fields
     * @param {Object} data the object data of the strudent records
     */
    loadStudentRecords : function (data) {

        VIEW_RECORD.student_info.fname = data.stud_fname;
        VIEW_RECORD.student_info.mname = data.stud_mname;
        VIEW_RECORD.student_info.lname = data.stud_lname;

        // Get all the keys in the json data
        let keys = Object.keys(data);

        // Preparation for the value of 'Remarks'
        let value = [];

        // Iterate each keys to place their values in the appropriate fields
        for(i in keys){

            // If the key is 'value', the value of this object must be a remarks section
            if(keys[i] === 'value'){
                if(data[keys[i]] == "") continue;

                if(data[keys[i]].includes('[')) value = JSON.parse(data[keys[i]]);
                else value.push(data[keys[i]]);

                continue;
            }

            // If the key has a 'stud_' in the name of the key, the value of the object must be 
            // on the student information section
            if(keys[i].includes('stud_')){
                $("#" + keys[i]).val(data[keys[i]]);
                continue;
            }

            if(keys[i] == 'shelf') {
              VIEW_RECORD.shelf.id = data[keys[i]];
              continue;
            }
            
            if(keys[i] == 'shelf_histories') {
              VIEW_RECORD.shelf.history = JSON.parse(data[keys[i]]);
              continue;
            }

            if(keys[i] == 'merged_shelves') {
              VIEW_RECORD.shelf.merged = JSON.parse(data[keys[i]]);
              continue;
            }

            // If the above validation is does not satisfy the current key,
            // the current key being checked must be in the document section
            
            // The document value is an object conatiaining keys 'val' and 'dir'
            // where 'val', a boolean, indicates whether if the student has a document or none,
            // and 'dir' is the directory of the scaned document if there's a value.

            // Save the object to doc vairable for holder
            let doc = JSON.parse(data[keys[i]]); 

            // The current value is set to string.
            // This line will parese the key to int
            doc.val = parseInt(doc.val);

            // The key is also the id of the input checkbox field,
            // the current value returned is a string, this line will convert it to int to know 
            // if it is true(1) or not(0)
            $("#doc_val_" + keys[i]).prop("checked", parseInt(doc.val));

            // If the current document has a directory value,
            // save the source and add an event listener 'click' to
            // view the scanned document
            if(doc.dir !== '') {
                $('#view_scan_' + keys[i]).on("click", function(){
                    $(this).addClass('imgLoaded');
                    const sources = doc.dir.split(",");
                    $("#image-viewer-container").find("img").remove()
                    let count = 0;
                    for(let src of sources ) {
                        $("#rotate-img").before(`<img class='image-viewer${count===0?"":" hide"}' src='${base_url + src}'>`);
                        count++;
                    } /** Created By Patrick */

                    // $("#image-viewer").prop("src", base_url + source[0]);
                    $("#image-viewer-container").removeClass('hide');
                    $("#image-viewer-container").addClass('fade-in');
                    $("#image-viewer-holder").addClass('pop-in');
                });
            }
            
            // If the document 'val' is true, (the student has that specific document),
            // (If the user is Encoder or Admin, The button for adding 'dir' will be default to 'green')
            if(doc.val === 1) {
                const inFile = "#doc_scan_" + keys[i];
                
                // Enable the 'input file' and 'btnFile' input if 'val' is not empty
                $(inFile).prop('disabled', false);
                $(inFile + " ~ button.btnFile").prop('disabled', false);

                // If there are no dir fetched, disable buttons
                if(doc.dir !== ''){
                    set_BtnFile(inFile + " ~ button.btnFile", false);
                    set_BtnView(inFile+ " ~ button.viewScan", false);
                    set_BtnFile(inFile + " ~ button.btnFile", false);
                    set_BtnView(inFile+ " ~ button.viewScan", false);
                }
            }

            // Fetched directories cannot be saved in input file tag
            // The follwing lines will fetch all the dir with values
            // and save is as an object to' __old_DIRS__' variable
            let index = "doc_scan_" + keys[i];
            let docDir = doc.dir;
            VIEW_RECORD.__old_DIRS__.push(JSON.parse(`{"${index}[]" : "${docDir}" , "val" : ${parseInt(doc.val ?? 0)}}`));
            VIEW_RECORD.__new_DIRS__.push(JSON.parse(`{"${index}[]" : "${docDir}" , "val" : ${parseInt(doc.val ?? 0)}}`));
        }

        value.forEach(remarks=>{
            this.addRemark(remarks);
        });
    },

    /** PRIVATES */

    /** New Directories of Every Scanned Files */
    __new_DIRS__ : [],
    /** The OLD Values OF Direcroties of every scanced file */
    __old_DIRS__ : [],

    /** The value of the other remarks*/
    __remarksOther__ : "",

    /** The default/fixed values of remarks categories */
    __remarksCategories__ : [],

    /** The current remarks added in the remarks holder */
    __remarksValue__ : [],

    /** When invoking ____addRemark()____, place the apropriate remarks in the holder aswell as on the __remarksValue__ variable */
    __loadRemarksVal__ : function () {
        VIEW_RECORD.__remarksValue__ = [];
        $("#remarks-holder").find('span').each(function (e) {
            VIEW_RECORD.__remarksValue__.push($(this).text());
        });
    },

    student_info: {
      fname: '',
      mname: '',
      lname: '',
    },

    shelf: {
      id: -1,
      history: [],
      merged: [],
    },
}


// This line will add an event listener 'change' to every input file element present within the form
// NOTE that every input file tag are hidden (not visible) by default
// The btnFile will act as their button to trigger their clicks so user will be able to upload images
$(".scaned-doc").each(function(e){
    $(this).on("change", function(e){
        const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
        const btnView = `#${$(this).attr('id')} ~ button.viewScan`;
        if($(this).val()) { set_BtnView(btnView, false); }
        set_BtnFile(btnFile);
    });
});

// The following lines will listen to every checkbox present within the form
// When checked, enable the btnFile
// When unchecked, prompt the user and confirm to remove the directory of the saved image before
$(".cb-doc").on("change", function(e){
    // Gets the corresponding button to the checkbox ticked
    const inFile = `#${$(this).attr('id')} ~ input[type='file']`;
    const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
    const btnView = `#${$(this).attr('id')} ~ button.viewScan`;
    const checked = $(this).prop('checked');

    const currElem = $(this);

    const key = currElem.attr("id").replace("val", "scan") + "[]";

    // Prompts user and perform the correct action when checkbox is ticked
    $(btnFile).prop('disabled', !checked);
    if(!checked){ 
        if($(btnFile).hasClass('btn-danger')){
            dts_alert({
                title : "Removing scanned document",
                body : "This document contained scanned image.<br>Are you sure you want to <b>remove</b> the scanned image of this document?",
                buttons : ["yes", "no"]
            },function(ans){
                if(ans){
                    $(inFile).val('');
                    $(inFile).prop('disabled', true);
                    set_BtnView(btnView, true);
                    set_BtnFile(btnFile, true);
                    $(btnFile).prop('disabled', true);                    

                    VIEW_RECORD.__new_DIRS__.forEach((data, index)=>{
                        const k = Object.keys(data)[0];
                        if(k === key) {
                            VIEW_RECORD.__new_DIRS__[index][key] = "";
                            VIEW_RECORD.__new_DIRS__[index]["val"] = 0;
                        }
                    })
                } else {
                    currElem.prop('checked', true);
                    $(btnFile).prop('disabled', !currElem.prop('checked'));
                }
            });
            // if(confirm("Are you sure you want to replace/remove the scaned document?")){
            //     $(inFile).val('');
            //     $(inFile).prop('disabled', true);
            //     set_BtnView(btnView, true);
            //     set_BtnFile(btnFile, true);
            //     $(btnFile).prop('disabled', true);
            // }else{
            //     $(this).prop('checked', true);
            //     $(btnFile).prop('disabled', !$(this).prop('checked'));
            // }
        } else {
            VIEW_RECORD.__new_DIRS__.forEach((data, index)=>{
                const k = Object.keys(data)[0];
                if(k === key) {
                    VIEW_RECORD.__new_DIRS__[index]["val"] = 0;
                }
            })
        }
        
    } else {
        VIEW_RECORD.__new_DIRS__.forEach((data, index)=>{
            const k = Object.keys(data)[0];
            if(k === key) {
                VIEW_RECORD.__new_DIRS__[index]["val"] = 1;
            }
        })
    }
    $(inFile).prop('disabled', !$(this).prop('checked'));

    

    console.log(VIEW_RECORD.__new_DIRS__);
    console.log(VIEW_RECORD.__old_DIRS__);

    // // Prompts user and perform the correct action when checkbox is ticked
    // $(btnFile).prop('disabled', !checked);
    // if(!checked){ 
    //     if($(btnFile).hasClass('btn-danger')){
    //         if(confirm("Are you sure you want to replace/remove the scaned document?")){
    //             $(inFile).val('');
    //             $(inFile).prop('disabled', true);
    //             set_BtnView(btnView, true);
    //             set_BtnFile(btnFile, true);
    //             $(btnFile).prop('disabled', true);
    //         }else{
    //             $(this).prop('checked', true);
    //             $(btnFile).prop('disabled', !$(this).prop('checked'));
    //         }
    //     }
    // }
    // $(inFile).prop('disabled', !$(this).prop('checked'));
});

// The btnView are the buttons for viewing images
// Enable or disable btnViews through this function
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

// The btnFile are the button responsible for triggering the file upload input
// Enable or disble btnFile through this function
function set_BtnFile(btnFile, success) {
    if(success){
        $(btnFile).removeClass("btn-danger");
        $(btnFile).addClass("btn-success");
        $(btnFile).find('span').text('+');

    }else{
        $(btnFile).removeClass("btn-success");
        $(btnFile).addClass("btn-danger");
        $(btnFile).find('span').text('-');
        $(btnFile).find('span').text('-');
        $(btnFile + ' ~ button.viewScan').prop('disabled', false);
    }
}

// This function must only run when the user have uploaded new file (image file)
// or When the user want to replaced the current uploaded image
function changeFileDir (inFile){
    const btnFile = `${inFile} ~ button.btnFile`;
    const btnView = `${inFile} ~ button.viewScan`;
    const key = $(inFile).attr("id");


    // Check if there is already an image uploaded, and confirm if the user wants
    // to replace or remove the saved file
    if($(btnFile).hasClass('btn-danger')) {
        dts_alert({
            title : "Removing scanned document",
            body : "Are you sure you want to <b>remove</b> the scanned document?",
            buttons : ["yes", "no"]
        }, function(ans){
            if(!ans) return;

            $(inFile).val('');
            $(btnFile).removeClass('btn-danger');
            $(btnFile).addClass('btn-success');
            $(btnFile).find('span').text('+');
            set_BtnView(btnView, true);
            
            // make the dir value as empty if the answer in  confirm is `yes`
            VIEW_RECORD.__new_DIRS__.forEach((value, index)=>{
                
                if(VIEW_RECORD.__new_DIRS__[index][key + "[]"]) {
                    VIEW_RECORD.__new_DIRS__[index][key + "[]"] = "";
                    
                    let temp_id = key.replace("doc_scan_", "view_scan_"); 
                    $(`#${temp_id}`).off("click");
                    $(`#${temp_id}`).on("click", viewScannedDoc);
                }
                
            });

        });
        // if(confirm('Are you sure you want to replace/remove the scaned document?')){

        //     $(inFile).val('');
        //     $(btnFile).removeClass('btn-danger');
        //     $(btnFile).addClass('btn-success');
        //     $(btnFile).find('span').text('+');
        //     set_BtnView(btnView, true);
            
        //     // make the dir value as empty if the answer in  confirm is `yes`
        //     VIEW_RECORD.__old_DIRS__.forEach((value, index)=>{
                
        //         if(VIEW_RECORD.__old_DIRS__[index][key + "[]"]) {
        //             VIEW_RECORD.__old_DIRS__[index][key + "[]"] = "";
                    
        //             let temp_id = key.replace("doc_scan_", "view_scan_"); 
        //             $(`#${temp_id}`).off("click");
        //             $(`#${temp_id}`).on("click", viewScannedDoc);
        //         }
                
        //     })

        //     console.log(VIEW_RECORD.__old_DIRS__)
        // }
    }else{
        $(inFile).trigger('click');
        
        $(inFile).on("change", function(){

            VIEW_RECORD.__new_DIRS__.forEach((data, index)=>{
                const inFile_name = this.name;
                const key = Object.keys(data)[0];

                if(key === inFile_name) {
                    VIEW_RECORD.__new_DIRS__[index][inFile_name] = this.files;
                    let temp_id = key.replace("doc_scan_", "view_scan_").replace("[]", ""); 
                    $(`#${temp_id}`).off("click");
                    $(`#${temp_id}`).on("click", viewScannedDoc);
                }
            });

        });
    }
}

// This function is for closing the view modal (insides are the animation logic)
$("#close-image-viewer-container").on("click", function(){
    $("#image-viewer-container").addClass('fade-out');
    $("#image-viewer-holder").addClass('pop-out');
    $("image-viewer").html('');
    VIEW_RECORD.__ROTATION__ = 0;
    updateRotateOfImg();
});

// This function is for opening and closing of view modal (insides are the animation logic)
$("#image-viewer-container").on("animationend", function(){
    if($(this).hasClass('fade-in')){
        $(this).removeClass('fade-in');
        $(this).removeClass('hide');
    }else if ($(this).hasClass('fade-out')){
        $(this).removeClass('fade-out');
        $(this).addClass('hide');
    }
});

// This function is for opening and closing of view modal (insides are the animation logic)
$("#image-viewer-holder").on("animationend", function(){
    if($(this).hasClass('pop-in')) $(this).removeClass('pop-in');
    else $(this).removeClass('pop-out');
}); 


// (DEFINITION) The following lines are triggered when the user wants to view the uploaded image
function viewScannedDoc(){
    $("img.image-viewer").remove();

    // Check id there is an image already uploaded (from `__old_DIRS__`)
    if(!$(this).hasClass('imgLoaded')){

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

        // This line is for reading the uploaded file ()
        // const reader = new FileReader();
        
        // If the file is successfully loaded,
        // set the source of the image to the file
        // reader.addEventListener('load', ()=>{
        //     $("#image-viewer").prop("src", reader.result);
            
        // });

        
        // Check wehter the source has value or none,
        // If there is a value, read the file as how the browser would read it by default
        // if(source) {
        //     reader.readAsDataURL(source);
        //     $("#image-viewer-container").removeClass('hide');
        //     $("#image-viewer-container").addClass('fade-in');
        //     $("#image-viewer-holder").addClass('pop-in');
        // }

        // let count = 0;
        // for(let src of sources ) {
        //     $("#rotate-img").before(`<img class='image-viewer${count===0?"":" hide"}' src='${base_url + src}'>`);
        //     count++;
        // } /** Created By Patrick */

    }
}

// (INVOKATION) The following lines are triggered when the user wants to view the uploaded image
$(".viewScan").on("click", viewScannedDoc);


$("#_remarksValue_other").on("keydown", function(e){
    const val = $(this).val();
    if(e.key === '"' || e.key === "'")  {
        e.preventDefault();
        $(this).val(val + `\\'` );
        // MAIN.addNotif("Error", "That character is not allowed", "r");
    }
    if(e.key === "Enter") {
        e.preventDefault();
        if(val !== '') {
            VIEW_RECORD.addRemark(val.toUpperCase());
            $(this).val('')
        }
    }
});

$("#rotate-img").on("click", function(e){
    VIEW_RECORD.__ROTATION__ += 90;
    if(VIEW_RECORD.__ROTATION__ >= 360) VIEW_RECORD.__ROTATION__ = 0;

    updateRotateOfImg();
});

function updateRotateOfImg() {
    $(".image-viewer").css({"transform" : `rotate(${VIEW_RECORD.__ROTATION__}deg)`});
}

async function loadRemarksCategories() {
    await fetch(base_url + 'api/categories')
    .then(response => response.json())
    .then(categories => {
        VIEW_RECORD.__remarksCategories__ = categories;
        let categs = '';
        for (i in categories)
            categs += 
            `<li>  
                <span href="#remarks-category" class="dropdown-item" onclick="VIEW_RECORD.addRemark('${categories[i]}')" style="white-space: nowrap; cursor: pointer;"> ${categories[i]} </span>
            </li>`;
        $("#remarks-category").html(categs);
    });
}

async function prepareStudentRecords() {
    await fetch(base_url + 'student/record/' + CONST_RECORD_ID)
    .then(response => response.json())
    .then(response => {
        VIEW_RECORD.loadStudentRecords(response.result);
    });
}

// When the window has loaded,
// Load the remarks categories and prepare the values of student records
$(window).on("load", async function (e) {
    await loadRemarksCategories();
    await prepareStudentRecords();
});

$("#btn-go-back").on("click", function(e){

    const param = getURLParams();
    
    if(!param.from) window.close();

    MAIN.goto(`shelf/${param.from}`);
})

$("#move-btn").on("click", async function(){
    // const shelves = await fetch_data(`${base_url}api/shelves`);
    let options = ``;
    const shelves = await Helper.api('api/shelves', "json");
    shelves.forEach(v => options += `<option value="${v.id}" >${v.name}</option>`);
    console.log({shelves});

    MODAL.setSize('lg')
    MODAL.setTitle("Move shelf");
    MODAL.setBody(Helper.replaceLayout(await Helper.template('viewRecord/move') , { options: options }));
    MODAL.setFooter(`
        <button type="button" id="move-record-btn" class="btn btn-primary" onclick="VIEW_RECORD.onSubmit(this)">Move</button> 
        <button type="button" onclick="MODAL.close()" class="btn btn-danger">Cancel</button>
        `);
    MODAL.open();
});





Helper.onClick("#merge-btn", async function() {
  MODAL.setSize('md');
  MODAL.setTitle('Merge Record');
  MODAL.setBody(Helper.replaceLayout((await Helper.template('viewRecord/merge')), {
    options: getMergeList()
  })) 
  MODAL.setFooter(`<button class="btn btn-primary">Merge</button>`)
  MODAL.open();
  MODAL.onSubmit(async (e, form_data) =>{

  });
});

async function getMergeList() {
  const body = { 
    stud_fname: VIEW_RECORD.student_info.fname,
    stud_mname: VIEW_RECORD.student_info.mname, 
    stud_lname: VIEW_RECORD.student_info.lname,
    current_shelf: VIEW_RECORD.shelf.id,
  };
  const list = (await Helper.api('student/record/shelf', "json", Helper.createFormData(body)));
  const rec_id = Number(CONST_RECORD_ID);
  console.log({rec_id})
  return ''
}