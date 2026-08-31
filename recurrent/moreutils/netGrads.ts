import { Mat } from "../class/mat";
import type { Net } from "./update";

const gradFillConst = (m: Mat, c: number) => {
    for (const i of m.dw.keys()) {
        m.dw[i] = c;
    }
}

export function netZeroGrads(net: Net) {
    for (const p in net) {
        if (net.hasOwnProperty(p)) {
            gradFillConst(net[p], 0);
        }
    }
}

export function netFlattenGrads(net: Net) {
    let n = 0;
    for (const p in net) {
        if (net.hasOwnProperty(p)) {
            n += net[p].dw.length;
        }
    }
    const g = new Mat(n, 1);
    let ix = 0;
    for (const p in net) {
        if (net.hasOwnProperty(p)) {
            const mat = net[p];
            for (const d of mat.dw) {
                g.w[ix] = d;
                ix++;
            }
        }
    }
    return g;
}
