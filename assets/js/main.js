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
    }
}

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

const PROFILE = {
    /**
     * 
     * @param {Profile} profile 
     */
    open : function(profile){
        MODAL.setTitle("Profile");
        MODAL.setBody(`
        <div class="d-flex flex-column gap-2">
            <span class="d-flex flex-row justify-content-between align-items-center gap-2">
                <label for="profile-uname">Username</label>
                <input class="rounded border p-2" type="text" placeholder="Username" value="`+ profile.uname +`" name="profile-uname" id="profile-uname">
            </span>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2">
                <label for="profile-fname">Firstname</label>
                <input class="rounded border p-2" type="text" placeholder="Firstname" value="`+ profile.fname +`" name="profile-fname" id="profile-fname">
            </span>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2">
                <label for="profile-lname">Lastname</label>
                <input class="rounded border p-2" type="text" placeholder="Lastname" value="`+ profile.lname +`" name="profile-lname" id="profile-lname">
            </span>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2">
                <label for="profile-bday">Birthday</label>
                <input class="rounded border p-2" type="date" value="` + profile.bday + `" name="profile-bday" id="profile-bday">
            </span>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2">
                <label for="profile-g">Gender</label>
                <select class="rounded border p-2" name="profile-g" id="profile-g">
                    <option value="N" disabled>Select Gender</option>
                    <option ` + (profile.g === "N" ? "Selected" : "") + ` value="N">Prefer not to say</option>
                    <option ` + (profile.g === "M" ? "Selected" : "") + ` value="M">Male</option>
                    <option ` + (profile.g === "F" ? "Selected" : "") + ` value="F">Female</option>
                </select>
            </span>
            <hr>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2 text-nw">
                <label for="profile-old-pass">Old password</label>
                <input class="rounded border p-2" type="password" name="profile-old-pass" id="profile-old-pass">
            </span>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2 text-nw">
                <label for="profile-new-pass">New password</label>
                <input class="rounded border p-2" type="password" name="profile-new-pass" id="profile-new-pass">
            </span>
        </div>
        `);
        MODAL.setFooter(`<button type="submit" class="btn btn-success">Save</button>`);
        MODAL.setScript(`<script>PROFILE.onSubmit()</script>`);
        MODAL.open();
    },
    /**
     * Save the profile
     */
    onSubmit : function(){
        MODAL.onSubmit((e)=>{
            e.preventDefault();
            const profile = new FormData(document.getElementById("modal-container"));

            // UPDATE PROFILE 
            console.log("save profile function is on main.js datas: ", profile);
            
            
            MAIN.addNotif("Profile Updated!", "Information saved!", "g");
            MODAL.close();
        })
    }
}

const ABOUT = {
    open : function(){
        MODAL.setTitle("About the System");
        MODAL.setBody(`
            The system is all about being a crazy version of you!
        `);
        MODAL.open();
    }
}

