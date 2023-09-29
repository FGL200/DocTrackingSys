const VIEW_RECORD = {
    /**
     * Update data
     */
    onSubmit: function () {
        const form = new FormData(document.getElementById("update-record-form"));
        form.append("remarks", VIEW_RECORD.__remarksValue__);
        
       

        form.forEach((val, key)=>{
            VIEW_RECORD.__old_DIRS__.forEach((v,k)=>{
                // kapag walang laman yung input file iassign yung value na nasa 
                // VIEW_RECORD.__old_DIRS__
                if(!form.get(key).name && VIEW_RECORD.__old_DIRS__[k][key]) {
                    form.set(key, VIEW_RECORD.__old_DIRS__[k][key]);
                }
            })
        });
        
        fetch(base_url + 'student/record/update', {
            method : 'post',
            body :  form
        })
        .then(respose=>respose.json())
        .then(data=>{
            MAIN.addNotif("Success", `Record ${CONST_RECORD_ID} updated!!`, "g");
        })
        .catch(err=>{
            console.log(err);
        })
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
        if(CONST_ROLE !== 'V'){
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
        console.log(data);
        // Get all the keys in the json data
        let keys = Object.keys(data);

        // Preparation for the value of 'Remarks'
        let value = [];

        // Iterate each keys to place their values in the appropriate fields
        for(i in keys){

            // If the key is 'value', the value of this object must be a remarks section
            if(keys[i] === 'value'){
                if(data[keys[i]] == "") continue;
                value = JSON.parse(data[keys[i]]);
                continue;
            }

            // If the key has a 'stud_' in the name of the key, the value of the object must be 
            // on the student information section
            if(keys[i].includes('stud_')){
                $("#" + keys[i]).val(data[keys[i]]);
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
                    const source = doc.dir;
                    $("#image-viewer").prop("src", base_url + source);
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

                // If there are no dir fetched, diable buttons
                if(doc.dir !== ''){
                    set_BtnFile(inFile + " ~ button.btnFile", false);
                    set_BtnView(inFile+ " ~ button.viewScan", false);
                }
            }

            // Fetched directories cannot be saved in input file tag
            // The follwing lines will fetch all the dir with values
            // and save is as an object to' __old_DIRS__' variable 
            let index = "doc_scan_" + keys[i];
            let docDir = doc.dir;
            VIEW_RECORD.__old_DIRS__.push(JSON.parse(`{"${index}" : "${docDir}"}`));

        }

        // After fetching all the remarks, validate each remark if they belong to the remark categories,
        // otherwise, save the remark to `__remarkOther__` which is the other remarks.
        value.forEach(currValue => {
            if(this.__remarksCategories__.includes(currValue)) this.__remarksValue__.push(currValue);
            else this.__remarksOther__ = currValue;
        });
        
        // The next line will then add all the fetched remarks to the remark holder
        for(v in this.__remarksValue__){
            this.addRemark(value[v]);
        }

        // If other remarks has value, show the other remark field and put the appropriate value
        if(this.__remarksOther__ !== '') {
            $("#_remarksValue_other").val(this.__remarksOther__);
            $("#_remarksValue_other_holder").removeClass("hide");
        }
    },

    /** PRIVATES */


    /** The OLD Values OF Direcroties of every scanced file */
    __old_DIRS__ : [],

    /** The value of the other remarks*/
    __remarksOther__ : "",

    /** The default/fixed values of remarks categories */
    __remarksCategories__ : [],

    /** The current remarks added in the remarks holder */
    __remarksValue__ : [],

    /** When invoking __addRemark()__, place the apropriate remarks in the holder aswell as on the __remarksValue__ variable */
    __loadRemarksVal__ : function () {
        VIEW_RECORD.__remarksValue__ = [];
        $("#remarks-holder").find('span').each(function (e) {
            VIEW_RECORD.__remarksValue__.push($(this).text());
        });
    }
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
$(".cb-doc").each(function(e){
    $(this).on("change", function(e){

        // Gets the corresponding button to the checkbox ticked
        const inFile = `#${$(this).attr('id')} ~ input[type='file']`;
        const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
        const btnView = `#${$(this).attr('id')} ~ button.viewScan`;
        const checked = $(this).prop('checked');

        // Prompts user and perform the correct action when checkbox is ticked
        $(btnFile).prop('disabled', !checked);
        if(!checked){ 
            if($(btnFile).hasClass('btn-danger')){
                if(confirm("Are you sure you want to replace/remove the scaned document?")){
                    $(inFile).val('');
                    $(inFile).prop('disabled', true);
                    set_BtnView(btnView, true);
                    set_BtnFile(btnFile, true);
                    $(btnFile).prop('disabled', true);
                }else{
                    $(this).prop('checked', true);
                    $(btnFile).prop('disabled', !$(this).prop('checked'));
                }
            }
        }
        $(inFile).prop('disabled', !$(this).prop('checked'));
    });
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
        if(confirm('Are you sure you want to replace/remove the scaned document?')){
            $(inFile).val('');
            $(btnFile).removeClass('btn-danger');
            $(btnFile).addClass('btn-success');
            $(btnFile).find('span').text('+');
            set_BtnView(btnView, true);

            
            // make the dir value as empty if the answer in  confirm is `yes`
            VIEW_RECORD.__old_DIRS__.forEach((value, index)=>{
                
                if(VIEW_RECORD.__old_DIRS__[index][key]) {
                    VIEW_RECORD.__old_DIRS__[index][key] = "";
                }
                
            })

            console.log(VIEW_RECORD.__old_DIRS__)
        }
    }else{
        $(inFile).trigger('click');
    }
}

// This function is for closing the view modal (insides are the animation logic)
$("#close-image-viewer-container").on("click", function(){
    $("#image-viewer-container").addClass('fade-out');
    $("#image-viewer-holder").addClass('pop-out');
    $("image-viewer").html('');
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

// The following lines are triggered when the user wants to view the uploaded image
$(".viewScan").on("click", function(){

    // Check id there is an image already uploaded (from `__old_DIRS__`)
    if(!$(this).hasClass('imgLoaded')){

        // Get the id, name, and, source of clicked buttons
        const id = $(this).attr('id');
        const name = id.replace('view_scan_', '');
        const source = document.getElementById("doc_scan_" + name).files[0];

        // This line is for reading the uploaded file ()
        const reader = new FileReader();

        // If the file is successfully loaded,
        // set the source of the image to the file
        reader.addEventListener('load', ()=>{
            $("#image-viewer").prop("src", reader.result);
        });

        // Check wehter the source has value or none,
        // If there is a value, read the file as how the browser would read it by default
        if(source) {
            reader.readAsDataURL(source);
            $("#image-viewer-container").removeClass('hide');
            $("#image-viewer-container").addClass('fade-in');
            $("#image-viewer-holder").addClass('pop-in');
        }
    }
});

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
