const btnScanQR = document.getElementById('btn-scan-qr');
const outputData = document.getElementById('output');
const jsonData = document.getElementById('json-output');
const saveConfirmation = document.getElementById('save-confirmation');

let qrCodeData = [];

btnScanQR.onclick = () => {
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras.length > 0) {
            // Preferencialmente seleciona a câmera traseira
            const cameraId = cameras.find(camera => camera.facingMode === "environment" || camera.label.toLowerCase().includes("back"))?.id || cameras[0].id;
            
            const html5QrCode = new Html5Qrcode("qr-reader", false);
            html5QrCode.start(
                cameraId, 
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                qrCodeMessage => {
                    console.log(`QR Code detected: ${qrCodeMessage}`);
                    outputData.innerText = qrCodeMessage;

                    // Simula adição de dados ao "arquivo" JSON
                    qrCodeData.push(qrCodeMessage); // Aqui estamos presumindo que o QR Code contém um texto simples.
                    jsonData.innerText = JSON.stringify(qrCodeData, null, 2);
                    saveConfirmation.innerText = 'QR Code lido com sucesso! Dados adicionados ao JSON.';

                    // Parar a câmera após a leitura
                    html5QrCode.stop().then(() => console.log("QR Code scan completed."));
                },
                errorMessage => {
                    // Mensagem de erro na leitura do QR Code
                    console.log(`QR Code no result found: ${errorMessage}`);
                }
            ).catch(err => console.error(`Unable to start QR code scanner: ${err}`));
        } else {
            console.log("No cameras found.");
            alert("Nenhuma câmera encontrada.");
        }
    }).catch(err => console.error(`Error getting cameras: ${err}`));
};
