import { CanvasRender } from "./CanvasRender.js";
let cvs;
let radios = document.querySelector('#figures-form');
console.dir(radios);
radios === null || radios === void 0 ? void 0 : radios.addEventListener('change', (e) => {
    cvs === null || cvs === void 0 ? void 0 : cvs.clearArea();
    cvs = new CanvasRender(e.target.value);
});
let button = document.querySelector('.calculate');
button === null || button === void 0 ? void 0 : button.addEventListener('click', (e) => {
    cvs.paint();
});
