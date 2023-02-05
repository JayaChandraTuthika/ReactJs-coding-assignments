import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../passwordItem'
import './index.css'

const initialList = []

class PasswordManager extends Component {
  state = {
    isPasswordVisible: false,
    passWordsList: initialList,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
  }

  onWebsiteChange = event => {
    this.setState({websiteInput: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({usernameInput: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({passwordInput: event.target.value})
  }

  onDeleteItem = id => {
    const {passWordsList} = this.state

    const newPasswordsList = passWordsList.filter(each => each.id !== id)
    this.setState({passWordsList: newPasswordsList})
  }

  togglePasswordHideShow = () => {
    this.setState(prev => ({isPasswordVisible: !prev.isPasswordVisible}))
  }

  onSearchFilterList = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPasswordItem = event => {
    event.preventDefault()

    const colorsList = [
      'bg-red',
      'bg-green',
      'bg-pink',
      'bg-skyblue',
      'bg-yellow',
    ]

    const bgClassName = `first-letter-website ${
      colorsList[Math.ceil(Math.random() * colorsList.length - 1)]
    }`

    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passWordsList,
    } = this.state

    const newPasswordItem = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      cls: bgClassName,
    }

    const newPasswordList = [...passWordsList, newPasswordItem]

    this.setState({
      passWordsList: newPasswordList,
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    })
  }

  render() {
    const {
      isPasswordVisible,
      passWordsList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
    } = this.state

    const filteredList = passWordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="first-container">
          <form className="form-container" onSubmit={this.onAddPasswordItem}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-type-logo"
              />
              <input
                type="text"
                className="input-style"
                value={websiteInput}
                onChange={this.onWebsiteChange}
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-type-logo"
              />
              <input
                type="text"
                className="input-style"
                value={usernameInput}
                onChange={this.onUsernameChange}
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-type-logo"
              />
              <input
                type="password"
                className="input-style"
                value={passwordInput}
                onChange={this.onPasswordChange}
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="password-add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="main-image"
          />
        </div>
        <div className="second-container">
          <div className="heading-container">
            <h1 className="second-container-heading">
              Your Passwords
              <p className="counter-passwords">{filteredList.length}</p>
            </h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                onChange={this.onSearchFilterList}
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="separator-line" />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              className="show-password-checkbox"
              onChange={this.togglePasswordHideShow}
              id="toggle"
            />
            <label htmlFor="toggle" className="show-password-text">
              Show Passwords
            </label>
          </div>
          {filteredList.length === 0 ? (
            <div className="no-passwords-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list-container">
              {filteredList.map(eachPassword => (
                <PasswordItem
                  passwordDetails={eachPassword}
                  isPasswordVisible={isPasswordVisible}
                  onDeleteItem={this.onDeleteItem}
                  key={eachPassword.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
