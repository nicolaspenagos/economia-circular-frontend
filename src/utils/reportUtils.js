export function convertNumberString(str) {
  const num = Number(str);

  if (Number.isInteger(num)) {
    return Math.trunc(num);
  } else if (!isNaN(num)) {
    return num.toFixed(1);
  } else {
    return str;
  }
}
