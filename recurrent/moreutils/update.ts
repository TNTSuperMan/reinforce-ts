import type { Mat } from "../class/mat";
import { loop } from "../optimize";

export type Net = Object & {
    [key: PropertyKey]: Mat
}

export function updateMat(m: Mat, alpha: number){
    loop(m.n * m.d, i => {
        if(m.dw[i] !== 0){
            m.w[i] += -alpha * m.dw[i];
            m.dw[i] = 0;
        }
    })
}

export function updateNet(net: Net, alpha: number){
    for(const p in net){
        if(net.hasOwnProperty(p)){
            updateMat(net[p], alpha)
        }
    }
}
