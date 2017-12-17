(function () {
    const socket = io();
    const canvas = document.getElementById('video');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    ctx.fillStyle = 'lightgray';
    ctx.font = '26px Arial';
    ctx.fillText(
        'Loading...',
        canvas.width / 2 - 60,
        canvas.height / 2
    );

    socket.on('connected', () => console.log('Successfully connected!'));

    socket.on('capture', ({ buffer }) => {
        console.log('Buffer came:', buffer);
        const uint8Arr = new Uint8Array(buffer);
        const rawStr = String.fromCharCode.apply(null, uint8Arr);
        const base64String = btoa(rawStr);

        img.onload = function () {
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
        };
        img.src = `data:image/png;base64,${base64String}`;
    });
}());
