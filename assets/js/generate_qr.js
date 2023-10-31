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
            for(let d of result.data) {
                let qr_cont = $("<div class='qr-container'></div>");
                
                qr_cont.append(d[0]);

                const stud = JSON.parse(d[1]);
                console.log(stud);
                qr_cont.append(`<p class='text-center'>(#${stud["Record ID"]}) ${stud["Last Name"]} ${stud["First Name"]} </p>`);

                $("main").append(qr_cont);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

const qr = new QR();


qr.submit();