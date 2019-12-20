import React, { Component } from 'react';



import GoogleLogin from 'react-google-login';

class GoogleSignIn extends Component {

  render() {

   

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <h4>OR SIGN IN WITH GOOGLE</h4>



      <GoogleLogin
        clientId="493611390064-qin4k7sacgvrg1iptn6trjo07gnqs5d2.apps.googleusercontent.com" 
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      </div>
    );
  }
}

export default GoogleSignIn;