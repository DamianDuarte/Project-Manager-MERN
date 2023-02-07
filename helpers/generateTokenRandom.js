module.exports = () => {
    const random = Math.random().toString(36).substring(2, 15);
    const date = Date.now().toString(36);

    return random + date;
}
