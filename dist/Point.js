export class Point {
    constructor(id, x, y, range) {
        this.container = document.getElementById('inputs');
        this.getCoords = () => {
            return {
                x: this.x,
                y: this.y
            };
        };
        this.setCoord = (coord) => {
            if (coord.axis == 'x') {
                this.x = coord.value;
            }
            else {
                this.y = coord.value;
            }
            this.xOut.innerText = '' + this.x;
            this.yOut.innerText = '' + this.y;
        };
        this.removeListener = () => {
            var _a, _b;
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this.onInput);
            (_b = this.dot) === null || _b === void 0 ? void 0 : _b.remove();
        };
        this.onInput = (e) => {
            let axis = e.target.name;
            let value = +e.target.value;
            this.setCoord({ axis, value });
            this.moveDot();
        };
        this.createDot = (id) => {
            let dot = document.createElement("div");
            dot.innerHTML = `${this.id}`;
            dot.classList.add("dot");
            dot.setAttribute('id', `dot${id}`);
            document.querySelector(`.canvas-wrap`).appendChild(dot);
            return dot;
        };
        this.moveDot = () => {
            this.dot.style.left = `${this.x}px`;
            this.dot.style.top = `${this.y}px`;
        };
        this.renderInput = (range) => {
            var _a, _b;
            let point = document.createElement("div");
            point.innerHTML = `
        <div class="point-header">
            Point ${this.id}: (<span class="out-x">${this.x}</span>;<span class="out-y">${this.y}</span>)
        </div>
        X: <input type="range" name="x" value=0 min=0 max=${range.maxX}><br>
        Y: <input type="range" name="y" value=0 min=0 max=${range.maxY}>
        `;
            point.classList.add("point");
            point.setAttribute('id', `point${this.id}`);
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(point);
            this.element = document.getElementById(`point${this.id}`);
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.addEventListener('input', this.onInput);
        };
        this.id = id;
        this.x = x;
        this.y = y;
        this.renderInput(range);
        this.xOut = document.querySelector(`#point${this.id} .out-x`);
        this.yOut = document.querySelector(`#point${this.id} .out-y`);
        this.dot = this.createDot(id);
    }
}
