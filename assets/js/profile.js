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

        if(!profile.uname) {
            window.location.reload();
            return;
        }

        MODAL.setSize('md');
        MODAL.setTitle("Profile");

        let layout = `
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="form-group mb-3">
                  <label>Username <small class="text-danger">*</small></label>
                  <input type="text" name="profile-uname" class="form-control" value="{{uname}}">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group mb-3">
                  <label>First name <small class="text-danger">*</small></label>
                  <input type="text" name="profile-fname" class="form-control" value="{{fname}}">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group mb-3">
                  <label>Middle name <small class="text-danger">*</small></label>
                  <input type="text" name="profile-mname" class="form-control" value="{{mname}}">
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group mb-3">
                  <label>Last name <small class="text-danger">*</small></label>
                  <input type="text" name="profile-lname" class="form-control" value="{{lname}}">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group mb-3">
                  <label>Birthday <small class="text-danger">*</small></label>
                  <input type="date" name="profile-bday" class="form-control" id="profile-bday">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group mb-3">
                  <label>Gender <small class="text-danger">*</small></label>
                  <select name="profile-g" class="form-control" id="profile-g">
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="N">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group mb-3">
                  <label>Old password</label>
                  <input type="text" name="profile-old-pass" class="form-control" id="profile-old-pass">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group mb-3">
                  <label>New password</label>
                  <input type="text" name="profile-new-pass" class="form-control" id="profile-new-pass">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <small class="error-msg text-danger"></small>
              </div>
            </div>
          </div>
        `;

        layout = Helper.replaceLayout(layout, {
          uname: profile.uname || '',
          fname: profile.fname || '',
          mname: profile.mname || '',
          lname: profile.lname || '',
        });

        MODAL.setBody(layout);
        if(profile.bday) Helper.f("#profile-bday").value = Helper.toInputDate(profile.bday);
        if(profile.g) Helper.f("#profile-g").value = profile.g;

        MODAL.setFooter(`<button type="submit" class="btn btn-success">Save</button>`);
        
        MODAL.onSubmit(async (e, form_data) =>{
          e.preventDefault();

          if(Helper.formValidator(form_data, ["profile-fname", "profile-mname", "profile-lname", "profile-uname", "profile-bday", "profile-g"], v => v == '').length > 0) {
            Helper.Promt_Error('* Required fields must be filled.')
            return;
          }

          if(Helper.formValidator(form_data, ["profile-bday"], v => Helper.getAge(v) < 18).length > 0) {
            Helper.Promt_Error('* Birthdate is not valid. Age must be greater than 18.')
            return;
          }

          if(Helper.f("#profile-old-pass").value || Helper.f("#profile-new-pass").value) {
            if(Helper.formValidator(form_data, ["profile-old-pass", "profile-new-pass"], v => v == '').length > 0) {
              Helper.Promt_Error('* Old and New password reuqired.')
              return;
            }
          }

          Helper.Promt_Clear();

          const body = Helper.createFormData({ uid: CONST_UID, rid: CONST_UID }, form_data);
          const resp = (await Helper.api('user/update', 'json', body)).status;

          if(resp == "success") {
            MAIN.addNotif("Profile Updated!", "Information saved!", "g");
            MODAL.close();
          } else {
            MAIN.addNotif("Error", "Error occured. Try again later.", "r");
          }

        });

        MODAL.open();
    },
}

async function load_profile(){
  return (await Helper.api('user', "json", Helper.createFormData({ uid: CONST_UID, rid: CONST_UID }))).result[0];
}