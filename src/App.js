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
import Register from './Components/Register/Register';

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
        route: 'SignIn',
        isSignedIn: false,
        user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
        }
      }
  }

  loadUser = (data) => {
    this.setState({ user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route === 'Signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'homepage') { 
      this.setState({ isSignedIn: true })
    }
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
    const { imageUrl, isSignedIn, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />

        { route === 'homepage' 
          ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={imageUrl} box={box} />
           </div>
           : (
              route === 'SignIn' ?
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />  
            )
        }
      </div>
    );
  }
}

export default App;
