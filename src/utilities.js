const capitalize = text => {
  return text
    .toLowerCase()
    .split("_")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

// [1, 1, 2, 3, 3, 3, 4] => [[3, 3, 3], [1, 1], [4], [2]]
const groupDuplicates = list => {
  // group duplicate elements in sequence
  const groups = list.reduce((acc, cur) => {
    const initGroups = acc.slice(0, -1);
    const lastGroup =
      acc.slice(-1).length < 1 ? acc.slice(-1) : acc.slice(-1)[0];

    return lastGroup[0] === cur
      ? [...initGroups, [...lastGroup, cur]]
      : [...acc, [cur]];
  }, []);

  // sort groups first by length, then by value of first element
  return groups.sort((a, b) => {
    if (a.length === b.length) {
      return b[0] - a[0];
    }
    return b.length - a.length;
  });
};

const compareLists = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

module.exports = {
  capitalize,
  groupDuplicates,
  compareLists
};
