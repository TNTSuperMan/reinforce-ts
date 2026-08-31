import type { DQNAgent } from ".";
import { maxi, updateNet, type Mat } from "../../recurrent";

export function learnFromTuple(this: DQNAgent, s0: Mat, a0: number, r0: number, d1: Mat, a1: number) {
    const tmat = this.forwardQ(this.net, this.s1, false);
    const qmax = r0 + this.gamma * tmat.w[maxi(tmat.w)];

    const pred = this.forwardQ(this.net, s0, false);

    let tderror = pred.w[a0] - qmax;
    const clamp = this.tderror_clamp;
    if (Math.abs(tderror) > clamp) {
        if (tderror > clamp) tderror = clamp;
        if (tderror < -clamp) tderror = -clamp;
    }
    pred.dw[a0] = tderror;
    if (this.lastG) this.lastG.backward();

    updateNet(this.net, this.alpha);
    return tderror;
}
