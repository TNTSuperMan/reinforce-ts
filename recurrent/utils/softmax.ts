import { Mat } from "../class/mat";

export function softmax(m: Mat){
    const out = new Mat(m.n, m.d); // probability volume
    const maxval = m.w.reduce((p, v)=> v > p ? v : p, 0);

    const s = m.w.reduce((p, v, i)=>{
        out.w[i] = Math.exp(v - maxval);
        return p + out.w[i];
    });

    for (const [i, e] of m.w.entries()) {
        m.w[i] = e / s;
    }
    return out;
}
