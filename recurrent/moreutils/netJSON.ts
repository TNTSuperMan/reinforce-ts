import { Mat, type MatJSON } from "../class/mat";
import type { Net } from "./update";

export type NetJSON = {
    [key: PropertyKey]: MatJSON
}

export const netToJSON = (net: Net): NetJSON =>
    Object.fromEntries(
        Object.entries(net).map(e=>[e[0], e[1].toJSON()]));

export const netFromJSON = (j: NetJSON): Net =>
    Object.fromEntries(Object.entries(j).map(e=>{
        const mat = new Mat(1, 1);
        mat.fromJSON(e[1]);
        return [e[0], mat];
    }));
