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
        <div class="d-flex flex-column gap-2 p-3">
            <span class="fw-bold">
                User Information
            </span>
            <hr>
            <div class="input-group mb-3">
                <span class="input-group-text">Username</span>
                <input  name="profile-uname" type="text" class="form-control" value="${profile.uname ? profile.uname : ''}" disabled>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Lastname</span>
                <input name="profile-lname" type="text" class="form-control" value="${profile.lname ? profile.lname : ''}" disabled>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Firstname</span>
                <input name="profile-fname" type="text" class="form-control" value="${profile.fname ? profile.fname : ''}" disabled>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Birthday</span>
                <input name="profile-bday" type="date" class="form-control" value="${profile.bday ? profile.bday : '1886-06-19'}" disabled>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Gender</span>
                <select class="form-control" name="profile-g" id="profile-g"  disabled>
                    <option value="N" disabled>Select Gender</option>
                    <option ` + (profile.g === "N" ? "Selected" : "") + ` value="N">Prefer not to say</option>
                    <option ` + (profile.g === "M" ? "Selected" : "") + ` value="M">Male</option>
                    <option ` + (profile.g === "F" ? "Selected" : "") + ` value="F">Female</option>
                </select>
            </div>

            <hr>

            <span class="d-flex flex-row justify-content-between align-items-center gap-2 text-nw">
                <label for="profile-old-pass">Old password</label>
                <input class="rounded border p-2" type="password" name="profile-old-pass" id="profile-old-pass" autocomplete>
            </span>
            <span class="d-flex flex-row justify-content-between align-items-center gap-2 text-nw">
                <label for="profile-new-pass">New password</label>
                <input class="rounded border p-2" type="password" name="profile-new-pass" id="profile-new-pass" autocomplete>
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
            
            fetch(base_url + "user/update", {
                method : "POST",
                body : profile
            })
            .then(resp=>resp.json())
            .then((resp)=>{
                if(resp.status === "error")  MAIN.addNotif("Incomplete fields!", resp.message, "r");
                else {
                    MAIN.addNotif("Profile Updated!", "Information saved!", "g");
                    MODAL.close();
                }
            })
            .catch(err=>{
                console.error("ERROR: " + err);
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