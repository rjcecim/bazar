const btnScanQR = document.getElementById('btn-scan-qr');
const outputData = document.getElementById('output');
const jsonData = document.getElementById('json-output');

let qrCodeData = [];

btnScanQR.onclick = () => {
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras.length) {
            const cameraId = cameras[0].id;
            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCode.start(
                cameraId, 
                {
                    fps: 10,
                    qrbox: 250,
                },
                qrCodeMessage => {
                    // Processo de leitura bem-sucedido
                    console.log(`QR Code detected: ${qrCodeMessage}`);
                    outputData.innerText = qrCodeMessage;

                    // Convertendo e armazenando os dados
                    const qrData = JSON.parse(qrCodeMessage); // Certifique-se de que o QR Code contém um JSON válido
                    qrCodeData.push(qrData);
                    jsonData.innerText = JSON.stringify(qrCodeData, null, 2);

                    // Parar a câmera após a leitura bem-sucedida
                    html5QrCode.stop().then(() => console.log("QR Code scan completed."));
                },
                errorMessage => {
                    console.log(`QR Code no result found: ${errorMessage}`);
                }
            ).catch(err => console.error(err));
        }
    }).catch(err => console.error(err));
};
