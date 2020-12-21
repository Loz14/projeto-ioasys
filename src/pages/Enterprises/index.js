import React, { useState } from 'react'
import './style.css'
import api from '../../services/api';
import EnterpriseCard from '../../components/EnterpriseCard';
import SearchIcon from '@material-ui/icons/Search';
import ResponsiveImage from '../../components/ResponsiveImage';
import { FormControl, InputAdornment, Input, Button, CircularProgress } from '@material-ui/core';

const Enterprises = () => {
    const [enterprise, setEnterprise] = useState([])
    const [search, setSearch] = useState('')
    
    const getEnterprises = async () => {
        try {
            const response = await api.get('enterprises', {
                headers: {
                    'access-token': api.defaults.headers.common['access-token'],
                    'client': api.defaults.headers.common['client'],
                    'uid': api.defaults.headers.common['uid']
                }
            })
            setEnterprise(response.data.enterprise)
        } catch (error) {

        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getEnterprisesByName();
        }
    }

    const searchChange = (event) => {
        setSearch(event.target.value);
    }

    const getEnterprisesByName = async () => {
        try {
            const response = await api.get(`enterprises?name=${search}`, {
                headers: {
                    'access-token': api.defaults.headers.common['access-token'],
                    'client': api.defaults.headers.common['client'],
                    'uid': api.defaults.headers.common['uid']
                }
            })
            setEnterprise(response.data.enterprises)
        } catch (error) {
            
        }

    }

    return (
        <div className="Enterprise">
            { enterprise.length > 0 ?
                <div style={{ justifyContent: "center" }} className="header">
                    <FormControl style={{width: '50em'}}>
                        <Input
                            value={search}
                            onChange={searchChange}
                            onKeyPress={handleKeyPress}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon htmlColor="#fff"/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                : 
                <div className="header">
                    <div></div>
                    <div className="header-logo">
                        <ResponsiveImage type="nav" />
                    </div>
                    <div className="header-btn">
                        <Button onClick={getEnterprises} ><SearchIcon htmlColor="#fff"/></Button>
                    </div>
                </div>
            }
            <div className="container-cards">
                {
                    enterprise.length > 0 ? enterprise.map(value => <EnterpriseCard
                        photo={value.photo}
                        enterprise_name={value.enterprise_name}
                        country={value.country}
                        enterprise_type={value.enterprise_type}
                        key={value.id} />) : <span id="span-center">Clique na busca para iniciar.</span>
                }
            </div>
        </div>
    )
}

export default Enterprises