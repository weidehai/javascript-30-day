import "./assets/css/index.scss";
import "./assets/index.html";

let clap = document.querySelector("[clap]");
let hihat = document.querySelector("[hihat]");
let kick = document.querySelector("[kick]");
let openhat = document.querySelector("[openhat]");
let boom = document.querySelector("[boom]");
let ride = document.querySelector("[ride]");
let snare = document.querySelector("[snare]");
let tom = document.querySelector("[tom]");
let tink = document.querySelector("[tink]");
const sounds = {
  clap,
  hihat,
  kick,
  openhat,
  boom,
  ride,
  snare,
  tom,
  tink,
};
const keyMap = {
  a: "clap",
  s: "hihat",
  d: "kick",
  f: "openhat",
  g: "boom",
  h: "ride",
  j: "snare",
  k: "tom",
  l: "tink",
};
let keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", function () {
    setClickStyle(this);
    sounds[this.getAttribute("data-sound")].play();
  });
});
keys.forEach((key) => {
  key.addEventListener("transitionend", function () {
    this.classList.remove("click");
  });
});
document.addEventListener("keydown", (e) => {
  let key = e.key;
  sounds[keyMap[key]].play()
  setClickStyle(document.querySelector(`[data-sound=${keyMap[key]}]`));
});

function setClickStyle(target) {
  target.classList.add("click");
}
