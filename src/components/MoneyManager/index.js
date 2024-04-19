import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    transactionList: [],
    obj: {title: '', amount: '', paymentMethod: 'INCOME'},
  }

  enteringTitle = event => {
    this.setState(prevState => ({
      ...prevState,
      obj: {...prevState.obj, title: event.target.value},
    }))
  }

  enteringAmount = event => {
    this.setState(prevState => ({
      ...prevState,
      obj: {...prevState.obj, amount: event.target.value},
    }))
  }

  selectMethod = event => {
    this.setState(prevState => ({
      ...prevState,
      obj: {...prevState.obj, paymentMethod: event.target.value},
    }))
  }

  submitFormData = event => {
    event.preventDefault()
    const {obj} = this.state
    const {paymentMethod} = obj
    const {amount} = obj
    const newTransaction = {...obj, id: uuidv4()}
    if (paymentMethod === 'INCOME') {
      this.setState(prevState => ({
        ...prevState,
        income: prevState.income + parseInt(amount),
        obj: {title: '', amount: '', paymentMethod: obj.paymentMethod},
        transactionList: [...prevState.transactionList, newTransaction],
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
        income: prevState.income,
        obj: {title: '', amount: '', paymentMethod: obj.paymentMethod},
        transactionList: [...prevState.transactionList, newTransaction],
      }))
    }
  }

  onDelete = id => {
    const {transactionList} = this.state
    const deletedItem = transactionList.filter(each => each.id === id)[0]
    const filterList = transactionList.filter(each => each.id !== id)
    console.log(deletedItem)
    if (deletedItem.paymentMethod === 'EXPENSES') {
      this.setState(prevState => ({
        ...prevState,
        expenses: prevState.expenses - parseInt(deletedItem.amount),
        transactionList: filterList,
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        income: prevState.income - parseInt(deletedItem.amount),
        transactionList: filterList,
      }))
    }
  }

  render() {
    const {income, expenses, obj, transactionList} = this.state
    const balance = income - expenses
    const {title, amount, paymentMethod} = obj

    return (
      <div className="main-container">
        <div className="inner-container">
          <div className="profile-container">
            <h1 className="user-name">Hi, Richard</h1>
            <p className="description">
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>

          <ul className="money-container">
            <li className="money-method balance">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="balance-img"
              />
              <div className="method-content-container">
                <p className="name">Your Balance</p>
                <p className="amount" data-testid="balanceAmount">
                  Rs {balance}
                </p>
              </div>
            </li>
            <li className="money-method income">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="balance-img"
              />
              <div className="method-content-container">
                <p className="name">Your Income</p>
                <p className="amount" data-testid="incomeAmount">
                  Rs {income}
                </p>
              </div>
            </li>
            <li className="money-method expenses">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="balance-img"
              />
              <div className="method-content-container">
                <p className="name">Your Expenses</p>
                <p className="amount" data-testid="expensesAmount">
                  Rs {expenses}
                </p>
              </div>
            </li>
          </ul>

          <div className="transaction-history-container">
            <div className="form-container">
              <div className="left-container">
                <h2 className="transaction">Add Transaction</h2>
                <form className="form" onSubmit={this.submitFormData}>
                  <div className="title-container">
                    <label htmlFor="title" className="title-label">
                      TITLE
                    </label>
                    <input
                      value={title}
                      id="title"
                      placeholder="TITLE"
                      className="title-input"
                      onChange={this.enteringTitle}
                    />
                  </div>
                  <div className="title-container">
                    <label htmlFor="amount" className="title-label">
                      AMOUNT
                    </label>
                    <input
                      value={amount}
                      id="amount"
                      placeholder="AMOUNT"
                      className="title-input"
                      onChange={this.enteringAmount}
                    />
                  </div>
                  <div className="title-container">
                    <label htmlFor="type" className="title-label">
                      TYPE
                    </label>
                    <select
                      id="type"
                      value={paymentMethod}
                      className="title-input"
                      onChange={this.selectMethod}
                    >
                      {transactionTypeOptions.map(each => (
                        <option key={each.optionId} value={each.optionId}>
                          {each.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="button">
                    Add
                  </button>
                </form>
              </div>
            </div>

            <div className="right-container">
              <div className="history-inner-container">
                <h2 className="history-content">History</h2>
                <div className="history-list-container">
                  <div className="history-name-container">
                    <div className="his-name-container">
                      <p>Title</p>
                      <p>Amount</p>
                      <p>Type</p>
                    </div>
                  </div>
                  <ul className="transaction-history-list">
                    {transactionList.map(each => (
                      <TransactionItem
                        eachTrans={each}
                        key={each.id}
                        onDelete={this.onDelete}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
