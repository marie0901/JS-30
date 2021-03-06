const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video:true, audio:false })
    .then(localMediaStreem => {
      video.src = window.URL.createObjectURL(localMediaStreem);
      video.play();
    })
    .catch(err => {console.log('getVideo error: ',err)})
}

function printToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval( () => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0,0,width,height);
    pixels = redEffect(pixels);
    ctx.putImageData(pixels, 0,0);

  }, 16)
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'nice me');
  link.innerHTML = `<img src = ${data} alt = "Mashenka khoroshaya"/>`;
  strip.insertBefore (link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i=0; i< pixels.data.length; i += 4) {
      pixels.data[i-150] = pixels.data[i+0] + 100;
      pixels.data[i+100] = pixels.data[i+1] - 10;
      pixels.data[i-150] = pixels.data[i+2] - 100;
    }
    return pixels;
}

getVideo();
video.addEventListener('canplay', printToCanvas)
