import React, { Component } from 'react';
import './App.css';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Navigation from './Components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'; 
import SignIn from './Components/SignIn/SignIn';

const app = new Clarifai.App({
 apiKey: '66c26976e675482eaa843e8fc6b634ca'
});

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
        imageUrl: '',
        box: {},
        route: 'SignIn'
      }
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  onInputChange = (event) => { 
    this.setState({input: event.target.value}); 
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
      )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
  	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  	const image = document.getElementById('inputimage');
  	const width = Number(image.width);
  	const height = Number(image.height);
  	return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation 
          onRouteChange={this.onRouteChange}
        />
        <Logo />

        { this.state.route === 'SignIn' ?
          <SignIn 
            onRouteChange={this.onRouteChange}
          /> 
          :
          <div>
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
        }

      </div>
    );
  }
}

export default App;
