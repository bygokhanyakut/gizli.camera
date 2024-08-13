<?php
if (isset($_POST['image'])) {
    $image = $_POST['image'];
    $image = str_replace('data:image/png;base64,', '', $image);
    $image = str_replace(' ', '+', $image);
    $data = base64_decode($image);

    $fileName = 'selfie_' . time() . '.png';
    file_put_contents($fileName, $data);

    echo "Fotoğraf başarıyla kaydedildi: " . $fileName;
} else {
    echo "Hiçbir fotoğraf gönderilmedi.";
}
?>
