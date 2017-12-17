(function () {
    const socket = io();
    const canvas = document.getElementById('video');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    ctx.fillStyle = 'lightgray';
    ctx.font = '26px Arial';
    ctx.fillText(
        'No Signal...',
        canvas.width / 2 - 60,
        canvas.height / 2
    );

    socket.on('connected', console.log);

    socket.on('captureError', console.error);

    socket.on('capture', ({ base64Str }) => {
        // const uint8Arr = new Uint8Array(buffer);
        // const rawStr = new TextDecoder('utf-8').decode(uint8Arr);
        // const base64String = btoa(decodeURI(rawStr));

        img.onload = function () {
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        };
        img.src = `data:image/jpeg;base64,${base64Str}`;
    });
}());
