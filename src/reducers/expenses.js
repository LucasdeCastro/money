const TYPES = {
  ADD_SPENT: "ADD_SPENT",
  PAID_SPENT: "PAID_SPENT",
  REMOVE_SPENT: "REMOVE_SPENT",
  UNPAID_SPENT: "UNPAID_SPENT",
  REHYDRATE: "persist/REHYDRATE"
};

const getFirstDayOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth());
};

const getDateZeroHour = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const add = payload => ({ type: TYPES.ADD_SPENT, payload });
export const unPaid = payload => ({ type: TYPES.UNPAID_SPENT, payload });
export const paid = payload => ({ type: TYPES.PAID_SPENT, payload });
export const remove = payload => ({ type: TYPES.REMOVE_SPENT, payload });

const removeExpense = (list, payload) =>
  list.filter(
    ({ name, value }) => name !== payload.name && value !== payload.value
  );

export const sort = (a, b) => {
  if (a.times && a.times !== 0) return -1;

  if (a.value > b.value) return -1;
  if (a.value === b.value) return 0;
  return 1;
};

const updateExpenses = state => {
  const { paid, topay } = state.paid.reduce(
    (acc, spent) => {
      if (
        spent.type === "month" &&
        spent.lastUpdate <= getFirstDayOfMonth() &&
        !spent.times
      ) {
        return { ...acc, topay: acc.topay.concat(spent) };
      }
      if (spent.type === "day" && spent.lastUpdate <= getDateZeroHour()) {
        return { ...acc, topay: acc.topay.concat(spent) };
      }
      return { ...acc, paid: acc.paid.concat(spent) };
    },
    { topay: [], paid: [] }
  );

  return {
    ...state,
    topay: state.topay.concat(topay),
    paid: paid.sort(sort)
  };
};

const getParcel = ({ parcel, times }) => {
  if (times === undefined) return null;
  if (parcel < times) return (parcel || 0) + 1;
  return parcel;
};

const checkParcel = (list, payload) => {
  if (payload.times) {
    const intTimes = parseInt(payload.times, 10);
    if (intTimes === payload.parcel) return list;
  }
  return list.concat(payload);
};

const expenses = (state = { topay: [], paid: [] }, { payload, type }) => {
  switch (type) {
  case TYPES.ADD_SPENT:
    return {
      ...state,
      topay: state.topay.concat({
        ...payload,
        parcel: payload.times !== undefined && (payload.parcel || 0)
      })
    };
  case TYPES.REMOVE_SPENT:
    return {
      ...state,
      paid: removeExpense(state.paid, payload),
      topay: removeExpense(state.topay, payload)
    };
  case TYPES.UNPAID_SPENT:
    return {
      ...state,
      topay: checkParcel(state.topay, payload),
      paid: removeExpense(state.paid, payload)
    };
  case TYPES.PAID_SPENT:
    return {
      ...state,
      paid: state.paid.concat({
        ...payload,
        parcel: getParcel(payload)
      }),
      topay: removeExpense(state.topay, payload)
    };
  case TYPES.REHYDRATE:
    return updateExpenses((payload && payload.expenses) || state);
  default:
    return state;
  }
};

export default expenses;
