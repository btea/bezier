<template>
    <section id="preview">
        <code>
            cubic-bezier(
            <span class="values">
                <span id="p1x" class="params" ref="ax"></span>, <span id="p1y" class="params" ref="ay"></span>,
                <span id="p2x" class="params" ref="bx"></span>,
                <span id="p2y" class="params" ref="by"></span>
            </span>
            )
        </code>
        <div class="operator" ref="operator">
            <h2>预览 & 比较</h2>
            <button class="start-play" ref="play" @click="startPlay">开始</button>
            <div class="time">
                <span class="name">过渡时间</span>
                <span class="bar" ref="bar" @click="setTime">
                    <span class="bar-content" ref="barContent"> </span>
                </span>
                <span class="desc-time" ref="timeEl"></span>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, unref } from 'vue';
import CreateCanvas from './utils/createCanvas';
import numConvert, { setElement } from './utils/fun';
import params from './utils/params';
type p = {
    x: number;
    y: number;
};
type val = string | number;
type El = HTMLElement | null
export default defineComponent({
    props: ['points', 'blue'],
    setup(props) {
        const points = props.points;
        const bluePoints = props.blue;
        const operator = ref<El>(null);
        const play = ref<El>(null);
        const bar = ref<El>(null);
        const barContent = ref<El>(null);
        const timeEl = ref<El>(null);
        const ax = ref<El>(null);
        const ay = ref<El>(null);
        const bx = ref<El>(null);
        const by = ref<El>(null);

        const red = new CreateCanvas({
            width: 60,
            height: 60,
            color: '#fff',
            line: '#fff',
            background: 'red'
        });
        params.redArea = red;
        if (red.el) {
            red.el.className = 'show';
            red.renderLine(points.map((p: p) => ({ x: p.x / 6 + 5, y: (p.y - 150) / 6 + 5 })));
        }
        const blue = new CreateCanvas({
            width: 60,
            height: 60,
            color: '#fff',
            line: '#fff',
            background: 'rgb(0, 170, 187)'
        });
        params.blueArea = blue;
        if (blue.el) {
            blue.el.className = 'show';
            blue.renderLine(bluePoints.map((p: p) => ({ x: p.x / (10 / 6), y: p.y / (10 / 6) })));
        }

        function bezierFun(one: p, two: p) {
            let a, b, c, d;
            a = numConvert(one.x / 300);
            b = numConvert((450 - one.y) / 300);
            c = numConvert(two.x / 300);
            d = numConvert((450 - two.y) / 300);
            codeValue(a, b, c, d);
            return `${a}, ${b}, ${c}, ${d}`;
        }

        function codeValue(a: val, b: val, c: val, d: val) {
            setElement(ax.value!, 'innerText', a);
            setElement(ay.value!, 'innerText', b);
            setElement(bx.value!, 'innerText', c);
            setElement(by.value!, 'innerText', d);
        }
        function curveFn(name: string) {
            if (blue.el) {
                Object.assign(blue.el, {
                    style: `transition-timing-function: ${name}; transition-duration: ${params.initTime}s;background: ${blue.background}`
                });
            }
        }
        const startPlay = () => {
            if (red.el) {
                red.el.classList.toggle('move');
            }
            if (blue.el) {
                blue.el.classList.toggle('move');
            }
        };
        function timeFunction(el: HTMLElement | undefined, points: Array<p>, c = 'red') {
            let bezier = bezierFun(points[1], points[2]);
            if (el) {
                Object.assign(el, {
                    style: `transition-timing-function: cubic-bezier(${bezier}); transition-duration: ${params.initTime}s;background: ${c}`
                });
            }
        }
        const setTime = (e: MouseEvent) => {
            const x = e.offsetX as number;
            let v: string | number = x / 150;
            v = v.toFixed(3);
            v = 100 * Number(v);
            setElement(barContent.value!, 'style', `width: ${v}%`);
            let initTime = (Math.floor(v) / 100) * 10 + '';
            if (/\./.test(initTime)) {
                initTime = Number(initTime).toFixed(1);
            }
            params.initTime = Number(initTime);
            setElement(timeEl.value!, 'innerText', `${initTime} 秒`);
            timeFunction(red.el, points);
            curveFn(params.activeLib);
        };
        onMounted(() => {
            const el = unref(operator);
            if (el) {
                const _el = el as HTMLElement;
                _el.appendChild(red.el as HTMLCanvasElement);
                _el.appendChild(blue.el as HTMLCanvasElement);
            }
            setElement(barContent.value!, 'style', 'width: 10%');
            setElement(timeEl.value!, 'innerText', `${params.initTime} 秒`);
            timeFunction(red.el, points);
            curveFn('ease');
        });
        return {
            operator,
            play,
            bar,
            barContent,
            timeEl,
            ax,
            ay,
            bx,
            by,
            startPlay,
            setTime
        };
    }
});
</script>

<style lang="less">
#preview {
    width: 350px;
    margin-right: 80px;
    code {
        font-size: 28px;
        white-space: nowrap;
        width: 400px;
        font-weight: bold;
    }
    .start-play {
        appearance: none;
        width: 60px;
        height: 25px;
        border: none;
        cursor: pointer;
        border-radius: 3px;
        background: #66ccff85;
        outline: none;
    }
    .start-play:hover {
        /* filter: brightness(1.5); */
        background: #66ccff;
    }
    #p1x,
    #p1y {
        color: red;
    }
    #p2x,
    #p2y {
        color: rgb(0, 170, 187);
    }
    #preview .operator h2 {
        width: 150px;
        display: inline-block;
    }
    .operator .time {
        font-size: 0;
    }
    .time > span {
        display: inline-block;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        vertical-align: middle;
        color: #000;
    }
    span.bar {
        height: 10px;
        width: 150px;
        border: 1px solid #000;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 10px;
        overflow: hidden;
        position: relative;
    }
    .bar-content {
        position: absolute;
        left: 0;
        top: 0;
        height: 10px;
        background: #6cf;
        border-radius: 5px;
    }
    .time-point {
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: aqua;
        margin-left: -5px;
        z-index: 2;
    }
    .operator canvas {
        display: block;
        position: relative;
        left: 0;
        margin: 15px 0;
    }
    .operator .move {
        left: 100%;
    }
}
</style>
