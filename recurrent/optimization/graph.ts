import { loop } from "../optimize";
import { assert } from "../utils/assert";
import { Mat } from "../class/mat";

const sig = (x = -0) => 1 / (1 + Math.exp(-x));

export class Graph {
    needs_backprop: boolean;
    backprop: Function[];
    constructor(needs_backprop = true) {
        this.needs_backprop = needs_backprop;
        this.backprop = [];
    }
    backward() {
        for (const e of this.backprop.toReversed()) {
            e();
        }
    }
    rowPluck(m: Mat, ix: number): Mat {
        assert(ix >= 0 && ix < m.n);
        const { d } = m;
        const out = new Mat(d, 1);
        loop(d, i => out.w[i] = m.w[d * ix + i] ?? 0)
        if(this.needs_backprop) {
            this.backprop.push(() => loop(d, i => m.dw[d * ix + i] += (m.dw[d * ix + i] ?? 0)));
        }
        return out;
    }
    tanh(m: Mat): Mat {
        const out = new Mat(m.n, m.d);
        const len = m.w.length;
        loop(len, i => out.w[i] = Math.tanh(m.w[i]));
        if (this.needs_backprop) {
            this.backprop.push(() => loop(len, i => m.dw[i] += (1.0 - out.w[i] ** 2) * out.dw[i]));
        }
        return out;
    }
    sigmoid(m: Mat): Mat {
        const out = new Mat(m.n, m.d);
        const len = m.w.length;
        loop(len, i => out.w[i] = sig(m.w[i]));
        if (this.needs_backprop) {
            this.backprop.push(() => loop(len, i => {
                const mwi = out.w[i];
                m.dw[i] += mwi * (1 - mwi) * out.dw[i];
            }));
        }
        return out;
    }
    relu(m: Mat): Mat {
        const out = new Mat(m.n, m.d);
        const len = m.w.length;
        loop(len, i => out.w[i] = Math.max(0, m.w[i]));
        if (this.needs_backprop) {
            this.backprop.push(() => loop(len, i => m.dw[i] += m.w[i] > 0 ? out.dw[i] : 0));
        }
        return out;
    }
    mul(m1: Mat, m2: Mat): Mat {
        assert(m1.d === m2.n, "matmul dimensions misaligned");
        const { n } = m1;
        const { d } = m2;
        const out = new Mat(n, d);
        loop(n, i => loop(d, j => {
            let dot = 0;
            loop(m1.d, k => dot += m1.w[m1.d * i + k] * m2.w[d * k + j]);
            out.w[d * i + j] = dot;
        }));
        if (this.needs_backprop) {
            this.backprop.push(() =>
                loop(n, i => loop(d, j => loop(m1.d, k => {
                    const b = out.dw[d * i + j];
                    m1.dw[m1.d * i + k] += m2.w[d * k + j] * b;
                    m2.dw[d * k + j] += m1.w[m1.d * i + k] * b;
                })))
            );
        }
        return out;
    }
    add(m1: Mat, m2: Mat): Mat {
        assert(m1.w.length === m2.w.length);
        const out = new Mat(m1.n, m1.d);
        loop(m1.w.length, i => out.w[i] = m1.w[i] + m2.w[i]);
        if(this.needs_backprop) {
            this.backprop.push(() => loop(m1.w.length, i => {
                m1.dw[i] += out.dw[i];
                m2.dw[i] += out.dw[i];
            }));
        }
        return out;
    }
    dot(m1: Mat, m2: Mat): Mat{
        assert(m1.w.length === m2.w.length);
        const out = new Mat(1, 1);
        let dot = 0;
        loop(m1.w.length, i => dot += m1.w[i] * m2.w[i]);
        out.w[0] = dot;
        if(this.needs_backprop) {
            this.backprop.push(() => loop(m1.w.length, i => {
                m1.dw[i] += m2.w[i] * out.dw[0];
                m2.dw[i] += m1.w[i] * out.dw[0];
            }));
        }
        return out;
    }
    eltmul(m1: Mat, m2: Mat): Mat {
        assert(m1.w.length === m2.w.length);
        const out = new Mat(m1.n, m1.d);
        loop(m1.w.length, i => out.w[i] = m1.w[i] * m2.w[i]);
        if (this.needs_backprop) {
            this.backprop.push(() => loop(m1.w.length, i => {
                m1.dw[i] += m2.w[i] * out.dw[i];
                m2.dw[i] += m1.w[i] * out.dw[i];
            }));
        }
        return out;
    }
}
