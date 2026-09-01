import { describe, expect, test } from "bun:test";
import o_R from "../../coverage/recurrent.js";
import * as m_R from "../../recurrent/index.ts";

const nums = (n: number) => Array(n).fill(0).map((_,i)=>i);

test("new initialized equality", ()=>{
    const oMat = new o_R.Mat(10, 10);
    const mMat = new m_R.Mat(10, 10);
    expect(mMat).toEqual(oMat);
});

describe("RandMat etc", () => {
    const oMat = o_R.RandMat(10, 10, 0, 10);
    const mMat = m_R.copyMat(oMat);
    test("initialized", () => {
        expect(mMat).toEqual(oMat);
    });
    test("get", () => {
        nums(10).forEach(r => nums(10).forEach(c =>
            expect(mMat.get(r, c))
                .toEqual(oMat.get(r, c))
        ));
    });
    test("set", () => {
        nums(10).forEach(r => nums(10).forEach(c => {
            const value = Math.random() * 10;
            mMat.set(r, c, value)
            oMat.set(r, c, value)
            expect(mMat).toEqual(oMat);
        }));
    });
    test("setFrom", () => {
        const data = new Float64Array(nums(100).map(() => Math.random()));
        mMat.setFrom(data);
        oMat.setFrom(data);
        expect(mMat).toEqual(oMat);
    });
    test("json", () => {
        expect(mMat.toJSON()).toEqual(oMat.toJSON());
    });
});
