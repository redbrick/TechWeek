module.exports = {
  splitTitle (title) {
    const middle = Math.floor(title.length / 2);
    const s1 = title.substr(0, middle);
    const s2 = title.substr(middle);
    return `${s1}</span>${s2}`;
  },
};
