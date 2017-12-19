(function () {
    const socket = io();
    const canvas = document.getElementById('video');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const POSITIONS = [0.07, 0.1, 0.15, 0.2, 0.25];
    let currentIndex = 2;

    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');
    const lump = document.querySelector('.lump');

    ctx.fillStyle = '#7b7b7b';
    ctx.font = '26px Arial';
    ctx.fillText(
        'No Signal...',
        canvas.width / 2 - 60,
        canvas.height / 2
    );

    const disableArrow = element => {
        if (!element.className.includes('disabled')) {
            element.className = `${element.className} disabled`;
        }
    };

    const enableArrow = element => {
        if (element.className.includes('disabled')) {
            element.className = element.className.replace(' disabled', '');
        }
    };

    socket.on('connected', msg => {
        console.log(msg);
        enableArrow(rightArrow);
        enableArrow(leftArrow);

        rightArrow.onclick = () => {
            if (currentIndex !== POSITIONS.length - 1) {
                currentIndex++;
                enableArrow(leftArrow);
                socket.emit('moved', POSITIONS[currentIndex]);
            }

            if ((currentIndex + 1) >= POSITIONS.length) {
                disableArrow(rightArrow);
            }
        };

        leftArrow.onclick = () => {
            if (currentIndex > 0) {
                currentIndex--;
                enableArrow(rightArrow);
                socket.emit('moved', POSITIONS[currentIndex]);
            }

            if ((currentIndex - 1) <= 0) {
                disableArrow(leftArrow);
            }
        };
    });

    socket.on('captureError', console.error);

    socket.on('capture', ({ base64Str }) => {
        img.onload = () =>
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        img.src = `data:image/jpeg;base64,${base64Str}`;
    });

    socket.on('faceDetected', () => lump.style.backgroundColor = '#59F1E6');

    socket.on('faceNotDetected', () => lump.style.backgroundColor = '#6b6b6b');

    socket.on('moved', value => {
        console.log('MOVED', value);
       currentIndex = POSITIONS.findIndex(x => x === value);
    });
}());
