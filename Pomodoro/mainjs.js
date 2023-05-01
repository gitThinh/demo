const selectOne = (param) =>document.querySelector(param);
const selectMany = (param) =>document.querySelectorAll(param);

const   [reporter,setting] = selectMany('.header_btn'),
[statePomo,stateSB,stateLB] = selectMany('.state button'),
[startStop,nextState] = selectMany('.start_stop button'),
Timer = selectOne('.time'),
resetCounter = selectOne('.reset_count'),
titleState = selectOne('.title_state');

const   settingForm = selectOne('#setting_form'),
closeFormButton = selectOne('.close_setting_form'),
saveForm = selectOne('.save_form'),
pomoTime = selectOne('.pomo_time'),
shortTime = selectOne('.short_time'),
longTime = selectOne('.long_time'),
CT = selectOne('.count_time');

let [time1,time2,time3,stateStep] = 
[pomoTime.value, shortTime.value, longTime.value,CT.value];
let countState = 0;
let intervalNumber;


const innerTime = (time) =>{ 
    Timer.innerHTML = (time < 10 ? '0'+time : time) + ':00';
}
const setTimeCount = () => {
    let time = statePomo.className === 'active' ? time1 : stateSB.className === 'active' ? time2 : time3;
    return Number(time);
}

let x = setTimeCount()*60 - 1;
innerTime(setTimeCount());

const setTimeAgain = () => {
    time1 = pomoTime.value;
    time2 = shortTime.value;
    time3 = longTime.value;
    stateStep = CT.value;
}
const countDownTimer = () =>{
    let minutes = Math.floor(x / 60),
    seconds = x % 60;
    Timer.innerHTML = (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
    if(x > 0) x--;
    else endTime();
}
const stopInterval = (x) => {
    clearInterval(x);
    startStop.classList.remove('change_stop');
    startStop.innerHTML = 'START';
    nextState.style.display = 'none';
}
const startInterval = () => {
    intervalNumber = setInterval(countDownTimer,1000);
    startStop.classList.add('change_stop');
    startStop.innerHTML = 'STOP';
    nextState.style.display = 'block';
}
const setStatePomo = () => {
    document.body.style.backgroundColor = 'var(--bc-main)';
    startStop.style.color = 'var(--bc-main)';
    statePomo.classList.add('active');
    stateSB.classList.remove('active');
    stateLB.classList.remove('active');
    innerTime(setTimeCount());
    x = setTimeCount()*60 - 1;
    stopInterval(intervalNumber);
    innerCountState();
}
statePomo.onclick = setStatePomo;

const setStateSB = () => {
    document.body.style.backgroundColor = 'var(--bc-short-break)';
    startStop.style.color = 'var(--bc-short-break)';
    stateSB.classList.add('active');
    statePomo.classList.remove('active');
    stateLB.classList.remove('active');
    innerTime(setTimeCount());
    x = setTimeCount()*60 - 1;
    stopInterval(intervalNumber);
    innerCountState();
}
stateSB.onclick = setStateSB;

const setStateLB = () => {
    document.body.style.backgroundColor = 'var(--bc-long-break)';
    startStop.style.color = 'var(--bc-long-break)';
    stateLB.classList.add('active');
    statePomo.classList.remove('active');
    stateSB.classList.remove('active');
    innerTime(setTimeCount());
    x = setTimeCount()*60 -1 ;
    stopInterval(intervalNumber);
    innerCountState();
}
stateLB.onclick = setStateLB;

const innerCountState = () =>{
    resetCounter.innerHTML = '#'+countState;
    titleState.innerHTML =  statePomo.classList.contains('active') ? 'Time to Focus!' : stateSB.classList.contains('active') ? '5 Minute relax!' : '15 Minute relax!'
}
const endTime = () => {
    if(statePomo.className === 'active') {
        (countState+1)%stateStep !== 0 ? setStateSB() : setStateLB();
        countState++;
    }else{
        setStatePomo();
    }
    innerCountState();
}
nextState.onclick = endTime;


setting.onclick = () => {
    settingForm.style.display = 'block';
    stopInterval(intervalNumber)
}
closeFormButton.onclick = () => {
    pomoTime.value = time1;
    shortTime.value = time2;
    longTime.value = time3;
    CT.value = stateStep;
    settingForm.style.display = 'none';
}
resetCounter.onclick = () => {
    if(confirm('Do you want to reset the counter?')){
        countState = 0;
        innerCountState(); 
    }
}
saveForm.onclick = () => {
    if(pomoTime.value > 0 && shortTime.value > 0 && longTime.value > 0){
        setTimeAgain();
        innerTime(setTimeCount());
        settingForm.style.display = 'none';
        x = setTimeCount()*60;
    }
}
startStop.onclick = () => {
    if(startStop.innerHTML === 'START') {    startInterval();}
    else{    stopInterval(intervalNumber)}
}
