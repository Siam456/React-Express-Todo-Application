import React from 'react';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error from '../error/Error';
import Singup from '../singup/Singup';
import Login from '../login/Login.js'
import NotFound from '../error/NotFound'
import './nav/nav.css'
import Nav from './nav/Nav';

const MainNav = () => {
    return (
        <>
            <div id='nav-container'>
                <Router>

                    <Switch>
                        <Route exact path='/'> <Login /> </Route>
                        <Route path='/singup'> <Singup /> </Route>
                        <Route path='/people'> <Nav /> </Route>
                        <Route path='/loginfirst'> <Error /> </Route>
                        <Route component={NotFound} />
                    </Switch>
                </Router>


            </div>
        </>
    );
};

export default MainNav;