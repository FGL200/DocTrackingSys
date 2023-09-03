MAIN.addNotif("Welcome!", "User @ admin");

const HOME = {
    closeSearchFilter : function(){
        if(document.getElementById("search-filter-holder").children.length < 1){
            MAIN.addNotif("Search Failed!", "Filter is empty!", "r");
        }else{
            MODAL.close();
            MAIN.addNotif("Search in Progress!", "Filtering Tables...", "g");
        }
    },

    openSearchFilter : function(){
        MODAL.setTitle("Search Filter");
        MODAL.setBody(`
            <div style="width: 50%; margin: 0 auto;">
                <select id="search-filter" class="form-control" onchange="HOME.addSearchFilter(this)">
                    <option data-id="0" value="0_VALUE" selected disabled>--Select Filter--</option>
                    <option data-id="1" value="1_Student">Student</option>
                    <option data-id="2" value="2_Profile">Profile</option>
                    <option data-id="3" value="3_Issue">Issue</option>
                </select>
            </div>
            <div id="search-filter-holder" class="flex-r flex-wrap g-1 justify-c-center"></div>
        `);
        MODAL.setFooter('<button class="btn btn-secondary" onclick="HOME.closeSearchFilter()">Search</button>');

        MODAL.open();
    },

    addSearchFilter : function(e){
        
        const value = String(e.value);
        const id = value.split("_")[0];
        const rawFilterName = value.split("_")[1]
        const filterName = "Search by " + rawFilterName;
        
        for(let i = 0; i < e.children.length; i++){
            e.children[i].selected = false;
        }

        e.children[0].selected = true;

        const filter = document.createElement('span');
        filter.setAttribute("class", "card p-2 m-2 flex-c g-1 shadow");
        filter.setAttribute("data-id", id);
        
        const title = document.createElement("span");
        title.setAttribute("class", "flex-r g-1 justify-c-space-around align-c-center");
        title.innerHTML = "<b>" + filterName + "</b>";
        {
            const close = document.createElement("button");
            close.setAttribute("class", "flex-r justify-c-center align-c-center");
            close.setAttribute("style", "border: none; padding: .5rem; font-size: x-small; border-radius: 100%; height: 25px; width: 25px;")
            close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            close.addEventListener("click", function() {
                filter.remove();
            });
            title.appendChild(close);
        }
        filter.appendChild(title);

        const body = document.createElement("span");
        body.setAttribute("class", "flex-c g-1")
        {
            if(rawFilterName == "Student"){
                const fname = document.createElement("input");
                fname.setAttribute("class", "form-control");
                fname.setAttribute("type", "text");
                fname.setAttribute("placeholder", "First Name");
                fname.setAttribute("id", "filter-student-fname");
        
                const mname = document.createElement("input");
                mname.setAttribute("class", "form-control");
                mname.setAttribute("type", "text");
                mname.setAttribute("placeholder", "Middle Name");
                mname.setAttribute("id", "filter-student-mname");
    
                const lname = document.createElement("input");
                lname.setAttribute("class", "form-control");
                lname.setAttribute("type", "text");
                lname.setAttribute("placeholder", "Last Name");
                lname.setAttribute("id", "filter-student-lname");
    
                const sfx = document.createElement("input");
                sfx.setAttribute("class", "form-control");
                sfx.setAttribute("type", "text");
                sfx.setAttribute("placeholder", "SFX");
                sfx.setAttribute("id", "filter-student-sfx");
    
                body.append(fname);
                body.append(mname);
                body.append(lname);
                body.append(sfx);
            }else if(rawFilterName == "Profile"){
                const uname = document.createElement("input");
                uname.setAttribute("class", "form-control");
                uname.setAttribute("type", "text");
                uname.setAttribute("placeholder", "Username");
                uname.setAttribute("id", "filter-profile-uname");
        
                const fname = document.createElement("input");
                fname.setAttribute("class", "form-control");
                fname.setAttribute("type", "text");
                fname.setAttribute("placeholder", "First Name");
                fname.setAttribute("id", "filter-profile-fname");
    
                const lname = document.createElement("input");
                lname.setAttribute("class", "form-control");
                lname.setAttribute("type", "text");
                lname.setAttribute("placeholder", "Last Name");
                lname.setAttribute("id", "filter-profile-lname");

                body.append(uname);
                body.append(fname);
                body.append(lname);
            }else if(rawFilterName == "Issue"){
                const issue_id = document.createElement("input");
                issue_id.setAttribute("class", "form-control");
                issue_id.setAttribute("type", "text");
                issue_id.setAttribute("placeholder", "ID");
                issue_id.setAttribute("id", "filter-issue-issue_id");
                
                const issue_category = document.createElement("select");
                issue_category.setAttribute("class", "form-control");
                issue_category.setAttribute("id", "filter-issue-issue_category");
                issue_category.innerHTML = `
                    <option value="" default selected>--Select Category--</option>
                    <option value="inc_doc">Incomplete</option>
                    <option value="wrong_doc">Incorrect</option>
                    <option value="not_orig_doc">Not original</option>
                    <option value="not_orig_doc">Missplaced</option>
                    <option value="not_orig_doc">Missing</option>
                `;
                
                body.append(issue_id);
                body.append(issue_category);
            }

        }
        filter.append(body);
        

        const itemsHolder = document.getElementById("search-filter-holder");
        let copy = 0;
        for(let i = 0; i < itemsHolder.children.length; i ++){
            if(itemsHolder.children[i].getAttribute('data-id') == id) copy++;
        }
        if(copy == 0){
            itemsHolder.appendChild(filter);
        }
    }
}


