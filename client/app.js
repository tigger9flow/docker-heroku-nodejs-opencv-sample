(function () {
    const socket = io();
    const canvas = document.getElementById('video');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    ctx.fillStyle = '#7b7b7b';
    ctx.font = '26px Arial';
    ctx.fillText(
        'No Signal...',
        canvas.width / 2 - 60,
        canvas.height / 2
    );

    socket.on('connected', console.log);

    socket.on('captureError', console.error);

    socket.on('capture', ({ base64Str }) => {
        img.onload = () =>
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        img.src = `data:image/jpeg;base64,${base64Str}`;
    });
}());
