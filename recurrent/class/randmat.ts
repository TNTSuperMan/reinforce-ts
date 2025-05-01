import { randn } from "../utils/rand";
import { Mat } from "./mat";

function fillRandn(m: Mat, mu: number, std: number){
    m.w.forEach((_, i) => m.w[i] = randn(mu, std));
}

export function RandMat(n: number, d: number, mu: number, std: number){
    const m = new Mat(n, d);
    fillRandn(m, mu, std);
    return m;
}
