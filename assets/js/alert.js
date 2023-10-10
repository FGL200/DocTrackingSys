const ALERT = {
    response : true,
    waiting : true
}


function dts_alert(title, body, buttons = ["Okay", "Cancel"]) {
    ALERT.response = true;

    const e_HOLDER = $("<div class='d-flex justify-content-center fade-in' id='dts_alert-holder' style='background-color: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: 2;'></div>");
    const e_CONTAINER = $("<div class='d-flex flex-column m-5 p-2 card fade-in-slide-down' id='dts_alert-container' style='position: absolute; min-width: 300px;'></div>");
    const e_HEADER = $(`<div class='' id='dts_alert-header'>${title}</div>`);
    const e_BODY = $(`<div class='' id='dts_alert-body'>${body}</div>`);
    const e_FOOTER = $("<div class='d-flex flex-row-reverse' id='dts_alert-footer'></div>");

    const b_BUTTON1 = $(`<button class='btn btn-primary'>${buttons[0] ? buttons[0] : "Okay"}</button>`);
    const b_BUTTON2 = buttons[1] ? $(`<button class='btn btn-secondary'>${buttons[1]}</button>`) : null;

    e_FOOTER.append(b_BUTTON1, b_BUTTON2);
    e_CONTAINER.append(e_HEADER, e_BODY, e_FOOTER);
    e_HOLDER.append(e_CONTAINER);
    $("#root").append(e_HOLDER);

    ALERT.waiting = Boolean(b_BUTTON1 || b_BUTTON2);

    if(ALERT.waiting) {
        b_BUTTON1 ? b_BUTTON1.on("click", function(e){
            e_HOLDER.on("animationend", function(e) {
                e_HOLDER.remove();
            });
            e_HOLDER.removeClass("fade-in");
            e_HOLDER.addClass("fade-out");
            e_CONTAINER.addClass("fade-out-slide-right")
            ALERT.waiting = false;
            ALERT.response = true;
        }) : null;
        b_BUTTON2 ? b_BUTTON2.on("click", function(e){
            e_HOLDER.on("animationend", function(e) {
                e_HOLDER.remove();
            });
            e_HOLDER.removeClass("fade-in");
            e_HOLDER.addClass("fade-out");
            e_CONTAINER.addClass("fade-out-slide-right")
            ALERT.waiting = false;
            ALERT.response = true;
        }) : null;
    }

    return ALERT.response;
}