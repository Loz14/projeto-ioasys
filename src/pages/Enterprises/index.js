import React from 'react'
import { Button } from '@material-ui/core';
import './style.css'
import api from '../../services/api';

const Enterprises = () => {

    const getEnterprises = async () => {
        const response = await api.get('enterprises', {
            headers: {
                'access-token': api.defaults.headers.common['access-token'],
                'client': api.defaults.headers.common['client'],
                'uid': api.defaults.headers.common['uid']
            }
        })
        console.log(response)
    }

    return (
        <div className="Enterprise">
            <div className="header">
                <Button onClick={getEnterprises} id="btn-entrar" variant="contained">Pesquisar</Button>
            </div>
        </div>
    )
}

export default Enterprises