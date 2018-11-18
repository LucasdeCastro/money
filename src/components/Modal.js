import React from "react";
import {
  Title,
  RowContainer,
  ModalContainer,
  ModalContent,
  ModalCloseButton
} from "./index";
import { connect } from "react-redux";
import { Button, FieldGroup } from "../components";
import { withState, compose } from "recompose";

const enhancer = compose(
  connect(state => state),
  withState("showModal", "setShowModal", false)
);

const Modal = ({
  label,
  title,
  children,
  onSubmit,
  showModal,
  setShowModal
}) => (
  <div>
    <FieldGroup>
      <Button
        type={"button"}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {label}
      </Button>
    </FieldGroup>
    {showModal && (
      <ModalContainer>
        <ModalContent>
          <RowContainer style={{ alignItems: "center" }}>
            <Title>{title}</Title>
            <ModalCloseButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              &times;
            </ModalCloseButton>
          </RowContainer>

          {React.cloneElement(children, {
            onSubmit: (...props) => {
              setShowModal(false);
              onSubmit(...props);
            }
          })}
        </ModalContent>
      </ModalContainer>
    )}
  </div>
);

export default enhancer(Modal);
