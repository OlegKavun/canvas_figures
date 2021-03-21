import {Point} from './Point.js'

export class CanvasRender {
    public canvas = document.getElementById('canvas') as
HTMLCanvasElement;
    public ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    public height : number = this.canvas.height;
    public width : number = this.canvas.width;
    public strategy: string
    public corners : Array<Point> = []

    constructor(strategy: string) {
        this.strategy = strategy
        this.initStrategy()
    }

    initStrategy = (): void => {
        (<HTMLDivElement>document.getElementById('inputs')).innerHTML = ''
        let points: number = 0
        switch (this.strategy){
            case 'circle': 
                points = 2
            break
            case 'rectangle':
                points = 4
            break
            case 'triangle':
                points = 3
            break
        }
        
        this.removePoints()
        this.createPoints(points)
    }

    removePoints = (): void => {
        this.corners.forEach( (el:Point): void => {
            el.removeListener()
        })
    }

    createPoints = (points: number): void => {
        for(let i = 1; i <= points; i++ ) {
            this.corners.push(new Point(i, 0, 0, {maxX:this.width, maxY:this.height}))
        }
    }

    paint = (): void => {
        this.ctx.beginPath()

        if (this.strategy === 'circle') {
            let dist: number = this.calculateDistance(0, 1)
            this.ctx.arc(this.corners[0].x, this.corners[0].y, dist, 0,Math.PI*2, true)
            this.calculatePerimeter(dist)
        } else {
            this.ctx.moveTo(this.corners[0].x, this.corners[0].y)

            for (let i = 1; i < this.corners.length; i++) {
                this.ctx.lineTo(this.corners[i].x, this.corners[i].y)
            }

            this.ctx.lineTo(this.corners[0].x, this.corners[0].y)
            this.calculatePerimeter()
        }

        this.ctx.lineWidth = 2
        this.ctx.fillStyle = "yellow"
        this.ctx.closePath()
        this.ctx.fill();
        this.ctx.stroke()
        this.calculateArea()
    }

    calculateArea = (): void => {
        let length: number = this.canvas.width * this.canvas.height
        let data: Int32Array = new Int32Array( this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height).data.buffer)

        for(var i = length, j = 0; i; i--) if(data[i] !== 0) j++
        (<HTMLSpanElement>document.querySelector('.area-result')).innerText = '' + j
    }

    calculatePerimeter = (radius?: any): void => {
        let value: number | string = 0

        if (this.strategy === 'circle') {
            value = 2*Math.PI*radius
        } else {
            for(let i = 0; i < this.corners.length-1; i++) {
                this.calculateDistance(i, i+1)
                value += this.calculateDistance(i, i+1)
            }
            
            value += this.calculateDistance(this.corners.length-1, 0)
        }

        (<HTMLSpanElement>document.querySelector('.perimeter-result')).innerText = '' + Math.round(value)
    }

    calculateDistance = (elem1: number, elem2: number): number => {
        return Math.sqrt( Math.pow((this.corners[elem1].x-this.corners[elem2].x), 2) + Math.pow((this.corners[elem1].y-this.corners[elem2].y), 2))
    }

    clearArea = (): void => {
        this.removePoints();
        (<HTMLSpanElement>document.querySelector('.area-result')).innerText = '0'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
