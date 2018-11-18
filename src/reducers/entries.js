const TYPES = {
  ADD_ENTRY: "ADD_ENTRY",
  REMOVE_ENTRY: "REMOVE_ENTRY"
};

export const setEntry = payload => ({ type: TYPES.ADD_ENTRY, payload });

const entries = (state = [], { type, payload }) => {
  switch (type) {
    case TYPES.ADD_ENTRY:
      return state.concat(payload);
    case TYPES.REMOVE_ENTRY:
      return state.filter(item => item.name === payload);
    default:
      return state;
  }
};

export default entries;
