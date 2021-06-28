<template>
    <section id="library"></section>
</template>
<style lang="less" scoped>
#library {
    margin: 50px;
    .library-item {
        display: inline-block;
        position: relative;
        margin: 25px 0;
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
