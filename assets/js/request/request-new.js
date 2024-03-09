import { CustomNotification } from "../../shared/custom-notification.js";
import { Helper } from "../../shared/helper.js";

Helper.importCSS('request/request_new');

(async ()=>{
    const resp = await Helper.api('file-request-category/all', 'json');
    
    resp.forEach(file_categ => {
        const option = document.createElement("option")
        option.value = file_categ['id'];
        option.innerText = file_categ['name'];

        Helper.f("select#file").append(option);
    })

    Helper.onChange("select#file", (e) => {
        $("#file-requests-holder > span").removeClass("d-none");

        const selectedOptionIndex = e.target.selectedIndex;
        const option = document.querySelectorAll("select#file > option")[selectedOptionIndex];

        const data = {id : option.value, text : option.innerText};
        Helper.f("div#file-requests-holder", (eHolder) => {
            const c_Input = eHolder.children;
            const isExist = c_Input.length > 0 ? [...c_Input].some(input => Helper.getDataBind(input, "file-req-id") == data['id']) : false;

            if(!isExist) {
                const input = document.createElement('input');
                input.classList.add('file-req-item', 'border', 'w-fit-content', 'rounded', 'd-block', 'text-center', 'p-2');
                input.setAttribute('type', 'text');
                input.setAttribute('data-binder-file-req-id', data['id']);
                input.readOnly = true;
                input.value = data['text'];
                eHolder.append(input)
            }
        })

        Helper.onClick("#file-requests-holder > input", (e) => {
            $(e.target).remove();

            if($("#file-requests-holder > input").length == 0) {
                $("#file-requests-holder > span").addClass("d-none");
            }
        }, true)
    })

    Helper.onSubmit("form#new-request-form", (e) => {
        e.preventDefault();
        const body = {'file' : ''};
        const inputs = document.querySelectorAll("form#new-request-form input, form#new-request-form textarea");
        
        inputs.forEach((input) => {
            let {name, value, type} = input;
            if( name && !input.classList.contains('file-req-item') && name != "file") {
                if(type == "checkbox" && !input.checked) value = 0;
                else if(type == "checkbox" && input.checked) value = 1;
                body[name] = value
            } else {
                if(!body['file']) body['file'] = JSON.stringify([]);

                const file = JSON.parse(body['file']);
                file.push(Helper.getDataBind(input,"file-req-id"));

                body['file'] = JSON.stringify(file);
            }
        })

        const conditionCB = (val, key) => {
            if(key != 'due_date') 
                return !val.trim();
            else 
                return !Helper.isFutureDate(val)
        }

        const invalids = Helper.formValidator(Helper.createFormData(body), ['fname', 'mname', 'lname', 'reason', 'due_date', 'file'], conditionCB);
        if(invalids.length == 0)
             (async () => {
                    const resp = await Helper.api('request/create', 'json', Helper.createFormData(body))
                    const {status, message} = resp;
                    if(status == 1) {
                        CustomNotification.add('Success', 'New Request Added', 'success');
                        
                        Helper.fm("#new-request-form input, #new-request-form textarea", (input) => {
                            input.value = "";
                        });
                        Helper.fm("#file-requests-holder input", (input) => input.remove());
                        Helper.f("#new-request-form input[type='checkbox']").checked = false;
                    } else {
                        CustomNotification.add('Error 500', message, 'danger');
                    }
                })()
    })
})()