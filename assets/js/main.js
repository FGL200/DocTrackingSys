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
            (flag == "g") ? "#C8FEE0" :
            (flag == "r") ? "#FFAFAA" :
            "#ECECEC";
    
        let bColor = 
            (flag == "g") ? "#EAFAF1" :
            (flag == "r") ? "#FDEDEC" :
            "#F8F9F9";
    
        const notif = document.createElement("section");
        notif.setAttribute("class", "notif shadow slide-in-out");
        notif.addEventListener("animationend", ()=>{
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
        notif_close.addEventListener("click", ()=>{
            notif.remove();
            if(holder.children.length == 0){
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
        MODAL.setBody(`<div class="d-flex flex-column gap-2 p-3" style="max-width: 700px;">
        <section style="text-align: justify;">
            Welcome to the <b>Student Records and Admission Center Document Tracking System</b>, a powerful tracker system that allows RTU SRAC to store and manage vast amounts of information in a simple, secure, and efficient way.
        </section>
        <section style="text-align: justify;">
            <b>Our goal is to give RTU SRAC the tools they need to get insight from their data.</b> Although RTU SRAC's administration is rather small, it can benefit from this platform because of its ability to help it streamline operations, improve decision-making, and provide a better experience for clients.
        </section>
        <section style="text-align: justify;">
            <b>The system allows RTU SRAC to store massive volumes of data in a compact format.</b> Our user-friendly interface makes it simple to store, retrieve, and examine data from RTU customers in real time, making it easy for RTU SRAC to manage your data. In addition, RTU SRAC's customers' data will be safe and secured because this system is built to be secure and comply with industry standards.
        </section>
        </div>`);
        MODAL.setFooter(`
            <section>Checkout the <a href="#">System's Manual</a> to learn more!</section>
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

function getURLParams() {
    const searchParams = new URLSearchParams(window.location.search);
    let param = {};
    searchParams.forEach((v, i)=>{ param[i] = v; });
    return param;
}

async function fetch_data(url, options = null) {
    try {
        const response = await fetch(url, {
            method : options?.method,
            body : options?.form
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}
