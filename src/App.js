import React, { Component } from 'react';
import './App.css';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Navigation from './Components/Navigation/Navigation';
import Particles from 'react-particles-js';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'Register',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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

  onInputChange = (event) => { 
    this.setState({input: event.target.value}); 
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
      fetch('http://localhost:3030/imageurl', {               // check naming here!
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response1 => {
        if (response1) {
          fetch('http://localhost:3030/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response2 => response2.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch(console.log);
        }
          this.displayFaceBox(this.calculateFaceLocation(response1));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'Signout') {
      this.setState(initialState);
    } else if (route === 'homepage') { 
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
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
