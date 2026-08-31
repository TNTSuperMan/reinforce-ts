export const loop = (n: number, cb: (n: number) => void) => {
    for (let i = 0; i < n; i++) {
        cb(n);
    }
}
