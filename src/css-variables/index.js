import "./assets/css/index.scss";

const parameter = {
  spacing: "10px",
  blur: "10px",
  base: "#89aea4",
};

function setParameter() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  updateParameter(this.name, this.value + suffix);
}

function init() {
  let control = document.querySelector("div[control]");
  control.addEventListener('change',(e)=>{
    if(!checkEvent(e)) return
    setParameter.call(e.target)
  })
  control.addEventListener('mousedown',(e)=>{
    control.onmousemove = function(e){
      e.stopPropagation()
      if(!checkEvent(e)) return
      setParameter.call(e.target)
    }
  })
  control.addEventListener('mouseup',(e)=>{
    control.onmousemove = null
  })
}

function updateParameter(name, value) {
  parameter[name] = value;
  document.querySelector(
    ".parameter"
  ).innerText = `img { padding: ${parameter["spacing"]}; filter: blur(${parameter["blur"]}); background: ${parameter["base"]}; }`;
}

function checkEvent(event){
  return event.target.localName==="input"
}

init();
