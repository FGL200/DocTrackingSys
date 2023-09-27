const VIEW_RECORD = {

    /**
     * Update data
     */
    onSubmit: function () {
        const form = new FormData(document.getElementById("update-record-form"));
        form.append("remarks", VIEW_RECORD.__remarksValue__);

        form.forEach((val, key)=>{
            console.log({key, val});
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
        span.on("click", function (e) {
            e.preventDefault();
            $(this).remove();
            if ($("#remarks-holder").html().replaceAll(' ', '').replaceAll(/(\r\n|\n|\r)/gm, "") === "")
                $("#remarks-holder").html("No Remarks");
            VIEW_RECORD.__loadRemarksVal__();
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
        VIEW_RECORD.__loadRemarksVal__();
    },

    /**
     * Load the Student record and place it to the approrpiate fields
     * @param {Object} data the object data of the strudent records
     */
    loadStudentRecords : function (data) {
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
                const btn_element = "#doc_scan_" + keys[i];
                $(btn_element+ " ~ button.btnFile").prop("disabled", false);


                if(doc.dir !== ''){
                    changeFileDir(btn_element);
                    toggle_BtnFile(btn_element + " ~ button.btnFile");
                    $(btn_element+ " ~ button.viewScan").prop("disabled", false);
                }
            }

            let index = "doc_scan_" + keys[i];
            let docDir = doc.dir;
            VIEW_RECORD.__old_DIRS__.push(JSON.parse(`{"${index}" : "${docDir}"}`));

        }

        value.forEach(currValue => {
            if(this.__remarksCategories__.includes(currValue)) this.__remarksValue__.push(currValue);
            else this.__remarksOther__ = currValue;
        });
        
        for(v in this.__remarksValue__){
            this.addRemark(value[v]);
        }

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

    /** When invoking addRemark(), place the apropriate remarks in the holder aswell as on the __remarksValue__ variable */
    __loadRemarksVal__ : function () {
        VIEW_RECORD.__remarksValue__ = [];
        $("#remarks-holder").find('span').each(function (e) {
            VIEW_RECORD.__remarksValue__.push($(this).text());
        });
    }
}


$(".scaned-doc").each(function(e){
    $(this).on("change", function(e){
        const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
        const btnView = `#${$(this).attr('id')} ~ button.viewScan`;
        if($(this).val()) $(btnView).prop('disabled', false);
        toggle_BtnFile(btnFile);
    });
});

$(".cb-doc").each(function(e){
    $(this).on("change", function(e){
        const btnFile = `#${$(this).attr('id')} ~ button.btnFile`;
        $(btnFile).prop("disabled", !$(this).prop('checked'));
    });
});


function toggle_BtnFile(btnFile) {
    if ($(btnFile).hasClass("btn-success")){
        $(btnFile).removeClass("btn-success");
        $(btnFile).addClass("btn-danger");
        $(btnFile).find('span').text('-')
        $(btnFile + ' ~ button.viewScan').prop('disabled', false);
    }else{
        $(btnFile).removeClass("btn-danger");
        $(btnFile).addClass("btn-success");
    }
}


function changeFileDir (inputFile_Element){
    const btnFile = `${inputFile_Element} ~ button.btnFile`;
    const btnView = `${inputFile_Element} ~ button.viewScan`;

    if($(btnFile).hasClass('btn-danger')) {
        $(inputFile_Element).val('')
        $(btnFile).removeClass('btn-danger');
        $(btnFile).addClass('btn-success')
        $(btnView).prop('disabled', true);
        $(btnFile).find('span').text('+')
    }else{
        $(inputFile_Element).trigger('click');
    }
}

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

        
        $("#image-viewer-container").removeClass('hide');
        $("#image-viewer-container").addClass('fade-in');
        $("#image-viewer-holder").addClass('pop-in');
    }
});


$("#image-viewer-holder").on("animationend", function(){
    if($(this).hasClass('pop-in')) $(this).removeClass('pop-in');
    else $(this).removeClass('pop-out');
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


$(window).on("load", async function (e) {
    await loadRemarksCategories();
    await prepareStudentRecords();
});
