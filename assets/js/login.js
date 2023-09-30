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
                window.location.href = base_url + 'home';
        })
        .catch(err=>{
            console.log(err);
            MAIN.addNotif('Server error', "Something went wrong while logging-in", "r");
        })
    }
}
$("#btn-login").on("click", LOGIN.login);   