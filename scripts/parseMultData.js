const parseMultData = (data) => {
  const subj = [];
  const n = Object.prototype.toString.call(data) === "[object Array]";
  if (n) {
    for (let d of data) {
      if (Object.keys(d).length !== 0) {
        subj.push(d.value);
      }
    }
    return subj;
  } else {
    return [data.value];
  }
};

module.exports = parseMultData;
