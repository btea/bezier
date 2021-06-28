interface options {
    background?: string;
    color?: string;
    width?: number;
    height?: number;
    deviation?: number;
    line?: string;
    name?: string;
    lineWidth?: number;
}
type point = {
    x: number;
    y: number;
};
type points = point[];
export default class CreateCanvas {
    background: string;
    color: string;
    width: number;
    height: number;
    deviation: number;
    line: string;
    name: string;
    lineWidth: number;
    el?: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(options: options = {}) {
        this.background = options.background || '#e5e5e5';
        this.color = options.color || '#000';
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.deviation = options.deviation || 10;
        this.line = options.line || '#000';
        this.name = options.name || '';
        this.lineWidth = options.lineWidth || 1;
        this.ctx = CanvasRenderingContext2D.prototype;
        this.init();
    }
    init(): void {
        this.createCanvas();
    }
    createCanvas(): void {
        const el = document.createElement('canvas');
        let str = `width: ${this.width}px; height: ${this.height}px;`;
        if (this.background !== 'none') {
            str += `background: ${this.background};`;
        }
        // el.style = str;
        Object.assign(el, {
            style: str,
            width: this.width,
            height: this.height
        });
        const ctx = el.getContext('2d') as CanvasRenderingContext2D;
        this.el = el;
        this.ctx = ctx;
    }
    renderLine(points: points): void {
        /**
         * @params points Array
         * @params points[0] 起始点  points[1] 控制点1  points[2] 控制点2  points[3] 终点
         */
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth || 2;
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = this.line;
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.lineTo(points[1].x, points[1].y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.line;
        this.ctx.moveTo(points[2].x, points[2].y);
        this.ctx.lineTo(points[3].x, points[3].y);
        this.ctx.stroke();

        points.slice(1, -1).forEach(p => {
            this.renderCircle(p);
        });
    }
    renderAxis(): void {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        this.ctx.moveTo(0 + 0.5, 150 + 0.5);
        this.ctx.lineTo(0 + 0.5, 450 + 0.5);
        this.ctx.lineTo(300 + 0.5, 450 + 0.5);
        this.ctx.stroke();
    }
    renderCircle(points: point): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.line;
        this.ctx.arc(points.x, points.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
