const LOGIN = {
    login : async function(e) {
        e.preventDefault();
        const form = new FormData(document.getElementById("login-form"));
        await fetch(base_url + 'user/login', {
            method : 'post',
            body : form
        }) 
        .then(response => response.json())
        .then(result => {
            if(!result.result){
                MAIN.addNotif("Login failed", "Incorrect username or password", "r");
                return;
            }else
                window.location.href = base_url + 'dashboard';
        })
        .catch(err=>{
            console.log(err);
            MAIN.addNotif('Server error', "Something went wrong while logging-in", "r");
        })
    }
}
$("#btn-login").on("click", LOGIN.login);   

async function termsAndCondition() {
    await fetch(`${base_url}assets/templates/terms_and_condition.html`)
    .then(response => response.text())
    .then(response => {
        // ipakita ung alert
        dts_alert({
            title : "Terms and Conditions (End-User License Agreement)",
            body : response,
            buttons : ["Agree"]
        }, function(ans){
            if(!ans) return;
            window.localStorage
            // gawing true ung agree
            agree = true;
    
            // magiging false na si show once na pinindot ni user ang Agree
            showed = false;
        });
    })
    .catch(err => console.error(err));
}