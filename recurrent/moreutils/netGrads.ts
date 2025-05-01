import { Mat } from "../class/mat";
import { loop } from "../optimize";
import type { Net } from "./update";

const gradFillConst = (m: Mat, c: number) =>
    loop(m.dw.length, i => m.dw[i] = c);

export function netZeroGrads(net: Net){
    for(const p in net)
        if(net.hasOwnProperty(p))
            gradFillConst(net[p], 0);
}

export function netFlattenGrads(net: Net){
    let n = 0;
    for(const p in net)
        if(net.hasOwnProperty(p))
            n += net[p].dw.length;
    const g = new Mat(n, 1);
    let ix = 0;
    for(const p in net)
        if(net.hasOwnProperty(p)){
            const mat = net[p];
            loop(mat.dw.length, i => {
                g.w[ix] = mat.dw[i];
                ix++;
            })
        }
    return g;
}
