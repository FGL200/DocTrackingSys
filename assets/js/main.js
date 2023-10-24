const MAIN = {
    /**
     * Add new notification to side
     * @param {string} title 
     * @param {string} message 
     * @param {*} flag 
     */
    addNotif : function(title, message, flag){
        const holder = document.getElementById("notif-holder");

        let tColor = 
            (flag == "g") ? "#2ECC71" :
            (flag == "r") ? "#E74C3C" :
            "#17202A";
    
        let bColor = 
            (flag == "g") ? "#EAFAF1" :
            (flag == "r") ? "#FDEDEC" :
            "#F8F9F9";
    
        const notif = document.createElement("section");
        notif.setAttribute("class", "notif card shadow slide-in-out");
        notif.addEventListener("animationend", ()=>{
            notif.remove();
        })
        notif.style.border = "1px solid " + tColor;
        notif.style.backgroundColor = bColor;
        notif.style.position = "relative";

        const notif_close = document.createElement("button");
        notif_close.setAttribute("class", "notif_close_btn shadow");
        notif_close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        notif_close.style.position = "absolute";
        notif_close.style.top = "-15px";
        notif_close.style.left = "-15px";
        // notif_close.style.border = `1px solid ${tColor}`;
        // notif_close.style.backgroundColor = bColor;
        notif_close.addEventListener("click", ()=>{
            notif.remove();
            if(holder.children.length == 0){
                holder.classList.add("hide");
            }
        });
        
        const notif_title = document.createElement("section");
        notif_title.setAttribute("class", "notif-title font-b");
        notif_title.innerHTML = title;
        notif_title.style.color = tColor;
        notif_title.style.fontWeight = "bold";
    
        const notif_body = document.createElement("section");
        notif_body.setAttribute("class", "notif-body");
        notif_body.innerHTML = message;
    
        notif.appendChild(notif_close);
        notif.appendChild(notif_title);
        notif.appendChild(notif_body);
    
        
        if(holder.children.length < 3){
            holder.classList.remove("hide");
            holder.appendChild(notif);
        }
        else{
            holder.children[0].remove()
            holder.appendChild(notif);
        }
    },

    /**
     * Return a string that can be set as value to an input[type='date']
     * @param {Date} date 
     * @returns 
     */
    dateToInputDate : function(date){
        if(!date) return '1234-01-01';
        let today = new Date(date);
        let day = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate() ;
        let month = (today.getMonth() + 1 < 10) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);    
        let year = today.getFullYear();
        return `${year}-${month}-${day}`;
    },

    /**
     * Go to another page
     * @param {string} page 
     */
    goto : function(page){
        window.location.href = base_url + page;
    }
}

const ABOUT = {
    open : function(){
        MODAL.setTitle("About the System");
        MODAL.setBody(`
            The system is all about being a crazy version of you!
        `);
        MODAL.open();
    }
}

/**
 * Run function after seconds of delay
 * @param {Function} callBack 
 * @param {number} seconds default 3 seconds
 * @returns 
 */
const DELAY_FUNCTION = (callBack = null, seconds = 3) => {
    if(!callBack) return;
    const INTERVAL = setInterval(() => { callBack(); clearInterval(INTERVAL); }, seconds * 1000);
}