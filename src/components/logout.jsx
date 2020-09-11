import { Component } from 'react'

export default class Logout extends Component {


  render() {
    localStorage.removeItem("token")
    window.location = "/"
    return (
      null
    )
  }
}
