import type { DQNAgent, DQNEnv, DQNOptions } from ".";
import { getopt } from "../utils/getopt";

export function initDQN(this: DQNAgent, env: DQNEnv, opt?: DQNOptions){
    this.gamma = getopt(opt, "gamma", 0.75);
    this.epsilon = getopt(opt, "epsilon", 0.1);
    this.alpha = getopt(opt, "alpha", 0.01);

    this.experience_add_every = getopt(opt, "experience_add_every", 25);
    this.experience_size = getopt(opt, "experience_size", 5000);
    this.learning_steps_per_iteration = getopt(opt, "learning_steps_per_iteration", 10);
    this.tderror_clamp = getopt(opt, "tderror_clamp", 1);

    this.num_hidden_units = getopt(opt, "num_hidden_units", 100);

    this.env = env;
}
