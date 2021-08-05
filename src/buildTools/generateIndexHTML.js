const fs = require("fs/promises");
const path = require("path");

let indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>javascript-30-day</title>
</head>
<body>
  <nav>
    {{router}}
  </nav>
</body>
</html>`;

async function readFile() {
  try {
    let content = await fs.readFile(path.resolve(__dirname, "../../router.json"), {
      encoding: "utf-8",
    });
    content = JSON.parse(content);
    let html = generateHTML(buildRouter(content.router))
    writeFile(html)
  } catch (e) {
    console.log(e);
  }
}

function buildRouter(router){
  let result = []
  router.forEach(item=>{
    if(item.nav){
      result.push(`<a href="${item.href}" item>${item.label}</a>`)
    }
  })
  return result.join("")
}

function generateHTML(router){
  return indexHTML.replace(/\{\{router\}\}/g,router)
}

async function writeFile(html){
  let result = await fs.writeFile(path.resolve(__dirname,'../index.html'),html)
}

readFile();


