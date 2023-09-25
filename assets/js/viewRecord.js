const VIEW_RECORD = {
    onSubmit : function() {
        $("#update-record-btn").on("click", function(e){
            e.preventDefault();
            console.log('HELLO');
        })
    }
}

$(window).on("load", async function(e){
    await fetch( base_url +'student/record/' + CONST_RECORD_ID)
    .then(response => response.json())
    .then(response=>{
        console.log(response);
    });

    await fetch(base_url + 'api/categories')
    .then(response => response.json())
    .then(categories => {
        let categs = `<option value="" disabled selected>--Select Remarks--</option>`;
        for (i in categories) categs += `<option value="${categories[i]}">${categories[i]}</option>`;
        $("#remarks-category").html(categs);
    }); 
});