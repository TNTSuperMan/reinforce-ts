import { Mat } from "../class/mat";
import type { Net } from "./update";

export const copyMat = (b: Mat): Mat => {
    const a = new Mat(b.n, b.d);
    a.setFrom(b.w);
    return a;
}

export const copyNet = (net: Net): Net =>
    Object.fromEntries(
        Object.entries(net).map(e=>
            [e[0], copyMat(e[1])]
        )
    );
