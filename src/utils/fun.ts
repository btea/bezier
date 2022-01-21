import { Ref, unref } from 'vue';
import params from './params';

export default function numConvert(n: number): number | string {
    if (!Number(n)) return 0;
    let _s = String(n);
    if (!/\./.test(_s)) return n;
    _s = n.toFixed(2);
    if (/0$/.test(_s)) return +_s.slice(0, -1);
    return _s;
}
type p = {
    x: number;
    y: number;
};
type val = string | number;
export function bezierFun(one: p, two: p): string {
    const a = numConvert(one.x / 300);
    const b = numConvert((450 - one.y) / 300);
    const c = numConvert(two.x / 300);
    const d = numConvert((450 - two.y) / 300);
    codeValue(a, b, c, d);
    return `${a}, ${b}, ${c}, ${d}`;
}
function findEle(sel: string) {
    return document.querySelector(sel);
}
function codeValue(a: val, b: val, c: val, d: val) {
    const ax = findEle('#p1x') as HTMLElement;
    const ay = findEle('#p1y') as HTMLElement;
    const bx = findEle('#p2x') as HTMLElement;
    const by = findEle('#p2y') as HTMLElement;
    setElement(ax, 'innerText', a);
    setElement(ay, 'innerText', b);
    setElement(bx, 'innerText', c);
    setElement(by, 'innerText', d);
}

export function titleIconSet(title: string): void {
    title = `cubic-bezier(${title})`;
    const red = params.redArea;
    let icon = '';
    if (red.el) {
        icon = red.el.toDataURL('image/png');
    }
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

export function setElement(val: Ref<HTMLElement> | HTMLElement, attr: string, v: string | number): void {
    const _val = unref(val);
    if (_val) {
        const el = _val as HTMLElement;
        const obj = {};
        Object.defineProperty(obj, attr, {
            value: v,
            enumerable: true
        });
        /**
         * 注：enumerable没有设置值为true的时候，默认为false，此时，obj[attr]能获取到对应的属性值，
         * 但是Object.assign时，此时obj相当于{}, JSON.stringify(obj) => "{}"
         * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
         * Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象
         */
        Object.assign(el, obj);
    }
}
