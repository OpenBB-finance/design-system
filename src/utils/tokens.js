/** @deprecated never used */
function getDesignTokens(obj) {
  const keys = Object.keys(obj["color"]);
  const colors = {};
  keys.forEach((key) => {
    const colorKeys = Object.keys(obj["color"][key]);
    colorKeys.forEach((cKey) => {
      if (cKey === "base") {
        colors[key] = obj["color"][key]["base"]["value"];
      } else {
        colors[`${key}-${cKey}`] = obj["color"][key][cKey]["value"];
      }
    });
  });
  console.log(colors);
}
