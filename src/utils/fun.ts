export default function numConvert(n: number): number {
    if (!Number(n)) return 0;
    let _s = String(n);
    if (!/\./.test(_s)) return n;
    _s = n.toFixed(2);
    if (/0$/.test(_s)) return +_s.slice(0, -1);
    return n;
}
type p = {
    x: number;
    y: number;
};
export function bezierFun(one: p, two: p): string {
    const a: number = numConvert(one.x / 300);
    const b = numConvert((450 - one.y) / 300);
    const c = numConvert(two.x / 300);
    const d = numConvert((450 - two.y) / 300);
    return `${a}, ${b}, ${c}, ${d}`;
}

export function titleIconSet(title: string): void {
    title = `cubic-bezier(${title})`;
    // let icon = red.el.toDataURL('image/png');
    const icon = '';
    const img = document.createElement('img');
    img.src = icon;
    const titleEl = document.getElementsByTagName('title')[0];
    let iconEl = document.getElementsByTagName('link')[0];
    if (!iconEl) {
        iconEl = document.createElement('link');
        iconEl.rel = 'icon';
        iconEl.type = 'image/png';
        document.head.appendChild(iconEl);
    }
    titleEl.innerText = title;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 60;
        canvas.height = 60;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.beginPath();
        ctx.fillStyle = '#6cf';
        ctx.rect(0, 0, 60, 60);
        ctx.fill();
        ctx.drawImage(img, 5, 5, 50, 50);
        iconEl.href = canvas.toDataURL('image/png');
    };
}
