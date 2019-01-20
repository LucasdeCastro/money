import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: center;
`;

export const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 500px) {
    width: ${({ full = false }) => (full ? "100%" : "auto")};
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TitleValues = RowContainer.extend`
  flex: 2;
  display: flex;

  @media only screen and (max-width: 500px) {
    flex-direction: row;
    font-size: 13px;
  }
`;

export const TitleContainer = Main.extend`
  width: 100%;
  position: fixed;
  top: -0px;
  background: #fff;
  border: 0px;
  left: 0px;
  padding: 0px 28px;
  box-sizing: border-box;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);

  h3 {
    flex: 1;
    margin: 0px;
    display: flex;
    align-items: center;
  }

  button {
    margin-left: 10px;
  }
`;

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  max-width: 1000px;
  background: #fff;
  margin: 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  min-height: 450px;

  @media only screen and (max-width: 500px) {
    margin: 0px;
    padding: 15px;
  }
`;

export const List = styled.div``;

export const Spent = styled.div`
  display: flex;
  width: 100%;
  min-height: 45px;
  padding: 0px 10px;
  align-items: center;
  box-sizing: border-box;
  border-bottom 1px solid #eee;
  color: ${props => (props.negative ? "#1a73e8" : "#444")};

  div:first-child{
    opacity: ${({ disable }) => (disable ? 0.5 : 1)};
  }
  
  div:last-child button:first-child{
    opacity: ${({ disable }) => (disable ? 0.5 : 1)};
  }

  @media only screen and (max-width: 500px) {
    padding: 5px;
    align-items: flex-start;
    flex-direction: column;

    div {
      margin: 5px 0px;
    }
  } 
`;

export const SpentContainer = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
`;

export const AddForm = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;

  h2 {
    padding: 0px;
    font-size: 20px;
  }

  button {
    max-width: 130px;
  }
`;

export const Select = styled.select`
  padding: 5px;
  height: 33px;
  border-radius: 5px;
  margin-top: 4px;
  border: 1px solid #eee;
  background: #fff;
`;

export const InputLabel = styled.label`
  margin-top: 10px;
`;

export const Input = styled.input`
  height: 28px;
  margin-top: 4px;
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px solid #eee;
`;
export const Button = styled.button`
  display: flex;
  margin: ${({ withoutMargin }) => (withoutMargin ? "0px" : "10px 0px")};
  background: ${({ secondary }) =>
    secondary ? "transparent" : "rgba(25,115,232,0.12)"};
  height: 30px;
  color: #1a73e8;
  padding: 0px 5px;
  font-size: 15px;
  border-radius: 7px;
  border: ${({ secondary }) => (secondary ? "1px solid #CCC" : "none")};
  min-width: 40px;
  cursor: pointer;
  justify-content: center;

  ${props =>
    props.icon &&
    `
      border: 0px;
      color: #CCC:
      font-size: 13px;
      min-width: 30px;
      background: transparent;
    `}

  :hover {
    background: ${({ secondary }) =>
    secondary ? "rgba(244, 244, 244, 0.4)" : "rgba(25,115,232,0.09)"};
  }
`;

export const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  color: #444;
  padding: 5px 10px;
  background: #fff;
  min-height: 30px;

  @media only screen and (max-width: 500px) {
    align-items: flex-start;
    flex-direction: column;

    div {
      padding: 0px;
      margin: 5px 0px;
    }
  }
`;

export const TitleText = styled.h2`
  flex: 1;
  font-weight: 600;
  padding: 0px;
  margin: 5px;
  font-size: 20px;
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 40px;
  padding: 0px 10px;
  align-items: center;
  animation: fade-in 1s;
  box-sizing: border-box;
  flex-direction: column;
`;

export const GroupContainer = ListContainer.extend`
  background: #fff;
  box-shadow: 0px 0px 3px #eee;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  margin: 20px 0px;
  width: 800px;
  max-width: 100%;

  @media only screen and (max-width: 500px) {
    margin: 10px;
  }
`;

export const SpentName = styled.div`
  flex: ${({ size = 1 }) => `${size}`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: ${({ mobile = false }) => (mobile ? "none" : "flex")};
  @media only screen and (max-width: 500px) {
    display: ${({ mobile }) =>
    mobile || mobile === undefined ? "flex" : "none"};

    b {
      width: 100%;
      text-align: ${props => (props.start ? "left" : "center")};
    }
  }
`;

export const SpentValue = styled.div`
  flex: 1;
  display: ${({ mobile = false }) => (mobile ? "none" : "flex")};

  @media only screen and (max-width: 500px) {
    flex: none;
    display: ${({ mobile }) =>
    mobile || mobile === undefined ? "flex" : "none"};
    text-align: ${({ right }) => (right ? "right" : "left")};
  }
`;

export const SpentButtons = styled.div`
  flex: 1;
  display: flex;
  min-height: 34px;
  justify-content: flex-end;

  cursor: ${({ isGroup }) => (isGroup ? "point" : "default")};

  :hover {
    button {
      display: block;
    }
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    display: flex;
  }
`;

export const Values = styled.div`
  flex: ${({ isGroup }) => (isGroup ? 5 : 1)};
  display: flex;
  text-align: left;
  padding: 0px 10px;
  align-items: center;
  justify-content: center;
  color: ${({ blue, negative, noColor }) => {
    if (noColor) return "#444";
    return blue ? "#1a73e8" : negative ? "red" : "#14e214";
  }};
`;

export const ButtonGreen = styled(Button)`
  color: #14e214;
  background: rgba(107, 227, 59, 0.12);

  :hover {
    background: ${({ secondary }) =>
    secondary
      ? "rgba(244, 244, 244, 0.4)"
      : "background: rgba(107, 227, 59, 0.9)"};
  }
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

export const TimelineTitle = styled.div`
  flex: 1;
  padding: 5px;
  color: #212529;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  border-bottom: 1px solid #eee;
  background: #eee;
`;

export const TimelineValue = TimelineTitle.extend`
  font-weight: normal;
`;

export const TimelineContainer = ColumnContainer.extend`
  display: flex;
  flex-direction: row;
  margin-bottom: 0px;
  overflow: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 0px -10px;
  width: calc(100% + 20px);

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TimelineItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 70px;
`;
