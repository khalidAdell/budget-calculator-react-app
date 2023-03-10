import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { nanoid } from "nanoid";

function App() {
  // --------------check localStorage
  let getFromLS = localStorage.getItem("expense")
    ? JSON.parse(localStorage.getItem("expense"))
    : [];

  // --------------Items List

  let [expense, setExpense] = useState(getFromLS);

  // --------------handle Form
  const [change, setChange] = useState("");
  const [amount, setAmount] = useState("");

  let handleChange = e => setChange(e.target.value);
  let handleAmount = e => setAmount(e.target.value);

  // --------------Set new items
  function pushNewItem() {
    // console.log(amount, change);
    if (amount > 0 && change !== "") {
      setExpense(prevVal => [
        ...prevVal,
        { id: nanoid(), change: change, amount: +amount },
      ]);
      setChange("");
      setAmount("");
      handleAlert("suc", "Item adedd successfully");
    } else if (amount <= 0 && change !== "") {
      handleAlert("dang", "amount should be more than zero");
    } else {
      handleAlert("dang", "Field is empty");
    }
  }

  // --------------delete item btn
  function deleteFun(e) {
    setExpense(
      expense.filter(expe => {
        return expe.id !== e.target.parentNode.id;
      })
    );
  }
  // --------------clear items btn
  function clearItemsFun() {
    localStorage.removeItem("expense");
    handleAlert("dang", "All items have been deleted");
    return setExpense([]);
  }
  // --------------handle alert
  let [alert, setAlert] = useState({ show: false, type: "", text: "" });

  let handleAlert = (alertType, alertText) => {
    setAlert({ show: true, type: alertType, text: alertText });
    {
      setTimeout(() => {
        setAlert({ show: false, type: alertType, text: alertText });
      }, 3000);
    }
  };
  // set on localStorage
  useEffect(() => localStorage.setItem("expense", JSON.stringify(expense)));

  return (
    <>
      {alert.show && <Alert alertType={alert.type} alertText={alert.text} />}
      <h1>Budget Caculator</h1>
      <main className="app">
        <ExpenseForm
          change={change}
          amount={amount}
          handleChange={handleChange}
          handleAmount={handleAmount}
          pushNewItem={pushNewItem}
        />
        <ExpenseList
          expenseItem={expense}
          deleteFun={deleteFun}
          clearItems={clearItemsFun}
        />
      </main>
      <h1>
        Total Spending : $
        {expense.length > 0
          ? expense.reduce((acc, cur) => acc + cur.amount, 0)
          : null || 0}
      </h1>
    </>
  );
}

export default App;
