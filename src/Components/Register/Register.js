import React, { Component } from 'react';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			registerEmail: '',
			registerPassword: '',
			name: ''
		}
	}

	onRegisterName = (event) => {
		this.setState({ name: event.target.value });
	}

	onRegisterEmail = (event) => {
		this.setState({ registerEmail: event.target.value });
	}

	onRegisterPassword = (event) => {
		this.setState({ registerPassword: event.target.value });
	}

	onSubmitRegister = () => {
		fetch('http://localhost:3030/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: this.state.name,
					email: this.state.registerEmail,
					password: this.state.registerPassword
				})
			})
			.then(response => response.json()) 
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('homepage');
				}
			})
	}
	
	render() {
		return (
			<div>
				<main className="pa4 black-80">
				<article className="br2 ba dark-gray b--black-10 mv1 w-100 w-50-m w-25-l mw5 center">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        	onChange={this.onRegisterName}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="text" 
				        	name="name"  
				        	id="name"
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	onChange={this.onRegisterEmail}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="email" 
				        	name="email-address"  
				        	id="email-address"
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	onChange={this.onRegisterPassword}
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        />
				      </div>
				    </fieldset>
					    <div className="">
					      <input 
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
					      	type="submit" 
					      	value="Register"
					      	onClick={this.onSubmitRegister}
					      />
					    </div>
				  	</div>
				  </article>
				</main>
			</div>
		);
	}
}

export default Register;
