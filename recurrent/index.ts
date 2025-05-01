export { assert } from "./utils/assert";
export { zeros } from "./utils/zeros";
export { maxi } from "./utils/maxi";
export { samplei } from "./utils/samplei";
export { randi, randn } from "./utils/rand";
export { softmax } from "./utils/softmax";

export { Mat } from "./class/mat";
export { RandMat } from "./class/randmat";
export { forwardLSTM } from "./class/forwardLSTM";
export { initLSTM } from "./class/initLSTM";

export { updateMat, updateNet } from "./moreutils/update";
export { copyMat, copyNet } from "./moreutils/copy";
export { netToJSON, netFromJSON } from "./moreutils/netJSON";
export { netZeroGrads, netFlattenGrads } from "./moreutils/netGrads";

export { Solver } from "./optimization/solver";
export { Graph } from "./optimization/graph";

export type { Net } from "./moreutils/update";
export type { NetJSON } from "./moreutils/netJSON";
