import React from "react";

const ExpenseList = props => {
  return (
    <>
      {props.expenseItem.length > 0
        ? props.expenseItem.map((item, i) => (
            <div key={i} className={`expenseItems`} id={item.id}>
              <p>{`${item.change.charAt().toUpperCase()}${item.change.slice(
                1
              )}`}</p>
              <p>${item.amount}</p>
              <input
                type="button"
                onClick={props.deleteFun}
                className="deleteBtn"
                value="Delete"
              />
            </div>
          ))
        : null}
      {props.expenseItem.length > 0 && (
        <button onClick={props.clearItems}>Clear</button>
      )}
    </>
  );
};
export default ExpenseList;
