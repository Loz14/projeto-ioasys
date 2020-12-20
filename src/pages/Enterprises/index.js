import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import './style.css'
import api from '../../services/api';
import EnterpriseCard from '../../components/EnterpriseCard';
import SearchIcon from '@material-ui/icons/Search';
import ResponsiveImage from '../../components/ResponsiveImage';

const Enterprises = () => {
    const [enterprise, setEnterprise] = useState([])
    const getEnterprises = async () => {
        const response = await api.get('enterprises', {
            headers: {
                'access-token': api.defaults.headers.common['access-token'],
                'client': api.defaults.headers.common['client'],
                'uid': api.defaults.headers.common['uid']
            }
        })
        setEnterprise(response.data.enterprises)
    }

    return (
        <div className="Enterprise">
            <div className="header">
                <div>
                    
                </div>
                <div className="header-logo">
                    <ResponsiveImage type="nav" />
                </div>
                <div className="header-btn">
                    <Button onClick={getEnterprises} ><SearchIcon htmlColor="#fff" onClick={getEnterprises} /></Button>
                </div>
            </div>
            <div className="container-cards">
                {
                    enterprise ? enterprise.map(value => <EnterpriseCard
                        photo={value.photo}
                        enterprise_name={value.enterprise_name}
                        country={value.country}
                        enterprise_type={value.enterprise_type}
                        key={value.id} />) : <span>Clique na busca para iniciar.</span>
                }
            </div>
        </div>
    )
}

export default Enterprises