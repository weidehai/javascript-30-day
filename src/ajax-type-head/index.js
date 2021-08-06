import "./assets/css/index.scss";

let data = {};
function getData() {
  let url =
    "https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json";
  fetch(new Request(url))
    .then((res) => res.json())
    .then((json) => buildPoetList((data = json)));
}

function buildPoetList(data) {
  let fragment = document.createDocumentFragment();
  let ul = document.querySelector("ul");
  data.forEach((item) => {
    let li = document.createElement("li");
    let poet = document.createElement("span");
    poet.className = "poet";
    let author = document.createElement("span");
    author.className = "author";
    poet.innerHTML = item.detail_text;
    author.innerHTML = `${item.title}-${item.detail_author}`;
    li.append(poet, author);
    fragment.appendChild(li);
  });
  ul.innerHTML = "";
  ul.append(fragment);
}

function search(keyword) {
  let reg = new RegExp(keyword);
  let result = [];
  data.forEach((item) => {
    let _item = {};
    if (item.detail_text?.match(reg) || item.detail_author[0]?.match(reg) || item.title?.match(reg)) {
      _item.detail_text = item.detail_text?.replace(reg, `<span class="hl">${keyword}</span>`) ?? '';
      _item.detail_author = item.detail_author[0]?.replace(reg, `<span class="hl">${keyword}</span>`) ?? '';
      _item.title = item.title?.replace(reg, `<span class="hl">${keyword}</span>`) ?? '';
      result.push(_item)
    }
  });
  buildPoetList(result);
}

const inputElement = document.querySelector('input[type="text"]');
inputElement.addEventListener("input", (e) => {
  search(e.target.value);
});

getData();
