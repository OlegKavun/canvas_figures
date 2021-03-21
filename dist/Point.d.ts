interface Coords {
    x: number;
    y: number;
}
interface Coord {
    axis: string;
    value: number;
}
interface CanvasRange {
    maxX: number;
    maxY: number;
}
export declare class Point {
    id: number;
    element?: HTMLElement | null;
    x: number;
    y: number;
    container: HTMLElement | null;
    xOut: HTMLSpanElement | null;
    yOut: HTMLSpanElement | null;
    dot: HTMLSpanElement | null;
    constructor(id: number, x: number, y: number, range: CanvasRange);
    getCoords: () => Coords;
    setCoord: (coord: Coord) => void;
    removeListener: () => void;
    onInput: (e: Event) => void;
    createDot: (id: number) => HTMLElement;
    moveDot: () => void;
    renderInput: (range: {
        maxX: number;
        maxY: number;
    }) => void;
}
export {};
