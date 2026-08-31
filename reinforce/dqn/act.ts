import type { DQNAgent } from ".";
import { Mat, maxi, randi } from "../../recurrent";

export function act(this: DQNAgent, slist: Float64Array) {
    const s = new Mat(this.ns, 1);
    s.setFrom(slist);

    if (Math.random() < this.epsilon) {
        var a = randi(0, this.na);
    } else {
        const amat = this.forwardQ(this.net, s, false);
        var a = maxi(amat.w);
    }

    this.s0 = this.s1;
    this.a0 = this.a1;
    this.s1 = s;
    this.a1 = a;

    return a;
}
