import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.css';
import logo from './../../assets/logo-home.png'
import logo2x from './../../assets/logo-home@2x.png'
import logo3x from './../../assets/logo-home@3x.png'
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    login = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if (errors === true) {
            alert("You are successfully signed in...");
            window.location.reload()
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                </head>
                <div className="container">
                    <div className="card">
                        <div className="centralize div-logo">
                            <img src={logo}
                                srcset={logo2x, logo3x}
                                class="logo_home" />
                        </div>
                        <div className="centralize titulo">
                            <p>BEM-VINDO AO EMPRESAS</p>
                        </div>
                        <div className="centralize subtitulo">
                            <p>Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</p>
                        </div>
                        <div className="login">
                            <form onSubmit={this.login}>
                                <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.email &&
                                        <HelpBlock>{errors.email}</HelpBlock>
                                    }
                                </FormGroup>
                                <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                                    {errors.password &&
                                        <HelpBlock>{errors.password}</HelpBlock>
                                    }
                                </FormGroup>
                                <Button type="submit" bsStyle="primary">Sign-In</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;