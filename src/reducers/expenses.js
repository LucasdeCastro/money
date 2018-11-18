const TYPES = {
  ADD_SPENT: "ADD_SPENT",
  PAID_SPENT: "PAID_SPENT",
  REMOVE_SPENT: "REMOVE_SPENT",
  UNPAID_SPENT: "UNPAID_SPENT",
  REHYDRATE: "persist/REHYDRATE"
};

const expenses = (state = [], { type, payload }) => {
  switch (type) {
    case TYPES.ADD_SPENT:
      return state.concat(payload);
    case TYPES.REHYDRATE:
      return payload;
    default:
      return state;
  }
};

export default expenses;
