
function addNotif(title, message, flag = "b"){
    let tColor = 
        (flag == "g") ? "#2ECC71" :
        (flag == "r") ? "#E74C3C" :
        "#17202A";

    let bColor = 
        (flag == "g") ? "#EAFAF1" :
        (flag == "r") ? "#FDEDEC" :
        "#F8F9F9";

    const notif = document.createElement("section");
    notif.setAttribute("class", "notif card shadow-lg fade-out");
    // notif.setAttribute("class", "notif card shadow-lg");
    notif.addEventListener("animationend", ()=>{
        notif.remove();
    })
    notif.style.border = "1px solid " + tColor;
    notif.style.backgroundColor = bColor;
    
    const notif_title = document.createElement("section");
    notif_title.setAttribute("class", "notif-title text-b");
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
}