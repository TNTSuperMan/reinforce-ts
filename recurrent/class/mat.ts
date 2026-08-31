import { assert } from "../utils/assert";
import { zeros } from "../utils/zeros";

export interface MatJSON{
    n: number;
    d: number;
    w: Float64Array;
}

export class Mat{
    n: number;
    d: number;
    w: Float64Array;
    dw: Float64Array;
    constructor(n: number, d: number){
        this.n = n;
        this.d = d;
        this.w = zeros(n * d);
        this.dw = zeros(n * d)
    }
    get(row: number, col: number){
        const ix = (this.d * row) + col;
        assert(ix >= 0 && ix < this.w.length);
        return this.w[ix];
    }
    set(row: number, col: number, v: number){
        const ix = (this.d * row) + col;
        assert(ix >= 0 && ix < this.w.length);
        this.w[ix] = v;
    }
    setFrom(arr: Float64Array){
        arr.forEach((e, i) => this.w[i] = e);
    }
    setColumn(m: Mat, i: number){
        m.w.forEach((e, q) => this.w[(this.d * q) + i] = e);
    }
    toJSON(): MatJSON{
        return {
            n: this.n,
            d: this.d,
            w: this.w
        };
    }
    fromJSON(json: MatJSON){
        this.n = json.n;
        this.d = json.d;
        this.w = new Float64Array(json.w);
        this.dw = zeros(this.n * this.d);
    }
}
