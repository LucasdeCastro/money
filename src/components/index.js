import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: center;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  @media only screen and (max-width: 500px) {
    width: ${({ full = false }) => (full ? "100%" : "auto")};
  }
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
  max-width: 950px;
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
  min-height: 45px;
  border-bottom 1px solid #eee;
  align-items: center;
  padding: 0px 10px;
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
  flex-direction: column;
`;

export const Select = styled.select`
  padding: 5px;
  height: 33px;
  border-radius: 5px;
  margin-top: 4px;
  border: 1px solid #eee;
  background: #fff;
`;

export const Input = styled.input`
  height: 28px;
  margin-top: 4px;
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px solid #eee;
`;
export const Button = styled.button`
  margin: ${({ withoutMargin }) => (withoutMargin ? "0px" : "10px 0px")};
  background: ${({ secondary }) =>
    secondary ? "transparent" : "rgba(25,115,232,0.12)"};
  height: 30px;
  color: #1a73e8;
  font-size: 15px;
  border-radius: 7px;
  border: ${({ secondary }) => (secondary ? "1px solid #CCC" : "none")};
  max-width: 120px;
  min-width: 75px;
  cursor: pointer;

  :hover {
    background: ${({ secondary }) =>
      secondary ? "rgba(244, 244, 244, 0.4)" : "rgba(25,115,232,0.09)"};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  color: #444;
  padding: 5px 10px;
  background ${({ isGroup }) => (isGroup ? "transpatent" : "#EEE")};
  border: 2px solid #EEE;
  border-radius: 4px;
  margin: 10px 0px;
  min-height: 30px;

  @media only screen and (max-width: 500px) {
    flex-direction: ${({ isGroup }) => (isGroup ? "row" : "column")};
    align-items: ${({ isGroup }) => (isGroup ? "center" : "flex-start")};;

    div {
      padding: 0px;
      margin: 5px 0px;
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
      text-align: center;
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
  justify-content: flex-end;

  button {
    margin: 0px 5px;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    display: flex;
  }
`;

export const Values = styled.div`
  flex: ${({ isGroup }) => (isGroup ? 5 : 1)};
  text-align: left;
  padding: 0px 10px;
  color: ${props => (props.blue ? "#1a73e8" : props.negative ? "red" : "#444")};
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
