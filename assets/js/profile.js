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
    open : async function(){

        const profile = await load_profile(); 

        MODAL.setTitle("Profile");
        MODAL.setBody(`
        <div class="d-flex flex-column gap-2">
            <span class="d-flex flex-row justify-content-between align-items-center gap-2">
                <label for="profile-uname">Username</label>
                <input class="rounded border p-2" type="text" placeholder="Username" value="`+ profile.uname +`" name="profile-uname" id="profile-uname" disabled>
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
        MODAL.setScript(`PROFILE.onSubmit()`);
        MODAL.open();
    },
    /**
     * Save the profile
     */
    onSubmit : function(){
        MODAL.onSubmit( async (e)=>{
            e.preventDefault();
            const profile = new FormData(document.getElementById("modal-container"));
            profile.append("uid", CONST_UID);
            profile.append("rid", CONST_UID);
            
            // UPDATE PROFILE 
            console.log("save profile function is on main.js datas: ", profile);
            
            fetch("user/update", {
                method : "POST",
                body : profile
            })
            .catch(err=>{
                console.error("ERROR: " + err);
            })
            .then(resp=>resp.json())
            .then(()=>{
                MAIN.addNotif("Profile Updated!", "Information saved!", "g");
                MODAL.close();
            });
        })
    }
}

async function load_profile(){
    const form = new FormData();
    form.append("uid", CONST_UID);
    form.append("rid", CONST_UID);
    return await fetch(base_url + 'user', {
        method : 'post',
        body : form
    })
    .catch(err => {
        console.error("ERROR: " + err); 
    })
    .then(respose => respose.json())
    .then(respose => {
        const result = respose.result[0];
        return new Profile (
            result.uname,
            result.fname,
            result.lname,
            result.bday,
            result.gender
        );
    });
}