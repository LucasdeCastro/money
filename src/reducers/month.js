const TYPES = {
  NEXT: "next",
  PREV: "prev"
};

const getMonth = (data = new Date()) =>
  `${data.getMonth()}-${data.getFullYear()}`;

const MonthReducer = (month = getMonth(), { type }) => {
  const [current, year] = month.split("-").map(value => parseInt(value, 10));
  const data = new Date(year, current, 1);
  switch (type) {
    case TYPES.NEXT:
      data.setMonth(data.getMonth() + 1);
      return getMonth();
    case TYPES.PREV:
      data.setMonth(data.getMonth() - 1);
      return getMonth();
    default:
      return month;
  }
};

export default MonthReducer;
