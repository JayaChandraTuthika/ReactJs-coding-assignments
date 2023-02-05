import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isPasswordVisible, onDeleteItem} = props
  const {id, website, username, password, cls} = passwordDetails

  const passwordEl = isPasswordVisible ? (
    <p className="password">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="invisible-password"
    />
  )

  const onDel = () => {
    onDeleteItem(id)
  }

  return (
    <li className="list-item-container">
      <p className={`first-letter-website ${cls}`}>
        {website[0].toUpperCase()}
      </p>
      <div>
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {passwordEl}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDel}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
