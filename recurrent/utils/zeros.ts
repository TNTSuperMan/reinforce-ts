export const zeros = (n: number): number[] | Float64Array => {
    if (typeof n === "undefined" || isNaN(n)) return [];
    if (typeof ArrayBuffer === "undefined") {
        return Array(n).fill(0);
    }
    return new Float64Array(n);
}
