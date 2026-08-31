import type { Net } from "../moreutils/update";
import { Mat } from "./mat";
import { RandMat } from "./randmat";

export function initLSTM(input_size: number, hidden_sizes: number[], output_size: number): Net {
    // hidden size should be a list

    const model: Net = {};
    for(let d = 0; d < hidden_sizes.length; d++) { // loop over depths
        const prev_size = d === 0 ? input_size : hidden_sizes[d - 1];
        var hidden_size = hidden_sizes[d];

        // gates parameters
        model['Wix' + d] = RandMat(hidden_size, prev_size, 0, 0.08);
        model['Wih' + d] = RandMat(hidden_size, hidden_size, 0, 0.08);
        model['bi' + d] = new Mat(hidden_size, 1);
        model['Wfx' + d] = RandMat(hidden_size, prev_size, 0, 0.08);
        model['Wfh' + d] = RandMat(hidden_size, hidden_size, 0, 0.08);
        model['bf' + d] = new Mat(hidden_size, 1);
        model['Wox' + d] = RandMat(hidden_size, prev_size, 0, 0.08);
        model['Woh' + d] = RandMat(hidden_size, hidden_size, 0, 0.08);
        model['bo' + d] = new Mat(hidden_size, 1);
        // cell write params
        model['Wcx' + d] = RandMat(hidden_size, prev_size, 0, 0.08);
        model['Wch' + d] = RandMat(hidden_size, hidden_size, 0, 0.08);
        model['bc' + d] = new Mat(hidden_size, 1);
    }
    // decoder params
    model['Whd'] = RandMat(output_size, hidden_size, 0, 0.08);
    model['bd'] = new Mat(output_size, 1);
    return model;
}
