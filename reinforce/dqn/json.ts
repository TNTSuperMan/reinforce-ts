import type { DQNAgent } from ".";
import { netFromJSON, netToJSON, type NetJSON } from "../../recurrent";

interface DQNJSON {
    nh: number;
    ns: number;
    na: number;
    net: NetJSON;
}

export function toJSON(this: DQNAgent): DQNJSON {
    return {
        nh: this.nh,
        ns: this.ns,
        na: this.na,
        net: netToJSON(this.net)
    };
}

export function fromJSON(this: DQNAgent, j: DQNJSON) {
    this.nh = j.nh;
    this.ns = j.ns;
    this.na = j.na;
    this.net = netFromJSON(j.net);
}
