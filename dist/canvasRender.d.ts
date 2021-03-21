import { Point } from './Point.js';
export declare class CanvasRender {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    height: number;
    width: number;
    strategy: string;
    corners: Array<Point>;
    constructor(strategy: string);
    initStrategy: () => void;
    removePoints: () => void;
    createPoints: (points: number) => void;
    paint: () => void;
    calculateArea: () => void;
    calculatePerimeter: (radius?: any) => void;
    calculateDistance: (elem1: number, elem2: number) => number;
    clearArea: () => void;
}
