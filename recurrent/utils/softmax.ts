import { Mat } from "../class/mat";

export function softmax(m: Mat){
    const out = new Mat(m.n, m.d); // probability volume
    const maxval = m.w.reduce((p,v)=>v > p ? v : p, 0);

    const s = m.w.reduce((p,v,i)=>{
        out.w[i] = Math.exp(v - maxval);
        return p + out.w[i];
    });

    m.w.forEach((e,i)=>m.w[i] = e / s);
    return out;
}
