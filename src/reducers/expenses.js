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

const removeExpense = (list, payload) => {
  return list.filter(
    ({ name, value }) => name !== payload.name && value !== payload.value
  );
};

const sort = (a, b) => (a.value > b.value ? -1 : a.value === b.value ? 0 : 1);

const updateExpenses = state => {
  const { paid, topay } = state.paid.reduce(
    (acc, spent) => {
      if (spent.type === "month" && spent.lastUpdate <= getFirstDayOfMonth())
        return { ...acc, topay: acc.topay.concat(spent) };
      if (spent.type === "day" && spent.lastUpdate <= getDateZeroHour())
        return { ...acc, topay: acc.topay.concat(spent) };
      return { ...acc, paid: acc.paid.concat(spent) };
    },
    { topay: [], paid: [] }
  );

  return {
    ...state,
    topay: state.topay.concat(topay).sort(sort),
    paid: paid.sort(sort)
  };
};

const expenses = (state = { topay: [], paid: [] }, { payload, type }) => {
  switch (type) {
    case TYPES.ADD_SPENT:
      return { ...state, topay: state.topay.concat(payload).sort(sort) };
    case TYPES.REMOVE_SPENT:
      return {
        ...state,
        paid: removeExpense(state.paid, payload),
        topay: removeExpense(state.topay, payload)
      };
    case TYPES.UNPAID_SPENT:
      return {
        ...state,
        topay: state.topay.concat(payload).sort(sort),
        paid: removeExpense(state.paid, payload)
      };
    case TYPES.PAID_SPENT:
      return {
        ...state,
        paid: state.paid.concat(payload).sort(sort),
        topay: removeExpense(state.topay, payload)
      };
    case TYPES.REHYDRATE:
      return updateExpenses((payload && payload.expenses) || state);
    default:
      return state;
  }
};

export default expenses;
