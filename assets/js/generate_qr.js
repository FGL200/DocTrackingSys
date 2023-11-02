class QR {
    submit() {
        const query_string = new URLSearchParams(window.location.search.slice(1));
        const form = new FormData();
        for(const q of query_string) {
            form.append(q[0], q[1]);
        }
        
        fetch(base_url + "student/build_qr", {
            method : "post",
            body : form
        })
        .then(resp => resp.json())
        .then(result=>{
            console.log(result);
                
                let data_len = result.data.length;
                let i = 0;
                // let delay = setInterval(()=>{
                //     if(i >= result.data.length) {clearInterval(delay); console.log("HEY"); console.log($(".qr-container").length);}
                    for(i ; i < data_len; i++) {
                        
                       
                        let qr_cont = $("<div class='qr-container d-flex justify-content-center align-items-center flex-column'></div>");
                        const qr_label = $("<p></p>");

                        const qr_data = JSON.stringify({"Record ID" : result.data[i]["Record ID"], "First Name" : result.data[i]['First Name'], "Last Name" : result.data[i]['Last Name'], "Middle Name" : result.data[i]['Middle Name']})
                        // let qr_logo = $(`<img src='${base_url}assets/images/rtu-logo.png'>`);
                        // console.log(`${base_url}assets/images/rtu-logo.png`)
                        qr_cont.qrcode({
                            // 'canvas', 'image' or 'div'
                            render: 'canvas',
                        
                            text : qr_data,
                            // min/max versions
                            minVersion: 1,
                            maxVersion: 40,
                            mode: 0,
                            image:`${base_url}assets/images/rtu-logo.png`,
                            
        
                            // error correction level
                            // 'L', 'M', 'Q' or 'H'
                            ecLevel: 'H',
                        
                            // offset in pixels
                            left: 0,
                            top: 0,
                        
                            // size in pixels
                            size: 200,
                        
                            // code color or image element
                            fill: '#000',
                        
                            // background color or image element
                            // background: qr_logo,
                        
                            // border radius
                            radius: 0,
                        
                            // quiet zone in modules
                            quiet: 5, 
                        
                            // position options
                            mSize: 0.1,
                            mPosX: 0.5,
                            mPosY: 0.5
                        
                        });
                        
                        qr_label.text(`(${result.data[i]["Record ID"]}) ${result.data[i]["Last Name"]} ${result.data[i]["First Name"]} ${result.data[i]["Middle Name"]}`);
                        qr_cont.append(qr_label);

                        this.display_qr(qr_cont);
                        
                        // if(i > 0 && i % 20 === 0) {
                        //     i += 1;
                        //     break;
                        // }

                        console.log(i, result.data.length);
                    }
                    
                // }, 1000)

                
                
        })
        .catch(err=>{
            console.log(err);
        })
    }

    display_qr(element) {
        $("main").append(element)
    }
}

const qr = new QR();


qr.submit();