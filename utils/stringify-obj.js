module.exports = () => {
    const seen = new WeakSet();

    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return 0;
            }

            seen.add(value);
        }

        if (typeof value === 'function') {
            return value.toString();
        }

        // eslint-disable-next-line consistent-return
        return value;
    };
};
