import "../css/clock2.scss";

function Clock() {
  this.seconds = [
    "零秒",
    "一秒",
    "两秒",
    "三秒",
    "四秒",
    "五秒",
    "六秒",
    "七秒",
    "八秒",
    "九秒",
    "十秒",
    "十一秒",
    "十二秒",
    "十三秒",
    "十四秒",
    "十五秒",
    "十六秒",
    "十七秒",
    "十八秒",
    "十九秒",
    "二十秒",
    "二十一秒",
    "二十二秒",
    "二十三秒",
    "二十四秒",
    "二十五秒",
    "二十六秒",
    "二十七秒",
    "二十八秒",
    "二十九秒",
    "三十秒",
    "三十一秒",
    "三十二秒",
    "三十三秒",
    "三十四秒",
    "三十五秒",
    "三十六秒",
    "三十七秒",
    "三十八秒",
    "三十九秒",
    "四十秒",
    "四十一秒",
    "四十二秒",
    "四十三秒",
    "四十四秒",
    "四十五秒",
    "四十六秒",
    "四十七秒",
    "四十八秒",
    "四十九秒",
    "五十秒",
    "五十一秒",
    "五十二秒",
    "五十三秒",
    "五十四秒",
    "五十五秒",
    "五十六秒",
    "五十七秒",
    "五十八秒",
    "五十九秒",
  ];
  this.mins = [
    "零分",
    "一分",
    "两分",
    "三分",
    "四分",
    "五分",
    "六分",
    "七分",
    "八分",
    "九分",
    "十分",
    "十一分",
    "十二分",
    "十三分",
    "十四分",
    "十五分",
    "十六分",
    "十七分",
    "十八分",
    "十九分",
    "二十分",
    "二十一分",
    "二十二分",
    "二十三分",
    "二十四分",
    "二十五分",
    "二十六分",
    "二十七分",
    "二十八分",
    "二十九分",
    "三十分",
    "三十一分",
    "三十二分",
    "三十三分",
    "三十四分",
    "三十五分",
    "三十六分",
    "三十七分",
    "三十八分",
    "三十九分",
    "四十分",
    "四十一分",
    "四十二分",
    "四十三分",
    "四十四分",
    "四十五分",
    "四十六分",
    "四十七分",
    "四十八分",
    "四十九分",
    "五十分",
    "五十一分",
    "五十二分",
    "五十三分",
    "五十四分",
    "五十五分",
    "五十六分",
    "五十七分",
    "五十八分",
    "五十九分",
  ];
  this.hours = [
    "零时",
    "一时",
    "两时",
    "三时",
    "四时",
    "五时",
    "六时",
    "七时",
    "八时",
    "九时",
    "十时",
    "十一时",
    "十二时",
    "十三时",
    "十四时",
    "十五时",
    "十六时",
    "十七时",
    "十八时",
    "十九时",
    "二十时",
    "二十一时",
    "二十二时",
    "二十三时",
  ];
  this.events = []
}

Clock.prototype.init = function () {
  this.render();
  this.build()
};

Clock.prototype.render = function () {
  window.main.innerHTML = `<div clock2><div hand></div><div secondControler></div><div minControler></div><div hourControler></div></div>`;
};

Clock.prototype.build = function () {
  this.secondBuild().minBuild().hourBuild();
  setTimeout(this.addEvent.bind(this),200)
};

Clock.prototype.secondBuild = function () {
  let frag = document.createDocumentFragment();
  this.seconds.forEach((_second,index) => {
    let second = document.createElement("div");
    second.className = "second";
    second.innerText = _second;
    setTimeout(()=>{
      second.style.transform = `rotate(${(index*6)}deg)`;
    },200)
    frag.appendChild(second);
  });
  document.querySelector("div[secondControler]").appendChild(frag);
  return this;
};

Clock.prototype.minBuild = function () {
  let frag = document.createDocumentFragment();
  this.mins.forEach((_min,index) => {
    let min = document.createElement("div");
    min.className = "min";
    min.innerText = _min;
    setTimeout(()=>{
      min.style.transform = `rotate(${(index*6)}deg)`;
    },200)
    frag.appendChild(min);
  });
  document.querySelector("div[minControler]").appendChild(frag);
  return this;
};

Clock.prototype.hourBuild = function () {
  let frag = document.createDocumentFragment();
  this.hours.forEach((_hour,index) => {
    let hour = document.createElement("div");
    hour.className = "hour";
    hour.innerText = _hour;
    setTimeout(()=>{
      hour.style.transform = `rotate(${(index*15)}deg)`;
    },200)
    frag.appendChild(hour);
  });
  document.querySelector("div[hourControler]").appendChild(frag);
  return this;
};

Clock.prototype.addEvent = function () {
  let tsecond = new Date().getSeconds();
  let tmin = new Date().getMinutes();
  let thour = new Date().getHours();
  function s() {
    tsecond++
    document.querySelector("div[secondControler]").style.transform = `rotate(-${tsecond * 6}deg) translate3d(0,0,0)`;
  }
  function m(){
    if(tsecond%60===0) tmin++
    document.querySelector("div[minControler]").style.transform = `rotate(-${tmin * 6}deg) translate3d(0,0,0)`;
  }
  function h(){
    document.querySelector("div[hourControler]").style.transform = `rotate(-${thour * 15}deg) translate3d(0,0,0)`;
  }
  this.events.push(setInterval(s, 1000),setInterval(m, 1000),setInterval(h, 1000));
};

Clock.prototype.clearEvent = function(){
  this.events.forEach((event)=>{
    clearInterval(event)
  })
  //document.onvisibilitychange = null
}


// document.onvisibilitychange = function(){
//   let state = document.visibilityState
//   switch(state){
//     case "hidden":
//       window.clock.clearEvent()
//       break
//     case 'visible':
//       window.clock.addEvent()
//       break
//   }

// }


window.clock = new Clock()
clock.init()
