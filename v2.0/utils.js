const getSignContent = (data) => {
    let s = '';
    Object.keys(data).sort().forEach((k) => {
        if (typeof data[k] === 'undefined' || data[k] === null || data[k] === '') {
            return;
        }
        s += s ? `&${k}=${data[k]}` : `${k}=${data[k]}`;
    })
    return s;
};

module.exports = {
    getSignContent,
}
