import type { DQNAgent } from ".";
import { Mat, RandMat } from "../../recurrent";

export function resetDQN(this: DQNAgent){
    this.nh = this.num_hidden_units;
    this.ns = this.env.getNumStates();
    this.na = this.env.getMaxNumActions();

    this.net = {};
    this.net.W1 = RandMat(this.nh, this.ns, 0, 0.01);
    this.net.b1 = new Mat(this.nh, 1);
    this.net.W2 = RandMat(this.na, this.nh, 0, 0.01);
    this.net.b2 = new Mat(this.na, 1);

    this.exp = [];
    this.expi = 0;

    this.t = 0;


    this.r0 = null;
    this.s0 = null;
    this.s1 = null;
    this.a0 = null;
    this.a1 = null;

    this.tderror = 0;
}
