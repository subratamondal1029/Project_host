const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

const HMSelect = document.querySelectorAll('#alarmContainer select');


const AlarmBtn = document.getElementById('alarmBtn');


setInterval(getCurrenTime, 1000);

function getCurrenTime() {
    const currentDate = new Date();

    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSec = currentDate.getSeconds();

    setCurrentTime(currentHour, currentMinute, currentSec);

    return [currentHour, currentMinute];
}

function setCurrentTime(H, M, S) {
    hour.textContent = H;
    minute.textContent = M;
    second.textContent = S;
}

AlarmBtn.addEventListener('click', setAlarm);
let isDismiss = false;

function setAlarm(){
    const SelectedHour = HMSelect[0].value;
    const SelectedMinute = HMSelect[1].value;

    if (SelectedHour != 0 && SelectedMinute != 0) {
        showConfirm();
     
          setInterval(() => {
            if (!isDismiss) {
              checkAlarm(Number(SelectedHour), Number(SelectedMinute));
            }
          }, 1000);
      }

    }

function showConfirm(){
    const confirmBox = document.getElementById('alarmConfirm');
    confirmBox.style.top = '0';
    setTimeout(() =>{
        confirmBox.style.top = '-10%'
    }, 5000)
}

function checkAlarm(sh, sm) {
const currentTime = getCurrenTime();
const currentHour = currentTime[0];
const currentMinute = currentTime[1];

if (currentHour === sh && currentMinute === sm) {
   playAlarm();
}

}

const alarmBox = document.getElementById('alarmBox');
const alarmSound = document.getElementById('alarmAudio');

function playAlarm() {
    alarmSound.play();
    alarmBox.style.transform = 'translate(130%, -0%) scale(1)';
}


document.getElementById('StopAlarm').addEventListener('click', stopAlarm);
function stopAlarm() {
    isDismiss = true;
    alarmSound.pause();
    alarmBox.style.transform = 'translate(130%, -150%) scale(0)';

    setTimeout(() => {
        isDismiss = false;
    }, 60000);
}