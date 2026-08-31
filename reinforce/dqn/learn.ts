import type { DQNAgent } from ".";
import { randi } from "../../recurrent";

export function learn(this: DQNAgent, r1: number) {
    if(this.r0 !== null && this.alpha > 0){
        this.tderror = this.learnFromTuple(this.s0, this.a0, this.r0, this.s1, this.a1);
        if(this.t % this.experience_add_every === 0){
            this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1, this.a1];
            this.expi++;
            if(this.expi > this.experience_size) this.expi = 0;
        }
        this.t++;

        for(let k = 0;k < this.learning_steps_per_iteration;k++){
            const e = this.exp[randi(0, this.exp.length)];
            this.learnFromTuple(...e);
        }
    }
    this.r0 = r1;
}
