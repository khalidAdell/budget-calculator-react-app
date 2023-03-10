import React, { useRef } from "react";

const ExpenseForm = props => {
  let submitRef = useRef();
  function onEnter(e) {
    if (e.key === "Enter") {
      submitRef.current.click();
    }
  }
  return (
    <>
      <div className="form">
        <div>
          <label htmlFor="change">Change</label>
          <input
            id="change"
            name="change"
            type="text"
            value={props.change}
            onChange={props.handleChange}
            onKeyDown={onEnter}
            placeholder="e.g: food"
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={props.amount}
            onChange={props.handleAmount}
            onKeyDown={onEnter}
            placeholder="e.g: $300"
          />
        </div>
      </div>
      <button ref={submitRef} onClick={props.pushNewItem}>
        Submit
      </button>
    </>
  );
};

export default ExpenseForm;
