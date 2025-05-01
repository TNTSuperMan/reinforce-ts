import { expect, test } from "bun:test";

import o_R from "../../coverage/recurrent.js";
import * as m_R from "../../recurrent/index.ts";

const o_K = Object.keys(o_R);
const m_K = Object.keys(m_R);

test("props length equality", ()=>
    expect(m_K.length).toBe(o_K.length)
);

test("props key equality", ()=>
    expect(m_R).toContainAllKeys(o_K)
);

test("props be functions", ()=>
    m_K.forEach(e =>expect(m_R[e]).toBeFunction())
);

test("props functions length equality", ()=>
    m_K.forEach(e=>expect(m_R[e].length).toBe(o_R[e].length))
);
