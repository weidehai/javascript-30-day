import './assets/css/index.scss'

document.querySelector(".gallery").addEventListener('click',e=>{
  // if(e.target.classList.contains('flexZoom')){
  //   e.target.classList.remove('flexZoom')
  //   e.target.classList.add('flexShrink')
  //   return
  // }
  // if(e.target.classList.contains('flexShrink')){
  //   e.target.classList.remove('flexShrink')
  //   e.target.classList.add('flexZoom')
  //   return
  // }
  // e.target.classList.add('flexZoom')
  e.target.classList.toggle('open')
})

