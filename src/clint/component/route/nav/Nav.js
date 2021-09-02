import React, { useState , useEffect }  from 'react';
import {  BrowserRouter as Router, Switch, Route, NavLink , Redirect } from 'react-router-dom';
import People from '../../people/People';
import Todo from '../../todo/Todo';
import '../nav/nav.css'
import Profile from '../../Profile/Profile';
import About from '../../about/About';
import axios from 'axios';
const Nav = () => {

    const [user, setuser] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
    });

    
    
    useEffect(() => {
        axios.get('/userprofile')
        .then((res) => {
            
                setuser(() => {
                    return({
                        name: res.data.profile.username,
                        email: res.data.profile.email,
                        phone: res.data.profile.phone,
                        role: res.data.profile.role,
                    })
                })
                
        
        })
        .catch((err) => {
            console.log(err);
            window.location.href = "http://localhost:3000/loginfirst";
        });

  
    });

    //for logout
    
    const logOut = async () => {
        await fetch('/logout', {
            method: 'GET',
        });
        window.location.replace("http://localhost:3000/");
    }

    let link;
    
    if(user.role === 'admin'){
        link = <li className="nav-item">
        <NavLink activeStyle={{color: '#65629C'}} className="nav-link" to="/people/Admin">Admin</NavLink>
        </li>
    } else{
        link = '';
    }


    return (
        <>
            <div id='nav-container'>

                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <NavLink className="navbar-brand" to="/people">Todo <span style={{color: '#6C63FF'}}>App.</span></NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse form-inline" id="navbarNav" style={{textAlign: 'left'}}>
                            <p> </p>
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink className="nav-link" to="/people">Home</NavLink>
                                </li>
                                {link}

                                <li className="nav-item">
                                    <NavLink activeStyle={{color: '#65629C'}} className="nav-link" to="/people/profile">{user.name}</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink activeStyle={{color: '#65629C'}} className="nav-link" to="/people/about">About</NavLink>
                                </li>

                                <button onClick={logOut} className="btn btn-primary" style={{marginLeft: '2%'}}>LogOut</button>
                           
                            </ul>
                        </div>
                        
                    </nav>


                    <Switch>
                        <Route exact path='/people'> <Todo /> </Route>
                        <Route exact path='/people/Admin'> <People /> </Route>
                        <Route exact path='/people/profile'> <Profile name={user.name} email={user.email} phone={user.phone} /> </Route>
                        <Route exact path='/people/about'> <About /> </Route>
                        <Redirect to='/people'></Redirect>
                        
                    </Switch>
                </Router>


            </div>
        </>
    );
};

export default Nav;