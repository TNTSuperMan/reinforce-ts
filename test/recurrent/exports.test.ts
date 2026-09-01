import { expect, test } from "bun:test";

import Rjs from "../../coverage/recurrent.js";
import * as Rts from "../../recurrent/index.ts";

test.each(Object.keys(Rjs))("prop %s type equality", k => {
    expect(typeof Rts[k]).toBe(typeof Rjs[k]);
});
