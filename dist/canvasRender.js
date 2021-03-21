import { Point } from './Point.js';
export class CanvasRender {
    constructor(strategy) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.corners = [];
        this.initStrategy = () => {
            document.getElementById('inputs').innerHTML = '';
            let points = 0;
            switch (this.strategy) {
                case 'circle':
                    points = 2;
                    break;
                case 'rectangle':
                    points = 4;
                    break;
                case 'triangle':
                    points = 3;
                    break;
            }
            this.removePoints();
            this.createPoints(points);
        };
        this.removePoints = () => {
            this.corners.forEach((el) => {
                el.removeListener();
            });
        };
        this.createPoints = (points) => {
            for (let i = 1; i <= points; i++) {
                this.corners.push(new Point(i, 0, 0, { maxX: this.width, maxY: this.height }));
            }
        };
        this.paint = () => {
            this.ctx.beginPath();
            if (this.strategy === 'circle') {
                let dist = this.calculateDistance(0, 1);
                this.ctx.arc(this.corners[0].x, this.corners[0].y, dist, 0, Math.PI * 2, true);
                this.calculatePerimeter(dist);
            }
            else {
                this.ctx.moveTo(this.corners[0].x, this.corners[0].y);
                for (let i = 1; i < this.corners.length; i++) {
                    this.ctx.lineTo(this.corners[i].x, this.corners[i].y);
                }
                this.ctx.lineTo(this.corners[0].x, this.corners[0].y);
                this.calculatePerimeter();
            }
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = "yellow";
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            this.calculateArea();
        };
        this.calculateArea = () => {
            let length = this.canvas.width * this.canvas.height;
            let data = new Int32Array(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer);
            for (var i = length, j = 0; i; i--)
                if (data[i] !== 0)
                    j++;
            document.querySelector('.area-result').innerText = '' + j;
        };
        this.calculatePerimeter = (radius) => {
            let value = 0;
            if (this.strategy === 'circle') {
                value = 2 * Math.PI * radius;
            }
            else {
                for (let i = 0; i < this.corners.length - 1; i++) {
                    this.calculateDistance(i, i + 1);
                    value += this.calculateDistance(i, i + 1);
                }
                value += this.calculateDistance(this.corners.length - 1, 0);
            }
            document.querySelector('.perimeter-result').innerText = '' + Math.round(value);
        };
        this.calculateDistance = (elem1, elem2) => {
            return Math.sqrt(Math.pow((this.corners[elem1].x - this.corners[elem2].x), 2) + Math.pow((this.corners[elem1].y - this.corners[elem2].y), 2));
        };
        this.clearArea = () => {
            this.removePoints();
            document.querySelector('.area-result').innerText = '0';
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        this.strategy = strategy;
        this.initStrategy();
    }
}
