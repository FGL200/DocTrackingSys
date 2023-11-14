const LOGIN = {
    login : async function(e) {
        e.preventDefault();
        const form = new FormData(document.getElementById("login-form"));
        const previousUsername = window.sessionStorage.getItem("username") ?? "";
        const blocked = JSON.parse(window.sessionStorage.getItem("blocked") ?? "[]");

        if(previousUsername !== form.get("username")) window.sessionStorage.removeItem("failedCount");

        let failedCount = window.sessionStorage.getItem("failedCount") ?? '0';
        console.log({failedCount, blocked});

        if(failedCount >= 3 || blocked.includes(form.get("username"))) {
            MAIN.addNotif("Account Blocked", "This account is blocked. Try again later.", "r");
            if(!blocked.includes(form.get("username"))) blocked.push(form.get("username"));
            window.sessionStorage.setItem("blocked", JSON.stringify(blocked));
            return;
        }

        await fetch(base_url + 'user/login', {
            method : 'post',
            body : form
        }) 
        .then(response => response.json())
        .then(result => {
            if(!result.result){

                window.sessionStorage.setItem("failedCount", (previousUsername === form.get("username")) ? ++failedCount : '1');

                window.sessionStorage.setItem("username", form.get("username"));

                MAIN.addNotif("Login failed", "Incorrect username or password", "r");
                return;
            }else{
                window.sessionStorage.removeItem("failedCount");
                window.sessionStorage.removeItem("username");

                
                window.location.href = base_url + 'dashboard';
            }
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
            title : `<div class="fs-4">Terms and Conditions (End-User License Agreement)</div>`,
            body : response,
            buttons : ["Close"]
        }, function(ans){
            if(!ans) return;
            // gawing true ung agree
            agree = true;
    
            // magiging false na si show once na pinindot ni user ang Agree
            showed = false;
        });
    })
    .catch(err => console.error(err));
}