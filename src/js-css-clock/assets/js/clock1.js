import "../css/clock1.scss";

function getTime() {
  let time = new Date();
  return [time.getSeconds(), time.getMinutes(), time.getHours()];
}

function timeToDeg(times) {
  return [times[0] * 6, times[1] * 6, (times[2] + times[1] / 60) * 30];
}

function Clock() {
  this.second = null;
  this.min = null;
  this.hour = null;
  this.hands = null;
  this.events = [];
}

Clock.prototype.init = function () {
  this.render();
  setTimeout(() => {
    this.setHand(timeToDeg(getTime()));
    this.events.push(
      setInterval(() => {
        this.update();
      }, 1000)
    );
  }, 200);
};

Clock.prototype.render = function () {
  window.main.innerHTML = `<div clock>
  <div hour class="hand"></div>
  <div min class="hand"></div>
  <div second class="hand"></div>
</div>`;
  this.second = document.querySelector("[second]");
  this.min = document.querySelector("[min]");
  this.hour = document.querySelector("[hour]");
  this.hands = [this.second, this.min, this.hour];
};

Clock.prototype.update = function () {
  this.setHand(this.setAnimation(timeToDeg(getTime())));
};

Clock.prototype.setHand = function (degs) {
  for (let i = 0; i < this.hands.length; i++) {
    this.hands[i].style.transform = `rotate(${degs[i]}deg)`;
  }
};

Clock.prototype.setAnimation = function (degs) {
  for (let i = 0; i < this.hands.length; i++) {
    if (degs[i] == 0) {
      this.hands[i].style.transition = "none";
    } else {
      this.hands[i].style.transition = `transform ${
        i == 0 || i == 1 ? 0.05 : 0.5
      }s cubic-bezier(0.9, 0.54, 0.26, 1.68)`;
    }
  }
  return degs;
};

Clock.prototype.clearEvent = function () {
  this.events.forEach((event) => {
    clearInterval(event);
  });
};

window.clock = new Clock()
clock.init()
