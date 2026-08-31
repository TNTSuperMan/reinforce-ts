import { randf } from "./rand";

export function samplei (w: Float64Array) {
    const r = randf(0, 1);
    let x = 0.0;
    let i = 0;
    while (true) {
        x += w[i] ?? 0;
        if (x > r) return i;
        i++;
    }
}
