function toGender(gender) {
    switch (gender) {
        case "M" : return "Male"; break;
        case "F" : return "Female"; break;
        default : return "Prefer not to say"; break;
    }
}

function toRole(role) {
    return `<select name="" class="form-control">
        <option value="N" ${ role=="A" ? "selected" : "" }>Admin</option>
        <option value="M" ${ role=="E" ? "selected" : "" }>Encoder</option>
        <option value="F" ${ role=="V" ? "selected" : "" }>Viewer</option>
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
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" ${user.active == '1' ? 'checked' : ''}>
                <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
            </div>
        </div>
        <div class="input-group">
            <span class="input-group-text">Lastname</span>
            <input name="lname" type="text" class="form-control" value="${user.lname ? user.lname : "--"}" disabled>
        </div>
        <div class="input-group">
            <span class="input-group-text">Firstname</span>
            <input name="fname" type="text" class="form-control" value="${user.fname ? user.fname : "--"}" disabled>
        </div>
        <div class="input-group">
            <span class="input-group-text">Mname</span>
            <input name="mname" type="text" class="form-control" value="${user.mname ? user.mname : "--"}" disabled>
        </div>
        <div class="input-group">
            <span class="input-group-text">Gender</span>
            <input name="gender" type="text" class="form-control" value="${gender}" disabled>
        </div>
        <div class="input-group">
            <span class="input-group-text">Birthday</span>
            <input name="bday" type="date" class="form-control" value="${bday}" disabled>
        </div>
        <div class="input-group">
            <span class="input-group-text">Role</span>
            ${role}
        </div>
    </div>`);
    MODAL.open();
    MODAL.onSubmit((e)=>{
        const form = new FormData(MODAL.form);

        dts_alert({
            title: "Overwrite user",
            body : `Are you sure you want to overwrite <b>${user.uname}</b> data?`,
            buttons : ["Yes", "No"]
        }, function (ans){
            if(!ans) return;
            
            MODAL.close();
            MAIN.addNotif("Successfully updated!", "User data updated!", "g");
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

        MODAL.close();
        MAIN.addNotif("Password reset!!", "Password has been reset!", "g");
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
    MODAL.setTitle("New User");
    MODAL.setBody(`
        <div class="d-flex flex-column gap-1 card p-3">
            <span>
                <b>User Information</b>
            </span>
            <span>
                <select name="role" class="card p-2" style="width: 100%;">
                    <option value="V">Viewer</option>
                    <option value="E">Encoder</option>
                    <option value="A">Admin</option>
                </select>
            </span>
            <span>
                <input type="text" name="uname" class="card p-2" placeholder="Username" style="width: 100%;" autofocus>
            </span>
            <span>
                <p class="card p-2" style="width: 100%; color: grey; background-color: #E5E5E5;">Password is set to 'default'</p>
            </span>
        </div>
    `);
    MODAL.setFooter(`<button  id="btn-form-submit" class="btn btn-success">Add User</button>`);
    MODAL.setScript(`HOME.NEW_USER.onSubmit();`);
    MODAL.open();

    MODAL.onSubmit(async function (e) {
        e.preventDefault();

        // NEW_USER
        const form = new FormData(MODAL.form);
        await fetch(base_url + 'user/new', {
            method: 'post',
            body: form
        })
        .then(response => response.text())
        .then(result => {
            if (result) {
                MAIN.addNotif("Added new User!", "Successfully added new user", "g");
                MODAL.close();
            }
        })
        .catch(err => {
            MAIN.addNotif("Server error", "Something went wrong while adding new user", "r");
            console.log(err);
        });
    });
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