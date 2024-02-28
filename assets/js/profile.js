class Profile {
  /**
   * New Instance of Profile
   * @param {string} uname Username
   * @param {string} fname Firstname
   * @param {string} lname Lastname
   * @param {string} bday Birthdate
   * @param {string} g Gender
   */
  constructor(uname = "", fname = "", lname = "", bday = "2000-01-01", g = "N") {
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
  open: async function () {

    const profile = await load_profile();

    if (!profile.uname) {
      location.reload();
      return;
    }

    MODAL.setSize('md');
    MODAL.setTitle("Profile");

    MODAL.setBody(Helper.replaceLayout((await Helper.template('profile/profile')), {
      uname: profile.uname || '',
      fname: profile.fname || '',
      mname: profile.mname || '',
      lname: profile.lname || '',
    }));
    if (profile.bday) Helper.f("#profile-bday").value = Helper.toInputDate(profile.bday);
    if (profile.gender) Helper.f("#profile-g").value = profile.gender;

    MODAL.setFooter(`<button type="submit" class="btn btn-success">Save</button>`);

    MODAL.onSubmit(async (e, form_data) => {
      e.preventDefault();

      if (Helper.formValidator(form_data, ["profile-fname", "profile-mname", "profile-lname", "profile-uname", "profile-bday", "profile-g"], v => v == '').length > 0) {
        Helper.Promt_Error('* Required fields must be filled.')
        return;
      }

      if (Helper.formValidator(form_data, ["profile-bday"], v => Helper.getAge(v) < 18).length > 0) {
        Helper.Promt_Error('* Birthdate is not valid. Age must be greater than 18.')
        return;
      }

      if (Helper.f("#profile-old-pass").value || Helper.f("#profile-new-pass").value) {
        if (Helper.formValidator(form_data, ["profile-old-pass", "profile-new-pass"], v => v == '').length > 0) {
          Helper.Promt_Error('* Old and New password reuqired.')
          return;
        }
      }

      Helper.Promt_Clear();

      const body = Helper.createFormData({ uid: CONST_UID, rid: CONST_UID }, form_data);
      const resp = (await Helper.api('user/update', 'json', body)).status;

      if (resp == "success") {
        MAIN.addNotif("Profile Updated!", "Information saved!", "g");
        MODAL.close();
      } else {
        MAIN.addNotif("Error", "Error occured. Try again later.", "r");
      }

    });

    MODAL.open();
  },
}

async function load_profile() {
  return (await Helper.api('user', "json", Helper.createFormData({ uid: CONST_UID, rid: CONST_UID }))).result[0];
}