const DTS_QR = {

    onScan : function (value) {
        DTS_QR.audio().play();
        console.log({value});
    },

    audio : function () {
        if(DTS_QR.__audio__ !== null) return DTS_QR.__audio__;
        const _audio = new Audio(`${base_url}assets/audio/beep.mp3`);
        _audio.loop = false;
        return DTS_QR.__audio__ = _audio;
    },

    scanner : function () {
        if (DTS_QR.__scanner__ !== null) return DTS_QR.__scanner__;
        const _scanner = new Instascan.Scanner({
            video : document.getElementById("qr-camera"),
            mirror: false, // prevents the video to be mirrored
        });
        _scanner.addListener("scan", DTS_QR.onScan)
        return DTS_QR.__scanner__ = _scanner; 
    },

    initialize : async function () {
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                DTS_QR.scanner().start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    },

    swapCamera : function () {

    },

    length : 0,
    camUse : 0,
    __scanner__ : null,
    __audio__ : null,
}






// var audio = new Audio(`${base_url}assets/audio/beep.mp3`);
// audio.loop = false;

// let camSize = 0;
// let camUse = 0;

// let scanner = new Instascan.Scanner({
//     video: document.getElementById("qr-camera"),
//     mirror: false, // prevents the video to be mirrored
// });

// function StartScan() {
//     Instascan.Camera.getCameras().then((cameras) => {
//         camSize = cameras.length;

//         if (cameras.length > 0) {
//             scanner.start(cameras[camUse]);
//         } else {
//             console.log("No Camera")
//         }
//     }).catch((e) => {
//         alert(e);
//     });
// }

// function playSound() {
//     audio.play();
// }

// function Swap() {
//     if (camUse == 0) {
//         camUse = 1;
//         scanner.mirror = false;
//     } else {
//         camUse = 0;
//         scanner.mirror = true;
//     }

//     StartScan();
// }

// scanner.addListener("scan", (content) => {
//     playSound();
//     for (let index = 0; index < 25000; index++) {
//         console.log(index);
//     }
//     window.location = "./qr_read.php?data=" + content;
// });


// const CAMERA = document.getElementById("qr-camera");

// const DTS_QR = {
//     onScan : function (value) {
//         console.log(value);
//     },

//     onError : function (err) {
//         console.log(err);
//     },

//     scanner : function () {
//         return DTS_QR.__scanner__ == null ? new Html5QrcodeScanner('qr-camera', {
//             fps : 20,
//             qrbox: { width: 250, height: 250 }
//         }) : DTS_QR.__scanner__;
//     },

//     initialize : async function () {
//         DTS_QR.scanner().render(DTS_QR.onScan, DTS_QR.onError);
//     },

//     __scanner__ : null,
// }