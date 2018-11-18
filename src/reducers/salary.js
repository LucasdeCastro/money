const TYPES = {
  ADD_SALARY: "ADD_SALARY",
  REMOVE_SALARY: "REMOVE_SALARY"
};

export const setSalary = payload => ({ type: TYPES.ADD_SALARY, payload });

const salary = (state = [], { type, payload }) => {
  switch (type) {
    case TYPES.ADD_SALARY:
      return state.concat(payload);
    case TYPES.REMOVE_SALARY:
      return state.filter(item => item.name === payload);
    default:
      return state;
  }
};

export default salary;
