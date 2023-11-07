// dapat na se-save to sa localStorage eeee,
// pero as of now, every time na nasa dashboard sya lalabas to...
let agree = window.localStorage.getItem("agree");

// default value ng alert
let showed = false;
console.log(agree);
// mga pwedeng events ni user
$(window).on("load", showTermsAndCondition);
$(window).on("mousemove", showTermsAndCondition);
$(window).on("keydown", showTermsAndCondition);


function showTermsAndCondition() {
    // check if nag agree na ba si user sa Terms and Condition
    if(agree) return;

    // check if currently showing ung alert
    if(showed) return;
    
    // gawing true ung show
    showed = true;

    // ipakita ung alert
    dts_alert({
        title : "Terms and Condition",
        body : `Do you agree na tama sya at mali ka?`,
        buttons : ["Agree"]
    }, function(ans){
        if(!ans) return;
        window.localStorage
        // gawing true ung agree
        agree = true;
        window.localStorage.setItem("agree", true);

        // magiging false na si show once na pinindot ni user ang Agree
        showed = false;
    });
}