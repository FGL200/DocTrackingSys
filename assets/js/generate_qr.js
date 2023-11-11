class QR {
    submit() {
        const query_string = new URLSearchParams(window.location.search.slice(1));
        const form = new FormData();
        for (const q of query_string) {
            form.append(q[0], q[1]);
        }

        fetch(base_url + "student/build_qr", {
            method: "post",
            body: form
        })
        .then(resp => resp.json())
        .then(result => {
            console.log(result);

            let data_len = result.data.length;
            let i = 0;
            let delay = setInterval(() => {
                if (i >= result.data.length) {
                    clearInterval(delay);

                    $("main").removeClass("no-scroll");
                    $("body").removeClass("no-scroll");

                    $("main").removeClass("loading");
                    
                    const print = $(`<button class="btn btn-success no-print" style="
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                    " onclick="printQR()"><i class="fa-solid fa-print"></i> Print</button>`);
                    $("main").append(print);
                }
                for (i; i < data_len; i++) {


                    let qr_cont = $("<div class='qr-container d-flex align-items-center flex-column'></div>");
                    let qr = $("<div class='qr'></div>");
                    // let qr_logo = $("<div class='qr-logo'></div>");
                    const qr_label = $("<p style='font-size: small; margin: 0; max-width: 150px; text-align: center;'></p>");
                    const qr_data = JSON.stringify({ "Record ID": result.data[i]["Record ID"], "First Name": result.data[i]['First Name'], "Last Name": result.data[i]['Last Name'], "Middle Name": result.data[i]['Middle Name'] })
                    let qr_logo_ = document.getElementById(`qr-logo`);

                    qr_cont.qrcode({
                        // 'canvas', 'image' or 'div'
                        render: 'canvas',

                        text: qr_data,
                        // min/max versions
                        minVersion: 1,
                        maxVersion: 40,
                        mode: 4,
                        image: qr_logo_,


                        // error correction level
                        // 'L', 'M', 'Q' or 'H'
                        ecLevel: 'H',

                        // offset in pixels
                        left: 0,
                        top: 0,

                        // size in pixels
                        size: 150,

                        // code color or image element
                        fill: '#000',

                        // background color or image element
                        // background: null,

                        // border radius
                        radius: 0,

                        // quiet zone in modules
                        quiet: 5,

                        // position options
                        mSize: .25,
                        mPosX: 0.5,
                        mPosY: 0.5

                    });

                    // qr_label.text(`(${result.data[i]["Record ID"]}) ${result.data[i]["Last Name"]} ${result.data[i]["First Name"]} ${result.data[i]["Middle Name"]}`);
                    qr_label.text(`${result.data[i]["Last Name"]}, ${result.data[i]["First Name"]} ${result.data[i]["Middle Name"]}`);
                    // qr.append(qr_logo);
                    // qr_cont.append(qr);
                    qr_cont.append(qr_label);

                    this.display_qr(qr_cont);

                    if (i > 0 && i % 20 === 0) {
                        i += 1;
                        break;
                    }
                }

            }, 100);
        })
        .catch(err => {
            console.log(err);
        })
    }

    display_qr(element) {
        $("main").append(element)
    }
}

const qr = new QR();


qr.submit();

$(window).on("load", ()=>{
    $("header").addClass("no-print");
    $("footer").addClass("no-print");

    $("main").addClass("no-scroll");
    $("body").addClass("no-scroll");
});

function printQR() {
    // $("header").addClass("no-print");
    // $("footer").addClass("no-print");
    window.print();
}