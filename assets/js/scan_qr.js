const DTS_QR = {

    onScan: function (value) {
        DTS_QR.audio().play();

        value = JSON.parse(value);
        record_id = value["Record ID"];

        DELAY_FUNCTION(()=>{
            window.location.href = `${base_url}record/${record_id}?from=${CONST_SHELF_NAME}`;
            DTS_QR.stopScanner();
            MODAL.close();
        }, 1);

    },

    audio: function () {
        if (DTS_QR.__audio__ !== null) return DTS_QR.__audio__;
        const _audio = new Audio(`${base_url}assets/audio/beep.mp3`);
        _audio.loop = false;
        return DTS_QR.__audio__ = _audio;
    },

    scanner: function () {
        if (DTS_QR.__scanner__ !== null) return DTS_QR.__scanner__;
        const args = {
            video: document.getElementById("qr-camera"),
            mirror: false, // prevents the video to be mirrored
        };
        window.URL.createObjectURL = (stream) => {
            args.video.srcObject = stream;
            return stream;
        };
        return DTS_QR.__scanner__ = new Instascan.Scanner(args);
    },

    initialize: async function () {
        await Instascan.Camera.getCameras().then(function (cameras) {
            let length = DTS_QR.length = cameras.length;
            let use = DTS_QR.camUse;

            if (length > 0) {
                DTS_QR.scanner().start(cameras[use]);
            } else {
                dts_alert({
                    title: "Error Scanning QR",
                    body : `No Camera device available`
                }, ()=>{ DTS_QR.stopScanner(); });
            }

            DTS_QR.scanner().addListener("scan", DTS_QR.onScan);
        }).catch(function (e) {
            console.error("ERROR: " + e);
            DTS_QR.scanner().stop();
        });
    },

    swapCamera: function () {
        DTS_QR.stopScanner();

        DTS_QR.camUse ++;
        if(DTS_QR.camUse > (DTS_QR.length - 1)) DTS_QR.camUse = 0;

        DTS_QR.initialize();
    },

    stopScanner: function () {
        DTS_QR.scanner().stop();
        DTS_QR.__scanner__ = null;
    },

    length: 0,
    camUse: 0,
    __scanner__: null,
    __audio__: null,
}