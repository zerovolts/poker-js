const capitalize = text => {
  return text
    .toLowerCase()
    .split("_")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

module.exports = {
  capitalize
};
