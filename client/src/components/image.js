import React, { Component } from 'react'
import theImage from '../images/Onsite.jpg'
class Image extends Component {
  render() {
    return (
      <div>
        <img src ={theImage} className="image"  alt="logo"/>
       
      </div>
    )
  }
}

export default Image;