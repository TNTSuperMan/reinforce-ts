import { randn } from "../utils/rand";
import { Mat } from "./mat";

function fillRandn(m: Mat, mu: number, std: number) {
    for (const i of m.w.keys()) {
        m.w[i] = randn(mu, std)
    }
}

export function RandMat(n: number, d: number, mu: number, std: number)　{
    const m = new Mat(n, d);
    fillRandn(m, mu, std);
    return m;
}
