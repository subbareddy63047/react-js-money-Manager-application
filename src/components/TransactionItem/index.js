// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachTrans, onDelete} = props
  const {title, paymentMethod, amount, id} = eachTrans

  const deleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="each-transaction-item">
      <div className="his-name-container">
        <p>{title}</p>
        <p>Rs {amount}</p>
        <p>{paymentMethod.toLowerCase()}</p>
      </div>
      <button
        type="button"
        data-testid="delete"
        className="delete-btn"
        onClick={deleteItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
