import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Enterprises from '../pages/Enterprises'
import Login from '../pages/Login'

const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/enterprise" component={Enterprises} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;