export const getopt = <T extends object, K extends keyof T>(
    opt: T | void,
    field_name: K,
    default_value: T[K]
) => (
    opt
        ? opt[field_name] ?? default_value
        : default_value
);
