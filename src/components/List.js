import React from "react";
import { connect } from "react-redux";
import { compose, branch, renderComponent, withProps } from "recompose";
import { ListContainer, Loading } from "./index";
import { paid, remove, unPaid } from "../reducers/expenses";
import { rifle, sumlist, getGroup, filterGroup, sumNegative } from "../utils";
import SpentCard from "./SpentCard";
import SpentTitle from "./SpentTitle";

const List = ({
  paid,
  topay,
  _topay,
  groupToPay,
  paidBalance,
  pendentTotal,
  pendentBalance,
  paidTotal,
  removeConnect,
  paidConnect,
  unPaidConnect,
  negativeTotal
}) => (
  <ListContainer>
    <SpentTitle
      key={"topay"}
      values={_topay}
      name={"Pendentes"}
      total={pendentTotal}
      balance={pendentBalance}
      negativeTotal={negativeTotal}
    />

    {topay.map((spent, key) => (
      <SpentCard
        spent={spent}
        key={`${key}-topay`}
        paidClick={paidConnect}
        removeClick={removeConnect}
      />
    ))}

    {groupToPay.map(([name, values]) => (
      <ListContainer key={`group-${name}`}>
        <SpentTitle
          isGroup
          key={name}
          name={name}
          values={values}
          background={"#F6F8FA"}
          paidClick={paidConnect}
          total={sumlist(values)}
        />

        {values.map((spent, key) => (
          <SpentCard
            isGroup
            spent={{ ...spent, name: spent.name.split("-")[1] }}
            key={`${key}--group`}
            paidClick={paidConnect}
            removeClick={removeConnect}
          />
        ))}
      </ListContainer>
    ))}

    <SpentTitle
      unPaid
      key={"paid"}
      values={paid}
      name={"Pagos"}
      total={paidTotal}
      balance={paidBalance}
      unPaidClick={unPaidConnect}
    />

    {paid.map((spent, key) => (
      <SpentCard
        paid={true}
        spent={spent}
        key={`${key}-paid`}
        unPaidClick={unPaidConnect}
        removeClick={removeConnect}
      />
    ))}
  </ListContainer>
);

const enhancer = compose(
  connect(
    ({ expenses: { topay, ...expenses }, salary, firebase }) => ({
      ...expenses,
      _topay: topay,
      topay: filterGroup(topay),
      groupToPay: getGroup(topay),
      firebase,
      salary: salary.value
    }),
    { paidConnect: paid, removeConnect: remove, unPaidConnect: unPaid }
  ),
  withProps(({ _topay, paid, salary }) => ({
    negativeTotal: sumNegative(_topay),
    pendentTotal: sumlist(_topay),
    pendentBalance: rifle(_topay, salary),
    paidTotal: sumlist(paid),
    paidBalance: rifle(paid, salary)
  })),
  branch(props => props.firebase.loading, renderComponent(Loading))
);

export default enhancer(List);
