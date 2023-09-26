const VIEW_RECORD = {

    onSubmit: function () {
        $("#update-record-btn").on("click", function (e) {
            e.preventDefault();
            console.log('HELLO');
        })
    },

    addRemark: function (value) {
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
            VIEW_RECORD.__loadRemearksVal__();
        });
        let count = 0;
        $("#remarks-holder").find('span').each(function (e) {
            if ($(this).html() === span.html()) count++;
        });
        if (count === 0) $("#remarks-holder").append(span);
        VIEW_RECORD.__loadRemearksVal__();
    },

    loadStudentRecords : function (data) {
        
        let keys = Object.keys(data);

        let value = [];

        for(i in keys){
            if(keys[i] === 'value'){
                if(data[keys[i]] == "") continue;
                value = JSON.parse(data[keys[i]]);
                continue;
            }

            if(keys[i].includes('stud_')){
                $("#" + keys[i]).val(data[keys[i]]);
                continue;
            }
            
            let doc = JSON.parse(data[keys[i]]); 

            $("#doc_val_" + keys[i]).prop("checked", parseInt(doc.val));
            // console.log(doc.dir);
            if(doc.val) {
                const btn_element = "#doc_scan_" + keys[i];
                $(btn_element+ " + button").prop("disabled", false);
                if(doc.dir){
                    console.log(btn_element);
                    toggle_File_Button(btn_element + " + button");
                    $(btn_element+ " ~ button").prop("disabled", false);
                }
            }

            let index = "doc_scan_" + keys[i];
            let docDir = doc.dir;
            VIEW_RECORD.__old_DIRS__.push(JSON.parse(`{"${index}" : "${docDir}"}`));

        }

        value.forEach(currValue => {
            this.__remarksCategories__.forEach(categValue=>{
                if(currValue == "INV. REMARKS - SENIOIR F137")
                    console.log((currValue == categValue), {currValue, categValue});
                
                if (currValue == categValue){ 
                    this.__remarksValue__.push(currValue);
                }
                else{ 
                    this.__remarksOther__ = currValue;
                }
            });
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

    __old_DIRS__ : [],

    __remarksOther__ : "",

    __remarksCategories__ : [],

    __remarksValue__ : [],

    __loadRemearksVal__: function () {
        VIEW_RECORD.__remarksValue__ = [];
        $("#remarks-holder").find('span').each(function (e) {
            VIEW_RECORD.__remarksValue__.push($(this).text());
        });
    }
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

$(window).on("load", async function (e) {
    await loadRemarksCategories();
    await prepareStudentRecords();
});





$(".scaned-doc").each(function(e){
    $(this).on("change", function(e){
        const btn_element = `#${$(this).attr('id')} + button`;
        toggle_File_Button(btn_element);
    });
});

$(".cb-doc").each(function(e){
    $(this).on("change", function(e){
        const btn_element = `#${$(this).attr('id')} ~ button`;
        $(btn_element).prop("disabled", !$(this).prop('checked'));
    });
});


function toggle_File_Button(btn_element) {
    console.log({btn_element})

    if($(btn_element).hasClass("btn-success")){
        $(btn_element).removeClass("btn-success");
        $(btn_element).addClass("btn-danger");
        $(btn_element).find('span').text('-')
    }else{
        $(btn_element).removeClass("btn-danger");
        $(btn_element).addClass("btn-success");
        $(btn_element).find('span').text('+')
    }
}


function scan_Button_On_Click (inputFile_Element){
    const btn_element = `${inputFile_Element} + button`;
    if($(btn_element).hasClass("btn-danger")){
        $(inputFile_Element).val('')
        toggle_File_Button(btn_element);
    }else{
        $(inputFile_Element).trigger('click');
    }
}