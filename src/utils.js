import { sort } from "./reducers/expenses";

export const numberToReal = number => {
  if (!number) return "R$ 0,00";
  const value = parseFloat(number)
    .toFixed(2)
    .toString()
    .replace(/\./, ",");

  return ` R$ ${value}`;
};

export const MONTH_LIST = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez"
];

export const sumlist = (list, start = 0) =>
  list.reduce((acc, { value: vl }) => acc + vl, start);

export const sumNegative = (list, start = 0) =>
  list.reduce(
    (acc, { value: vl }) => (vl < 0 ? acc + Math.abs(vl) : acc),
    start
  );

export const rifle = (list, value) =>
  list.reduce((acc, { value: vl }) => acc - vl, value);

export const filterGroup = list =>
  list.filter(({ name }) => name.split("-").length <= 1);

export const reduceGroup = (acc, item) => {
  const name = item.name.split("-");

  if (name.length > 1) {
    const key = name[0].toUpperCase().trim();
    if (acc[key]) acc[key].push(item);
    else acc[key] = [item];
  }
  return acc;
};

export const getGroup = topay => {
  const map = topay.reduce(reduceGroup, {});
  const list = Object.entries(map);
  return list.map(([name, values]) => {
    return [name, values.sort(sort)];
  });
};

export const formatDate = time => {
  const date = new Date(time);
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  const hour = date
    .getHours()
    .toString()
    .padStart(2, "0");

  const minute = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${day}/${month} ${hour}:${minute}`;
};

export const getMonthName = (times = 0, parcel = 0) => {
  if (!times) return "";
  const month = new Date().getMonth() + (times - parcel);
  return MONTH_LIST[month];
};
