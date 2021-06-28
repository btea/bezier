<template>
    <section id="preview">
        <code>
            cubic-bezier(
            <span class="values">
                <span id="p1x" class="params"></span>, <span id="p1y" class="params"></span>,
                <span id="p2x" class="params"></span>,
                <span id="p2y" class="params"></span>
            </span>
            )
        </code>
        <div class="operator">
            <h2>预览 & 比较</h2>
            <button class="start-play">开始</button>
            <div class="time">
                <span class="name">过渡时间</span>
                <span class="bar">
                    <span class="bar-content"> </span>
                </span>
                <span class="desc-time"></span>
            </div>
        </div>
    </section>
</template>
<style lang="less" scoped>
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
