const rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};
const token = function () {
    return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
};

const uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}

export { token, uniqueId };