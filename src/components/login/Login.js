import React from "react";
import clsx from 'clsx';
import { FormControl, InputAdornment, Input, IconButton, Button } from '@material-ui/core';
import './../login/login.css';
import { makeStyles } from '@material-ui/core/styles';
import logo from './../../assets/logo-home.png'
import logo2x from './../../assets/logo-home@2x.png'
import logo3x from './../../assets/logo-home@3x.png'
import { MailOutline, Visibility, VisibilityOff, LockOpen } from '@material-ui/icons';
// import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '70%',
    },
}));

function Login() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="Login">
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
                    <div className="centralize">
                        <FormControl id="email" className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <Input
                                value={values.email}
                                onChange={handleChange('email')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <MailOutline className="icon medium-pink" />
                                    </InputAdornment>
                                }
                                inputProps={{
                                    'aria-label': 'email',
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className="centralize">
                        <FormControl id="password" className={clsx(classes.margin, classes.textField)}>
                            <Input
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockOpen className="icon medium-pink" />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility className="icon charcoal-grey" /> : <VisibilityOff className="icon charcoal-grey" />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div className="centralize button">
                        <Button id="btn-entrar" variant="contained">ENTRAR</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;