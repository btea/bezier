import CreateCanvas from './createCanvas';
interface params {
    initTime: number;
    redArea: CreateCanvas;
    activeLib: string;
}
const params: params = {
    initTime: 1,
    redArea: new CreateCanvas(),
    activeLib: 'ease'
};
export default params;
