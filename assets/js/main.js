class Profile{
    /**
     * New Instance of Profile
     * @param {string} uname Username
     * @param {string} fname Firstname
     * @param {string} lname Lastname
     * @param {string} bday Birthdate
     * @param {string} g Gender
     */
    constructor(uname = "", fname = "", lname = "", bday = "2000-01-01", g = "N"){
        this.uname = uname;
        this.fname = fname;
        this.lname = lname;
        this.bday = bday;
        this.g = g;
    };
}

const MAIN = {
    /**
     * Add new notification to side
     * @param {string} title 
     * @param {string} message 
     * @param {*} flag 
     */
    addNotif : function(title, message, flag){
        let tColor = 
            (flag == "g") ? "#2ECC71" :
            (flag == "r") ? "#E74C3C" :
            "#17202A";
    
        let bColor = 
            (flag == "g") ? "#EAFAF1" :
            (flag == "r") ? "#FDEDEC" :
            "#F8F9F9";
    
        const notif = document.createElement("section");
        notif.setAttribute("class", "notif card shadow-lg slide-in-out");
        // notif.setAttribute("class", "notif card shadow-lg");
        notif.addEventListener("animationend", ()=>{
            notif.remove();
        })
        notif.style.border = "1px solid " + tColor;
        notif.style.backgroundColor = bColor;
        
        const notif_title = document.createElement("section");
        notif_title.setAttribute("class", "notif-title font-b");
        notif_title.innerHTML = title;
        notif_title.style.color = tColor;
    
        const notif_body = document.createElement("section");
        notif_body.setAttribute("class", "notif-body");
        notif_body.innerHTML = message;
    
        notif.appendChild(notif_title);
        notif.appendChild(notif_body);
    
        const holder = document.getElementById("notif-holder");
        if(holder.children.length < 6)
            holder.appendChild(notif);
    },

    /**
     * Return a string that can be set as value to an input[type='date']
     * @param {Date} date 
     * @returns 
     */
    dateToInputDate : function(date){
        let today = date;
        let day = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate() ;
        let month = (today.getMonth() + 1 < 10) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);    
        let year = today.getFullYear();
        return `${year}-${month}-${day}`;
    },

    /**
     * Go to another page
     * @param {string} url 
     */
    goto : function(url){
        window.location.href = url;
    },
    /**
     * 
     * @param {Profile} profile 
     */
    openProfile : function(profile){
        MODAL.setTitle("Profile");
        MODAL.setBody(`
        <div class="flex-c g-2">
            <span class="flex-r justify-c-space-between align-i-center g-2">
                <label for="profile-uname">Username</label>
                <input class="form-control" type="text" placeholder="Username" value="`+ profile.uname +`" id="profile-uname" readonly>
            </span>
            <span class="flex-r justify-c-space-between align-i-center g-2">
                <label for="profile-fname">Firstname</label>
                <input class="form-control" type="text" placeholder="Firstname" value="`+ profile.fname +`" id="profile-fname" readonly>
            </span>
            <span class="flex-r justify-c-space-between align-i-center g-2">
                <label for="profile-lname">Lastname</label>
                <input class="form-control" type="text" placeholder="Lastname" value="`+ profile.lname +`" id="profile-lname" readonly>
            </span>
            <span class="flex-r justify-c-space-between align-i-center g-2">
                <label for="profile-g">Gender</label>
                <select class="form-control" name="" id="profile-g">
                    <option value="N" disabled>Select Gender</option>
                    <option ` + (profile.g === "N" ? "Selected" : "") + ` value="N">Prefer not to say</option>
                    <option ` + (profile.g === "M" ? "Selected" : "") + ` value="M">Male</option>
                    <option ` + (profile.g === "F" ? "Selected" : "") + ` value="F">Female</option>
                </select>
            </span>
            <span class="flex-r justify-c-space-between align-i-center g-2">
                <label for="profile-bday">Birthday</label>
                <input class="form-control" type="date" value="` + profile.bday + `" id="profile-bday" readonly>
            </span>
            <hr>
            <span class="flex-r justify-c-space-between align-i-center g-2 text-nw">
                <label for="profile-old-pass">Old password</label>
                <input class="form-control" type="password" id="profile-old-pass">
            </span>
            <span class="flex-r justify-c-space-between align-i-center g-2 text-nw">
                <label for="profile-new-pass">New password</label>
                <input class="form-control" type="password" id="profile-new-pass">
            </span>
        </div>
        `);
        MODAL.setFooter(`<button class="btn btn-success" onclick="MAIN.saveProfile()">Save</button>`);
        MODAL.open();
    },
    /**
     * Save the profile
     */
    saveProfile : function(){
        const profile = new FormData();
        profile.append("uname", $("#profile-uname").val());
        profile.append("fname", $("#profile-fname").val());
        profile.append("lname", $("#profile-lname").val());
        profile.append("g", $("#profile-g").val());
        profile.append("bday", $("#profile-bday").val());

        this.addNotif("Profile Updated!", "Information saved!", "g");
        console.log("save profile function on main.js datas: ", profile);
        MODAL.close();
    }
}

const MODAL = {
    /**
     * For opening / closing modal
     */
    fade_out : false,
    /**
     * Hide the modal
     */
    close : function(){
        this.fade_out = true;
        $("#modal-holder").addClass("fade-out");
    },
    /**
     * Show the modal
     */
    open : function(){
        this.fade_out = false;
        $("#modal-holder").removeClass("hide");
        $("#modal-holder").addClass("fade-in");
    },
    /**
     * Set title of modal
     */
    setTitle: function(content){
        $("#modal-title").html(content);
    },
    /**
     * Set body of modal
     */
    setBody: function(content){
        $("#modal-body").html(content);
    },
    /**
     * Set footer of modal
     */
    setFooter: function(content){
        $("#modal-footer").html(content);
    }
}

$("#modal-holder").on("animationend", function(e){
    e.preventDefault();
    if(MODAL.fade_out){
        $("#modal-holder").addClass("hide");
        $("#modal-holder").removeClass("fade-out");
        $("#modal-title").html("");
        $("#modal-body").html("");
        $("#modal-footer").html("");
    }else{
        $("#modal-holder").removeClass("fade-in");
    }
});

