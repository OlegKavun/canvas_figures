interface Coords {
    x: number,
    y: number
}

interface Coord {
    axis: string,
    value: number
}

interface CanvasRange {
    maxX: number,
    maxY: number
}

export class Point {
    public id: number
    public element? : HTMLElement | null
    public x: number
    public y: number
    public container : HTMLElement | null = document.getElementById('inputs')
    public xOut: HTMLSpanElement | null
    public yOut: HTMLSpanElement | null
    public dot: HTMLSpanElement | null

    constructor(id : number, x : number, y : number, range : CanvasRange) {
        this.id = id
        this.x = x
        this.y = y
        this.renderInput(range)
        this.xOut = document.querySelector(`#point${this.id} .out-x`)
        this.yOut = document.querySelector(`#point${this.id} .out-y`)
        this.dot = this.createDot(id)
    }

    getCoords = () : Coords => {
        return {
            x: this.x,
            y: this.y
        }
    }

    setCoord = (coord: Coord) => {
        if (coord.axis == 'x') {
            this.x = coord.value
        } else {
            this.y = coord.value
        }
        (<HTMLSpanElement>this.xOut).innerText = ''+this.x;
        (<HTMLSpanElement>this.yOut).innerText = ''+this.y;
    }

    removeListener = () : void => {
        this.element?.removeEventListener('input', this.onInput)
        this.dot?.remove()
    }

    onInput = (e: Event): void => {
        let axis : string = (<HTMLInputElement>e.target).name
        let value : number = +(<HTMLInputElement>e.target).value

        this.setCoord({axis,value}) 
        this.moveDot()
    }

    createDot = (id: number): HTMLElement => {
        let dot : HTMLElement = document.createElement("div")
        dot.innerHTML = `${this.id}`
        dot.classList.add("dot")
        dot.setAttribute('id', `dot${id}`);

        (<HTMLDivElement>document.querySelector(`.canvas-wrap`)).appendChild(dot)

        return dot
    }

    moveDot = (): void => {
        (<any>this.dot).style.left = `${this.x}px`;
        (<any>this.dot).style.top = `${this.y}px`;
    }

    renderInput = (
        range: {
            maxX: number, 
            maxY: number
        }) : void => {
        let point : HTMLElement = document.createElement("div")
        point.innerHTML = `
        <div class="point-header">
            Point ${this.id}: (<span class="out-x">${this.x}</span>;<span class="out-y">${this.y}</span>)
        </div>
        X: <input type="range" name="x" value=0 min=0 max=${range.maxX}><br>
        Y: <input type="range" name="y" value=0 min=0 max=${range.maxY}>
        `
        point.classList.add("point")
        point.setAttribute('id', `point${this.id}`)

        this.container?.appendChild(point)

        this.element = document.getElementById(`point${this.id}`)
        this.element?.addEventListener('input', this.onInput)
    }
}