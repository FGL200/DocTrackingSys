const LOGIN = {
    login : async function(e) {
        e.preventDefault();
        const form = new FormData(document.getElementById("login-form"));
        await fetch(base_url + 'login-user', {
            method : 'post',
            body : form
        }) 
        .then(response => response.json())
        .then(result => {
            if(!result.result){
                MAIN.addNotif("Login failed", "Incorrect username or password", "r");
                return;
            }else
                window.location.href = base_url + 'home';
        })
        .catch(err=>{
            console.log(err);
            MAIN.addNotif("Error Occured!", err, "r");
        })
    }
}

$("#btn-login").on("click", LOGIN.login);