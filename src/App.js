import React, { Component } from 'react';
import Login from './components/login/Login';
class App extends Component {
	render() {
		return (
			<div className="App">
				<head>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				</head>
				<Login />
			</div>
		);
	}
}

export default App;
