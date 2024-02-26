function toGender(gender) {
    // switch (gender) {
    //     case "M" : return "Male"; break;
    //     case "F" : return "Female"; break;
    //     default : return "Prefer not to say"; break;
    // }
    return `<select name="gender" class="form-control">
        <option value="N" ${ gender=="N" ? "selected" : "" }>Prefer not to say</option>
        <option value="M" ${ gender=="M" ? "selected" : "" }>Male</option>
        <option value="F" ${ gender=="F" ? "selected" : "" }>Female</option>
    </select>`;
}

function toRole(role) {
    return `<select name="role" class="form-control">
        <option value="A" ${ role=="A" ? "selected" : "" }>Admin</option>
        <option value="E" ${ role=="E" ? "selected" : "" }>Encoder</option>
        <option value="V" ${ role=="V" ? "selected" : "" }>Viewer</option>
    </select>`;
}

function showUser(user) {
    const bday = MAIN.dateToInputDate(user.bday);
    const gender = toGender(user.gender);
    const role = toRole(user.role);

    console.log(user)
    MODAL.setTitle(`<span class="fs-4">Manage User</span>`);
    MODAL.setFooter(`<button class="btn btn-success">Save</button ><button type="button" onclick="resetPass(${user.id}, '${user.uname}')" class="btn btn-danger">Reset password</button>`);
    MODAL.setBody(`<div class="d-flex flex-column gap-2">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon1">Username</span>
            <input name="uname" type="text" class="form-control" value="${user.uname}" disabled>
            
            <div class="input-group-text form-check form-switch gap-2">
                <input class="form-check-input" type="checkbox" name="active" role="switch" id="flexSwitchCheckDefault" ${user.active == '1' ? 'checked' : ''}>
                <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
            </div>
        </div>
        <div class="input-group">
            <span class="input-group-text">Lastname</span>
            <input name="lname" type="text" class="form-control" value="${user.lname ? user.lname : "--"}">
        </div>
        <div class="input-group">
            <span class="input-group-text">Firstname</span>
            <input name="fname" type="text" class="form-control" value="${user.fname ? user.fname : "--"}">
        </div>
        <div class="input-group">
            <span class="input-group-text">Mname</span>
            <input name="mname" type="text" class="form-control" value="${user.mname ? user.mname : "--"}">
        </div>
        <div class="input-group">
            <span class="input-group-text">Gender</span>
            <!-- <input name="gender" type="text" class="form-control" value="${gender}"> -->
            ${gender}
        </div>
        <div class="input-group">
            <span class="input-group-text">Birthday</span>
            <input name="bday" type="date" class="form-control" value="${bday}">
        </div>
        <div class="input-group">
            <span class="input-group-text">Role</span>
            ${role}
        </div>
    </div>`);
    MODAL.open();
    MODAL.onSubmit((e)=>{
        const form = new FormData(MODAL.form);
        form.append("uid", user.id);
        form.append("uname", user.uname);
        form.append("action", "set-active");

        dts_alert({
            title: "Overwrite user",
            body : `Are you sure you want to overwrite <b>${user.uname}</b> data?`,
            buttons : ["Yes", "No"]
        }, function (ans){
            if(!ans) return;
    
            fetch(base_url + "user/update", {
                method : "POST",
                body : form
            })
            .then(resp => resp.json())
            .then(data => {
                MODAL.close();
                MAIN.addNotif("Updated Successfully!!", "Status updated!", "g");
                loadTable('user/all');
            })
            .catch(err => {
                MODAL.close();
                MAIN.addNotif("Server Error!", "Error in updating status!", "r");
            })
        });
    });
}

async function resetPass(uid, uname) {
    dts_alert({
        title: "Reset password",
        body : `Are you sure you want to reset password of <b>${uname}</b>?`,
        buttons : ["Yes", "No"]
    }, function (ans){
        if(!ans) return;

        const form = new FormData();
        form.append("uid", uid);
        form.append("uname", uname);
        form.append("action", "reset-password");

        fetch(base_url + "user/update", {
            method : "POST",
            body : form
        })
        .then(resp => resp.json())
        .then(data=>{
            MODAL.close();
            MAIN.addNotif("Password reset!!", "Password has been reset!", "g");
            loadTable('user/all');
        })
        .catch(err=>{
            MODAL.close();
            MAIN.addNotif("Server error!!", "Cannot reset password!", "r");
        })


        
    });
}

async function viewUser(id) {
    const uid = Number(id);
    
    const form = new FormData();
    form.append('uid', uid);
    form.append('rid', CONST_UID);

    await fetch(`${base_url}user`,{
        method : 'post',
        body : form
    })
    .then(response => response.json())
    .then(response => {
        showUser(response.result[0]);
    })
    .catch(err=>{
        console.error("ERROR: " + err);
    });
}


/**
* For Inserting new user
*/

async function newUser() {
    MODAL.setSize('md')
    MODAL.setTitle("New User");
    const layout = `
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group mb-3">
              <label>Username <small class="text-danger">*</small></label>
              <input type="text" name="user-uname" class="form-control">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group mb-3">
              <label>Role <small class="text-danger">*</small></label>
              <select name="user-role" class="form-control">
                <option value="">Select Gender</option>
                <option value="V">Admin</option>
                <option value="E">Encoder</option>
                <option value="A">Admin</option>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group mb-3">
              <label>First name <small class="text-danger">*</small></label>
              <input type="text" name="fname" class="form-control">
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group mb-3">
              <label>Middle name <small class="text-danger">*</small></label>
              <input type="text" name="mname" class="form-control">
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group mb-3">
              <label>Last name <small class="text-danger">*</small></label>
              <input type="text" name="lname" class="form-control">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group mb-3">
              <label>Birthday <small class="text-danger">*</small></label>
              <input type="date" name="bday" class="form-control">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group mb-3">
              <label>Gender <small class="text-danger">*</small></label>
              <select name="gender" class="form-control">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="N">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group mb-3">
              <input type="text" class="form-control" value="Password is set to 'default'" disabled>
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

    MODAL.setBody(layout);
    MODAL.setFooter(`<button type="submit" class="btn btn-success">Add User</button>`);

    MODAL.onSubmit(async function (e, form_data) {
        if(Helper.formValidator(form_data, ["user-uname", "user-role", "fname", "mname", "lname", "bday", "gender"], v => v == '').length > 0) {
          Helper.Promt_Error('* Required fields must be filled.')
          return;
        }

        if(Helper.formValidator(form_data, ["bday"], v => Helper.getAge(v) < 18).length > 0) {
          Helper.Promt_Error('* Birthdate is not valid. Age must be greater than 18.')
          return;
        }

        Helper.Promt_Clear();

        const resp = (await Helper.api('user/new', "json", form_data)).status;

        if(resp == "success") {
          MAIN.addNotif("Success", "Successfully added new user", "g");
          MODAL.close();
          loadTable('user/all');
        } else {
          MAIN.addNotif("Error", "Error occurred. Try again later.", "r");
        }
    });
    
    MODAL.open();
};

async function loadTable(route = null) {
    if (!route) return;

    // Add the loading page
    if ($.fn.DataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable().destroy();
        $('#dataTable').html("");
    }
    $('#dataTable').addClass('loading');

    const form = new FormData();
    form.append('uid', CONST_UID);
    await fetch(`${base_url}${route}`, {
        method: 'post',
        body: form
    })
    .then(response => response.json())
    .then(response => {
        const result = response.result;

        if(result.length == 0) {
            MAIN.addNotif("Table loaded", `No item found!`, "g");
            return;
        };

        MAIN.addNotif("Table loaded", `${result.length} item(s) found!`, "g");

        const keys = Object.keys(result[0]);

        let thead = `<thead><tr>`;
        for (let key of keys) thead += `<th>${key}</th>`;
        thead += "</tr></thead>";

        let tbody = `<tbody>`;
        for (let val of result) {
            tbody += "<tr>";
            for (let key of keys) tbody += `<td>${val[key]}</td>`;
            tbody += "</tr>"
        }
        tbody += "</tbody>";

        $("#dataTable").append(thead, tbody);
        $("#dataTable").DataTable();

        $('#dataTable').removeClass('loading');
    })
    .catch(err=>{
        console.error("ERROR: " + err);
    });
}

loadTable('user/all');