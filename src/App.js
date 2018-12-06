import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
<<<<<<< HEAD
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '66c26976e675482eaa843e8fc6b634ca'
});
=======
>>>>>>> continued ImageLinkForm, Rank + Particles

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 130
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
      this.state = {
        input: '',
        imageUrl: ''
      }
  }



  onInputChange = (event) => { 
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      "https://samples.clarifai.com/face-det.jpg")
    .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
<<<<<<< HEAD
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
=======
        <ImageLinkForm />
>>>>>>> continued ImageLinkForm, Rank + Particles
        <FaceRecognition /> 
      </div>
    );
  }
}

export default App;
