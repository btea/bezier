<template>
    <div class="container">
        <div class="coordinate-plane" ref="box">
            <button class="control1 control" ref="one"></button>
            <button class="control2 control" ref="two"></button>
            <span class="start point"></span>
            <span class="end point"></span>
        </div>
        <Preview :points="propPoints" :blue="bluePoints" />
        <Library :points="propPoints" />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CreateCanvas from './utils/createCanvas';
import { bezierFun, titleIconSet } from './utils/fun';
import Preview from './Preview.vue';
import Library from './Library.vue';
export default defineComponent({
    components: {
        Preview,
        Library
    },
    setup() {
        let curve = new CreateCanvas({
            width: 300,
            height: 600,
            background: 'none',
            lineWidth: 7
        });
        curve.renderAxis();
        curve.renderLine([
            { x: 0, y: 450 },
            { x: 50, y: 350 },
            { x: 250, y: 250 },
            { x: 300, y: 150 }
        ]);

        const pointMove = (el: HTMLElement, point: { x: number; y: number }) => {
            Object.assign(el, {
                style: `left: ${point.x}px; top: ${point.y}px;`
            });
        };
        let isCanMove = false,
            activeEl: HTMLElement;
        const init = { one: { left: 50, top: 350, x: 80, y: 350 }, two: { left: 250, top: 250, x: 280, y: 250 } };
        const points = [
            { x: 0, y: 450 },
            { x: 50, y: 350 },
            { x: 250, y: 250 },
            { x: 300, y: 150 }
        ];
        const moveHandler = (el: HTMLElement) => {
            el.addEventListener('mousedown', (e: MouseEvent) => {
                isCanMove = true;
                activeEl = e.target as unknown as HTMLElement;
            });
        };
        const startMove = (e: MouseEvent) => {
            if (isCanMove) {
                let x, y, a, b, left, top, vx, vy;
                x = e.x;
                y = e.y;
                const el = one.value as unknown as HTMLElement;
                if (activeEl === el) {
                    a = x - init.one.x;
                    b = y - init.one.y;
                    left = init.one.left;
                    top = init.one.top;
                    vx = left + a;
                    vy = top + b;
                    if (vx <= 0) {
                        vx = 0;
                    }
                    if (vx >= 300) {
                        vx = 300;
                    }
                    points[1] = { x: vx, y: vy };
                } else {
                    a = x - init.two.x;
                    b = y - init.two.y;
                    left = init.two.left;
                    top = init.two.top;
                    vx = left + a;
                    vy = top + b;
                    if (vx <= 0) {
                        vx = 0;
                    }
                    if (vx >= 300) {
                        vx = 300;
                    }
                    points[2] = { x: vx, y: vy };
                }
                curve.ctx.clearRect(0, 0, curve.width, curve.height);
                curve.renderAxis();
                curve.renderLine(points);
                Object.assign(activeEl, {
                    style: `left: ${vx}px; top: ${vy}px`
                });
                let cubic = bezierFun(points[1], points[2]);
                titleIconSet(cubic);
                // timeFunction(red.el, points);
                // red.ctx.clearRect(0, 0, red.width, red.height);
                // red.renderLine(points.map(p => ({ x: p.x / 6 + 5, y: (p.y - 150) / 6 + 5 })));
            }
        };
        const endMove = () => {
            isCanMove = false;
        };
        const propPoints: Array<{ x: number; y: number }> = points;
        let bluePoints: Array<{ x: number; y: number }> = [
            { x: 10, y: 90 },
            { x: 25, y: 85 },
            { x: 25, y: 10 },
            { x: 90, y: 10 }
        ];

        const box = ref(null);
        const one = ref(null);
        const two = ref(null);
        onMounted(() => {
            if (box.value) {
                const el = box.value as unknown as HTMLElement;
                el.appendChild(curve.el as HTMLCanvasElement);
            }
            if (one.value) {
                const el = one.value as unknown as HTMLElement;
                pointMove(el, { x: 50, y: 350 });
                moveHandler(el);
            }
            if (two.value) {
                const el = two.value as unknown as HTMLElement;
                pointMove(el, { x: 250, y: 250 });
                moveHandler(el);
            }
        });

        return {
            box,
            one,
            two,
            propPoints,
            bluePoints
        };
    }
});
</script>
<style lang="less">
body {
    margin: 0;
    padding: 0;
}
.container {
    display: flex;
    /* .container coordinate-plane, .coordinate-plane section{} */
    canvas {
        margin: 0 10px;
        border-radius: 5px;
        cursor: pointer;
        /* transition: all 1.5s; */
    }
    canvas.active {
        background: #66ccff;
    }
    .coordinate-plane {
        margin: 0 30px;
        position: relative;
    }
    .coordinate-plane canvas {
        background: linear-gradient(
                    -45deg,
                    transparent 49%,
                    rgba(0, 0, 0, 0.1) 49%,
                    rgba(0, 0, 0, 0.1) 51%,
                    transparent 51%
                )
                center no-repeat,
            repeating-linear-gradient(white, white 20px, transparent 20px, transparent 40px) no-repeat,
            linear-gradient(transparent, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.06) 75%, transparent);
        background-size: 100% 50%, 100% 50%, auto;
        background-position: 25%, 0, 0;
        position: relative;
        margin: 0;
        cursor: initial;
    }
    .coordinate-plane .control {
        position: absolute;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1;
        border: none;
        margin-left: -7px;
        margin-top: -7px;
        outline: none;
    }
    .coordinate-plane .control1 {
        background: #f08;
    }
    .coordinate-plane .control2 {
        background: #0ab;
    }
    .coordinate-plane .point {
        position: absolute;
        border: 1px solid #999;
        background: #fff;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        z-index: 1;
    }
    .start {
        left: 0;
        margin-left: -7px;
        top: 443px;
    }
    .end {
        top: 150px;
        right: 0;
        margin-top: -7px;
        margin-right: -7px;
    }
}
</style>
