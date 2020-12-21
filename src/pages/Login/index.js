import React from "react";
import clsx from 'clsx';
import './style.css';
import { FormControl, InputAdornment, Input, IconButton, Button, FormHelperText, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MailOutline, Visibility, VisibilityOff, LockOpen } from '@material-ui/icons';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import API from '../../services/api';
import { useHistory } from 'react-router-dom'
import api from "../../services/api";
import ResponsiveImage from "../../components/ResponsiveImage";

//styles utilizados dentro do FormControl
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

//verifica a existência de um login anterior e completa os inputs
const getValuesFromStorage = () => {
    return JSON.parse(localStorage.getItem('keep-logged'))
}

//função Login
function Login() {
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const info = getValuesFromStorage();
    const [values, setValues] = React.useState({
        email: (info.email || ''),
        password: (info.password || ''),
        showPassword: false,
        errors: { email: '', password: '', valid: '' }
    });

    //mapeia eventos dos inputs como mostrar e esconder senha
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    //confere campos e retorna erros, caso existam
    const validateLoginForm = (e) => {

        let errors = {};
        const { email, password } = values;

        if (isEmpty(email)) {
            errors.email = "Email é um campo obrigatório";
        } else if (!isEmail(email)) {
            errors.email = "Por favor insira um email válido";
        }

        if (isEmpty(password)) {
            errors.password = "Senha é um campo obrigatório";
        } else if (isContainWhiteSpace(password)) {
            errors.password = "A senha não deve conter espaços em branco";
        } else if (!isLength(password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "O comprimento da senha deve ser entre 6 a 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            login(event)
        }
    }


    //função chamada ao clicar em entrar
    const login = (e) => {
        setLoading(true);
        e.preventDefault();

        let errors = validateLoginForm();

        if (errors === true) {
            API.post(`users/auth/sign_in`, { email: values.email, password: values.password })
                .then(res => {
                    api.defaults.headers.common['access-token'] = res.headers['access-token']
                    api.defaults.headers.common['uid'] = res.headers['uid']
                    api.defaults.headers.common['client'] = res.headers['client']
                    setLoading(false);
                    localStorage.setItem('keep-logged', JSON.stringify({ email: values.email, password: values.password }))
                    history.push('/enterprise')

                })
                .catch(error => {
                    setLoading(false);
                    setValues({
                        ...values,
                        errors: {
                            valid: 'Credenciais informadas são inválidas, tente novamente.'
                        }
                    })
                })
        } else {
            setLoading(false);
            setValues({
                ...values,
                errors: {
                    email: errors.email,
                    password: errors.password
                }
            })
        }
    };

    return (
        <div className="Login">
            {loading ? <div id="overlay"> <CircularProgress style={{ width: '65px', height: '65px', color: '#57bbbc' }} /> </div> : null}
            <div className="container">
                <div className="card-login">
                    <div className="centralize div-logo">
                        <ResponsiveImage type="home" />
                    </div>
                    <div className="centralize titulo">
                        <p>BEM-VINDO AO EMPRESAS</p>
                    </div>
                    <div className="centralize subtitulo">
                        <p>Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</p>
                    </div>
                    <div className="centralize">
                        <FormControl id="email" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} error={values.errors.email !== '' && values.errors.valid !== '' ? true : false}>
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
                            <FormHelperText id="component-error-text">{values.errors.email}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="centralize">
                        <FormControl id="password" className={clsx(classes.margin, classes.textField)} error={values.errors.password !== '' && values.errors.valid !== '' ? true : false}>
                            <Input
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                onKeyPress={handleKeyPress}
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
                            <FormHelperText id="component-error-text">{values.errors.password}</FormHelperText>
                            <FormHelperText id="component-error-text">{values.errors.valid}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="centralize button">
                        <Button onClick={login} id="btn-entrar" variant="contained">ENTRAR</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;