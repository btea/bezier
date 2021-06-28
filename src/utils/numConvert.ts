export default function numConver(n: number): number {
    if (!Number(n)) return 0;
    let _s: string = String(n);
    if (!/\./.test(_s)) return n;
    _s = n.toFixed(2);
    if (/0$/.test(_s)) return +_s.slice(0, -1);
    return n;
}
