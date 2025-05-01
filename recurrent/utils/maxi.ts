export function maxi(w: Float64Array){
    return w.reduce((p,c,i)=>c > (w[p] ?? 0) ? i : p, 0);
}
