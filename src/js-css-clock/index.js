import "./assets/css/index.scss";

let task = null
let second = document.querySelector("[second]");
let min = document.querySelector("[min]");
let hour = document.querySelector("[hour]");
const hands = [second, min, hour];

function init() {
  setHand(timeToDeg(getTime()));
  task = setInterval(update, 1000);
}

function update() {
  setHand(setAnimation(timeToDeg(getTime())));
}

function setHand(degs) {
  for(let i=0;i<hands.length;i++){
    hands[i].style.transform = `rotate(${degs[i]}deg)`
  }
}

function setAnimation(degs) {
  if(!degs){
    hands.forEach(hand=>{
      hand.style.transition = "none";
    })
    return
  }
  for(let i=0;i<hands.length;i++){
    if(degs[i]==0){
      hands[i].style.transition = "none";
    }else{
      hands[i].style.transition = `transform ${(i==0||i==1)?0.05:0.5}s cubic-bezier(0.9, 0.54, 0.26, 1.68)`;
    }
  }
  return degs
}

function getTime() {
  let time = new Date();
  return [time.getSeconds(), time.getMinutes(), time.getHours()];
}

function timeToDeg(times) {
  return [times[0] * 6, times[1] * 6, (times[2] + times[1] / 60) * 30];
}

// document.addEventListener("visibilitychange", function() {
//   if(document.visibilityState === 'visible'){
//     clearInterval(task)
//     setAnimation();
//     setHand(timeToDeg(getTime()));
//     task = setInterval(update, 1000);
//   }
// });

setTimeout(() => {
  init();
}, 500);
