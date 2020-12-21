import React, { useState } from 'react'
import './style.css'
import api from '../../services/api';
import EnterpriseCard from '../../components/EnterpriseCard';
import SearchIcon from '@material-ui/icons/Search';
import ResponsiveImage from '../../components/ResponsiveImage';
import ClearIcon from '@material-ui/icons/Clear';
import { FormControl, InputAdornment, Input, Button, IconButton, withStyles } from '@material-ui/core';

const FormControlStyled = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#fff',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
      }
    },
  })(FormControl);

const Enterprises = () => {
    const [enterprise, setEnterprise] = useState([])
    const [filtered, setFiltered] = useState(false)
    const [search, setSearch] = useState({
        value: '',
        active: false
    })

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

    const activeChange = (event) => {
        event.preventDefault();
        setSearch({ ...search, active: true })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setFiltered(true)
            getEnterprisesByName();
        }
    }

    const searchChange = (event) => {
        setSearch({ ...search, value: event.target.value });
    }

    const clearSearch = (event) => {
        setSearch({...search, value: ''})
    }

    const getEnterprisesByName = async () => {
        try {
            const response = await api.get(`enterprises?name=${search.value}`, {
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
            { search.active ?
                <div style={{ justifyContent: "center" }} className="header">
                    <FormControlStyled style={{ width: '50em' }}>
                        <Input
                            value={search.value}
                            onChange={searchChange}
                            placeholder="Pesquisar"
                            onKeyPress={handleKeyPress}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon htmlColor="#fff" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton 
                                        style={{color: '#fff'}}
                                        onClick={clearSearch}
                                    >
                                        <ClearIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControlStyled>
                </div>
                :
                <div className="header">
                    <div></div>
                    <div className="header-logo">
                        <ResponsiveImage type="nav" />
                    </div>
                    <div className="header-btn">
                        <Button onClick={activeChange} ><SearchIcon htmlColor="#fff" /></Button>
                    </div>
                </div>
            }
            <div className="container-cards">
                {
                    enterprise.length > 0
                        ? enterprise.map(value => <EnterpriseCard
                            photo={value.photo}
                            enterprise_name={value.enterprise_name}
                            country={value.country}
                            enterprise_type={value.enterprise_type}
                            key={value.id} />)
                        : filtered && enterprise.length === 0 && search.active 
                            ? <span style={{ color: '#b5b4b4' }} id="span-center">Nenhuma empresa foi encontrada para a busca realizada.</span>
                            : <span id="span-center">{!search.active ? 'Clique na busca para iniciar.' : ''}</span>
                }
            </div>
        </div>
    )
}

export default Enterprises