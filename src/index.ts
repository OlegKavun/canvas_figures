import {CanvasRender} from "./CanvasRender.js"
let cvs: CanvasRender
let radios = document.querySelector('#figures-form')
console.dir(radios)
radios?.addEventListener('change', (e : Event) => {
    cvs?.clearArea()
    cvs = new CanvasRender((<HTMLInputElement>e.target).value)
})

let button = document.querySelector('.calculate')
button?.addEventListener('click', (e : Event) => {
    cvs.paint()
})

