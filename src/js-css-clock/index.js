let switcher = document.querySelector("button");
let cc = "clock1";
const clocks = {
  clock1: function () {
    import("./assets/js/clock1").then((clock) => {
      console.log(clock)
      if(!style.clock1){
        style.clock1 = document.querySelector('style').innerText
      }else{
        restoreStyle()
      }
      new clock.clock().init();
    });
  },
  clock2: function () {
    import("./assets/js/clock2").then((clock) => {
      console.log(clock)
      if(!style.clock1){
        style.clock1 = document.querySelector('style').innerText
      }else{
        restoreStyle()
      }
      new clock.clock().init();
    });
  },
};

const style = {
  clock1: null,
  clock2: null,
};

function init() {
  clocks[cc]();
  switcher.addEventListener("click", () => {
    cc = cc === "clock1" ? "clock2" : "clock1";
    clearStyle();
    clocks[cc]();
  });
}

function clearStyle() {
  document.querySelector("style")?.remove();
}

function restoreStyle(){
  let tstyle = document.createElement('style')
  tstyle.innerText = style[cc]
  document.head.appendChild(tstyle)
}

init();
