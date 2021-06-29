import CreateCanvas from './createCanvas';
interface params {
    initTime: number;
    redArea: CreateCanvas;
    activeLib: string;
    blueArea: CreateCanvas;
}
const params: params = {
    initTime: 1,
    redArea: new CreateCanvas(),
    activeLib: 'ease',
    blueArea: new CreateCanvas()
};
export default params;
