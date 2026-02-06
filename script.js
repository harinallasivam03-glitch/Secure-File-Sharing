/* -------- PAGE 1 : SENDER LOGIN -------- */

function sendOTP() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;

  if (name === "" || contact === "") {
    alert("All fields are required");
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("senderOTP", otp);
  localStorage.setItem("otpTime", Date.now());

  alert("Sender OTP (Demo): " + otp);
  window.location.href = "otp.html";
}
/* -------- PAGE 2 : SENDER OTP VERIFY -------- */

let timeLeft = 60;
const otpTimer = setInterval(() => {
  const timer = document.getElementById("timer");
  if (!timer) return;

  timer.innerText = "OTP expires in " + timeLeft + " seconds";
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(otpTimer);
    alert("OTP Expired");
    window.location.href = "index.html";
  }
}, 1000);

function verifyOTP() {
  const enteredOTP = document.getElementById("otpInput").value;
  const storedOTP = localStorage.getItem("senderOTP");

  if (enteredOTP === storedOTP) {
    alert("OTP Verified Successfully");
    window.location.href = "upload.html";
  } else {
    alert("Invalid OTP");
  }
}
/* -------- PAGE 3 : IMAGE UPLOAD -------- */

function uploadImage() {
  const file = document.getElementById("imageFile").files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    localStorage.setItem("secureImage", reader.result);
    alert("Image uploaded successfully");
    window.location.href = "qr.html";
  };
  reader.readAsDataURL(file);
}
/* -------- PAGE 4 : QR GENERATE -------- */

function generateQR() {
  const qrBox = document.getElementById("qrBox");
  qrBox.innerHTML = "";

  new QRCode(qrBox, {
    text: "receiver-login.html",
    width: 180,
    height: 180
  });
}

/* -------- PAGE 4 : QR SCAN -------- */

function startScan() {
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 200 },
    (decodedText) => {
      html5QrCode.stop();
      window.location.href = decodedText;
    },
    () => {}
  );
}
/* -------- PAGE 5 : RECEIVER LOGIN -------- */

function receiverSendOTP() {
  const name = document.getElementById("rName").value;
  const contact = document.getElementById("rContact").value;

  if (name === "" || contact === "") {
    alert("All fields are required");
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("receiverOTP", otp);
  localStorage.setItem("receiverOTPTime", Date.now());

  alert("Receiver OTP (Demo): " + otp);
  window.location.href = "receiver-otp.html";
}
/* -------- PAGE 6 : RECEIVER OTP VERIFICATION -------- */

let receiverTime = 60;

const receiverTimer = setInterval(() => {
  const timer = document.getElementById("timer");
  if (!timer) return;

  timer.innerText = "OTP expires in " + receiverTime + " seconds";
  receiverTime--;

  if (receiverTime < 0) {
    clearInterval(receiverTimer);
    alert("OTP Expired");
    window.location.href = "receiver-login.html";
  }
}, 1000);

function verifyReceiverOTP() {
  const enteredOTP = document.getElementById("receiverOTPInput").value;
  const storedOTP = localStorage.getItem("receiverOTP");

  if (enteredOTP === storedOTP) {
    alert("Receiver OTP Verified Successfully");
    window.location.href = "download.html";
    // Next action (download page or button) can be added later
  } else {
    alert("Invalid OTP");
  }
}

/* -------- PAGE 7 : DOWNLOAD IMAGE -------- */

function downloadImage() {
  const imageData = localStorage.getItem("secureImage");

  if (!imageData) {
    alert("No image found");
    return;
  }

  const link = document.createElement("a");
  link.href = imageData;
  link.download = "secure-image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("Image downloaded successfully");
}

