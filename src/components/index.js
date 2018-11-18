import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: center;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TitleContainer = RowContainer.extend`
  line-height: 50px;
  border-bottom: 1px solid #eee;

  h3 {
    flex: 1;
    margin: 0px;
  }

  button {
    margin-left: 10px;
  }
`;

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  border: 1px solid #eee;
  max-width: 700px;
  background: #fff;
  margin: 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  @media only screen and (max-width: 500px) {
    margin: 10px;
  }
`;

export const List = styled.div``;

export const Spent = styled.div`
  display: flex;
  min-height: 45px;
  border-bottom 1px solid #eee;
  align-items: center;
  padding: 0px 10px;

  color: ${props => (props.negative ? "#1a73e8" : "#444")}

  @media only screen and (max-width: 500px) {
    padding: 5px;
    align-items: flex-start;
    flex-direction: column;

    div {
      margin: 5px 0px;
    }
  } 
`;

export const AddForm = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  padding: 5px;
  height: 33px;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 4px;
  border: 1px solid #eee;
  background: #fff;
`;

export const Input = styled.input`
  height: 28px;
  font-size: 14px;
  margin-top: 4px;
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px solid #eee;
`;

export const Button = styled.button`
  color: #fff;
  border: none;
  height: 30px;
  margin: 10px 0px;
  min-width: 75px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  background: #1a73e8;

  :hover {
    background-color: rgba(25, 115, 232, 0.9);
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #444;
  padding: 10px;
  border-radius 2px;
  background #EEE;
  margin: 10px 0px;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;

    div {
      padding: 0px;
      margin: 10px 0px;
    }
  }
`;

export const TitleText = styled.div`
  flex: 1;
  font-weight: 600;
`;

export const ListContainer = styled.div`
  animation: fade-in 1s;
`;

export const SpentName = styled.div`
  flex: 1;
`;

export const SpentValue = styled.div`
  flex: 1;
`;

export const SpentButtons = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0px 5px;
  }
`;

export const Values = styled.div`
  flex: 1;
  text-align: left;
  padding: 0px 10px;
  color: ${props => (props.negative ? "red" : "#444")};
`;

export const ButtonGreen = styled(Button)`
  background: #14e214;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  margin-top: 200px;
  width: 25px;
  height: 13px;
  border-radius: 2px;
  background-color: #1a73e8;
  align-self: center;
  margin-left: -75px;
  animation: loading 2s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
`;

export const Error = styled.label`
  color: red;
  padding: 10px 0px;
`;

export const FieldGroup = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
`;
