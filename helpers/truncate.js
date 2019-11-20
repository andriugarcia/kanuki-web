export default (str, count) => {
    if (str.length < count) {
        return str;
    }
    else {
        return str.substring(0, count) + '...'
    }
}