<template>
    <section id="library">
        <div
            ref="libEl"
            :class="['library-item', { active: lib.name === activeFun }]"
            v-for="(lib, i) in libs"
            :key="i"
            :data-name="lib.name"
            @click="selectLibrary(lib, i)"
        ></div>
    </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import CreateCanvas from './utils/createCanvas';
import params from './utils/params';
type library = {
    points: Array<{ x: number; y: number }>;
    options: {
        name?: string;
        background?: string;
        line?: string;
        color?: string;
    };
    el?: CreateCanvas;
    name?: string;
};
export default defineComponent({
    setup() {
        let libs = reactive<Array<library>>([]);
        libs = Array.from('0'.repeat(5), () => {
            let points = new Array(4);
            points[0] = { x: 10, y: 90 };
            points[3] = { x: 90, y: 10 };
            return {
                options: {},
                points
            };
        });
        let control = [
            [25, 85, 25, 10],
            [10, 90, 90, 10],
            [40, 90, 90, 10],
            [10, 90, 60, 10],
            [40, 90, 60, 10]
        ];
        let names = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];
        let activeFun = ref('ease');
        let activeNum = 0;
        let libEl = ref(null);
        control.forEach((element, i) => {
            libs[i].options.name = names[i];
            libs[i].options.background = 'none';
            libs[i].points[1] = { x: element[0], y: element[1] };
            libs[i].points[2] = { x: element[2], y: element[3] };
        });
        libs[0].options = {
            background: 'none',
            color: '#fff',
            line: '#fff'
        };
        libs.map((el, i) => {
            el.name = names[i];
        });

        const selectLibrary = (lib: library, i: number) => {
            if (activeNum === i) {
                return;
            }
            const el = libs[activeNum];
            removeActive(el);
            const _el = libs[i];
            addActive(_el);
            activeFun.value = lib.name as string;
            curveFn(activeFun.value);
            activeNum = i;
            params.activeLib = lib.name as string;
        };
        // 右侧取消当前选中活跃样式
        const removeActive = (ins: library) => {
            const el = ins.el as CreateCanvas;
            el.ctx.clearRect(0, 0, el.width, el.height);
            el.color = el.line = '#000';
            el.renderLine(ins.points);
        };
        // 右侧渲染选中样式
        const addActive = (ins: library) => {
            const el = ins.el as CreateCanvas;
            el.ctx.clearRect(0, 0, el.width, el.height);
            el.color = el.line = '#fff';
            el.renderLine(ins.points);

            params.blueArea.ctx.clearRect(0, 0, params.blueArea.width, params.blueArea.height);
            params.blueArea.renderLine(ins.points.map(p => ({ x: p.x / (10 / 6), y: p.y / (10 / 6) })));
        };

        function curveFn(name: string) {
            if (params.blueArea.el) {
                Object.assign(params.blueArea.el, {
                    style: `transition-timing-function: ${name}; transition-duration: ${params.initTime}s;background: ${params.blueArea.background}`
                });
            }
        }

        onMounted(() => {
            const els = document.querySelectorAll('.library-item');
            libs.map((el, i) => {
                const ele = new CreateCanvas(el.options);
                const canvas = ele.el as HTMLCanvasElement;
                ele.renderLine(el.points);
                els[i].appendChild(canvas);
                el.el = ele;
            });
        });

        return {
            libs,
            activeFun,
            libEl,
            selectLibrary
        };
    }
});
</script>

<style lang="less" scoped>
#library {
    margin: 50px;
    .library-item {
        display: inline-block;
        position: relative;
        margin: 25px 0;
        cursor: pointer;
        &::after {
            content: attr(data-name);
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            text-align: center;
        }
    }
    canvas {
        background: rgb(229, 229, 229);
    }
    .active {
        background: rgb(0, 170, 187);
    }
}
</style>
