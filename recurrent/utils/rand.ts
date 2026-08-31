let return_v = false;
let v_val = 0.0;
function gaussRandom(): number {
    if (return_v) {
        return_v = false;
        return v_val;
    }
    let u = 2*Math.random()-1;
    let v = 2*Math.random()-1;
    let r = u*u + v*v;
    if(r == 0 || r > 1) return gaussRandom();
    let c = Math.sqrt(-2*Math.log(r)/r);
    v_val = v * c; // cache this
    return_v = true;
    return u*c;
}

export const randf = (a: number, b: number) => Math.random() * (b - a) + a;
export const randi = (a: number, b: number) => Math.floor(randf(a, b));
export const randn = (mu: number, std: number) => mu + gaussRandom() * std;
