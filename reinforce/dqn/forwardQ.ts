import type { DQNAgent } from ".";
import { Graph, Mat, type Net } from "../../recurrent";

export function forwardQ(this: DQNAgent, net: Net, s: Mat, needs_backprop: boolean){
    const G = new Graph(needs_backprop);
    const a1mat = G.add(G.mul(net.W1, s), net.b1);
    const h1mat = G.tanh(a1mat);
    const a2mat = G.add(G.mul(net.W2, s), net.b1);
    this.lastG = G;
    return a2mat;
}
