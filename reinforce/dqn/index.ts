import { Mat, type Graph, type Net } from "../../recurrent";
import { act } from "./act";
import { forwardQ } from "./forwardQ";
import { initDQN } from "./init";
import { fromJSON, toJSON } from "./json";
import { learn } from "./learn";
import { learnFromTuple } from "./learnFromTuple";
import { resetDQN } from "./reset";

export interface DQNOptions{
    gamma: number;
    epsilon: number;
    alpha: number;
    experience_add_every: number;
    experience_size: number;
    learning_steps_per_iteration: number;
    tderror_clamp: number;
    num_hidden_units: number
}
export interface DQNEnv{
    getNumStates(): number;
    getMaxNumActions(): number;
}

export class DQNAgent{
    
    gamma: number;
    epsilon: number;
    alpha: number;
    experience_add_every: number;
    experience_size: number;
    learning_steps_per_iteration: number;
    tderror_clamp: number;
    num_hidden_units: number;

    env: DQNEnv;

    nh: number;
    ns: number;
    na: number;
    net: Net;

    exp: [Mat, number, number, Mat, number][];
    expi: number;
    t: number;

    r0: number | null;
    s0: Mat | null;
    s1: Mat | null;
    a0: number | null;
    a1: number | null;

    tderror: number;

    lastG: Graph | void;

    constructor(env: DQNEnv, opt?: Partial<DQNOptions>){
        initDQN.call(this, env, opt);
        this.reset();
    }

    reset = resetDQN;
    toJSON = toJSON;
    fromJSON = fromJSON;
    forwardQ = forwardQ;
    act = act;
    learn = learn;
    learnFromTuple = learnFromTuple;
}
