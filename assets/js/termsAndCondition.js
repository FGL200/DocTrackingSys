// dapat na se-save to sa localStorage eeee,
// pero as of now, every time na nasa dashboard sya lalabas to...
let agree = "";



// default value ng alert
let showed = false;
// mga pwedeng events ni user
$(window).on("load", async ()=>{
    
    const checkAgree = await fetch_data(`${base_url}agree/get`, {method : "post"});
    agree = checkAgree['agree'] == '1' ? true : false;

    console.log(agree);
    showTermsAndCondition();

    $(window).on("mousemove", showTermsAndCondition);
    $(window).on("keydown", showTermsAndCondition);
})




async function showTermsAndCondition() {
    // check if nag agree na ba si user sa Terms and Condition
    
    if(agree) return;

    // check if currently showing ung alert
    if(showed) return;
    
    // gawing true ung show
    showed = true;

    console.log(agree);

    await fetch(`${base_url}assets/templates/terms_and_condition.html`)
    .then(response => response.text())
    .then(response => {
        // ipakita ung alert
        dts_alert({
            title : `<div class="fs-4">Terms and Conditions (End-User License Agreement)</div>`,
            body : response,
            buttons : ["I Agree"]
        }, async function(ans){
            if(!ans) return;

            
            const result = await fetch_data(`${base_url}agree/set`, {method : "post"});
          
            
            agree = result['agree']== '1' ? true : false;
            showed = false;
    
            // magiging false na si show once na pinindot ni user ang Agree
           
        });
    })
    .catch(err => console.error(err));

}