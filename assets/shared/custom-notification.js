import { Helper } from "./helper.js";

export class CustomNotification {

  static clear() {
    CustomNotification.__holder__.innerHTML = "";
  }

  static add(title, message, type) {
    if(!CustomNotification.__initialized__) CustomNotification.__init__f();
    const holder = CustomNotification.__holder__;

    let tColor =
      (type == "success") ? "#C8FEE0" :
        (type == "danger") ? "#FFAFAA" :
          "#ECECEC";

    let bColor =
      (type == "success") ? "#EAFAF1" :
        (type == "danger") ? "#FDEDEC" :
          "#F8F9F9";

    const notif = document.createElement("section");
    notif.setAttribute("class", "notif shadow slide-in-out");
    notif.addEventListener("animationend", () => {
      notif.remove();
    })
    // notif.style.border = "1px solid " + tColor;
    notif.style.backgroundColor = bColor;

    const notif_logo = document.createElement("img");
    notif_logo.src = `${base_url}assets/images/rtu-logo.png`;
    notif_logo.width = "20";
    notif_logo.height = "20";

    const notif_close = document.createElement("button");
    notif_close.setAttribute("class", "notif_close_btn");
    notif_close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    notif_close.style.position = "absolute";
    notif_close.style.top = "5px";
    notif_close.style.right = "5px";
    // notif_close.style.border = `1px solid ${tColor}`;
    // notif_close.style.backgroundColor = bColor;
    notif_close.addEventListener("click", () => {
      notif.remove();
      if (holder.children.length == 0) {
        holder.classList.add("hide");
      }
    });

    const notif_title = document.createElement("section");
    notif_title.setAttribute("class", "notif-title fw-bold d-flex align-items-center gap-2");
    notif_title.appendChild(notif_logo);
    notif_title.style.backgroundColor = tColor;

    const title_content = document.createElement('spam');
    title_content.innerHTML = title;
    notif_title.appendChild(title_content);

    const notif_body = document.createElement("section");
    notif_body.setAttribute("class", "notif-body");
    notif_body.innerHTML = message;

    const notif_time = document.createElement('p')
    notif_time.setAttribute("class", "text-end text-muted m-0 notif-time")
    notif_time.innerHTML = new Date().toLocaleTimeString();

    notif.appendChild(notif_close);
    notif.appendChild(notif_title);
    notif.appendChild(notif_body);
    notif.appendChild(notif_time);


    if (holder.children.length < 3) {
      holder.classList.remove("hide");
      holder.appendChild(notif);
    }
    else {
      holder.children[0].remove()
      holder.appendChild(notif);
    }
  }

  static __init__f() {

    const style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", `${base_url}assets/css/custom-notification.css`);
    Helper.f("head").appendChild(style);

    const holder = document.createElement("div");
    holder.setAttribute("id", "notif-holder")
    Helper.f("body").appendChild(holder);
    
    CustomNotification.__holder__ = holder;
    CustomNotification.__initialized__ = true;
  }

  static __initialized__ = false;
  static __holder__ = undefined;
}