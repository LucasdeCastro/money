const TYPES = {
  SET_SALARY: "SET_SALARY"
};

export const setSalary = payload => ({ type: TYPES.SET_SALARY, payload });

const salary = (state = { value: 0 }, { type, payload }) => {
  switch (type) {
    case TYPES.SET_SALARY:
      return { value: payload };
    default:
      return state;
  }
};

export default salary;
