import { loop } from "../optimize";
import { assert } from "../utils/assert";
import { Mat } from "./mat";

const sig = (x: number | undefined) => 1 / (1 + Math.exp(x === undefined ? 0 : -x));

export class Graph{
    needs_backprop: boolean;
    backprop: Function[];
    constructor(needs_backprop?: boolean){
        if(typeof needs_backprop == "undefined")
            needs_backprop = true;
        this.needs_backprop = needs_backprop;
        this.backprop = [];
    }
    backward(){
        this.backprop.findLast(e=>(e(), false));
    }
    rowPluck(m: Mat, ix: number){
        assert(ix >= 0 && ix < m.n);
        const { d } = m;
        const out = new Mat(d, 1);
        for(let i = 0;i < d; i++)
            out.w[i] = m.w[d * ix + i] ?? 0;
        if(this.needs_backprop)
            this.backprop.push(() => loop(d, i=>
                m.dw[d * ix + i] += (m.dw[d * ix + i] ?? 0)
            ));
        return out;
    }
    tanh(m: Mat){
        const out = new Mat(m.n, m.d);
        const len = m.w.length;
        loop(len, i => out.w[i] = Math.tanh(m.w[i]));
        if(this.needs_backprop)
            this.backprop.push(()=>loop(len, i=>
                m.dw[i] += (1.0 - out.w[i]**2) * out.dw[i]
            ))
        return out;
    }
    sigmoid(m: Mat){
        const out = new Mat(m.n, m.d);
        const len = m.w.length;
        loop(len, i => out.w[i] = sig(m.w[i]));
        if(this.needs_backprop)
            this.backprop.push(()=>loop(len, i=>{
                const mwi = out.w[i];
                m.dw[i] += mwi * (1 - mwi) * out.dw[i];
            }))
        return out;
    }
    relu(m: Mat){
        const out = new Mat(m.n, m.d);
        const len = m.w.length;
        loop(len, i => out.w[i] = Math.max(0, m.w[i]));
        if(this.needs_backprop)
            this.backprop.push(()=>loop(len, i =>
                m.dw[i] += m.w[i] > 0 ? out.dw[i] : 0
            ));
        return out;
    }
    mul(m1: Mat, m2: Mat){
        assert(m1.d === m2.n, "matmul dimensions misaligned");
        const { n } = m1;
        const { d } = m2;
        const out = new Mat(n, d);
        
    }
}
