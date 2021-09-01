import React, { useState } from 'react';
import './login.css'
import loginImage from './loginIng/login1.svg'
import avatar from './loginIng/male_avatar.svg'

const Login = () => {
    
    const [user, setuser] = useState({
        username: '',
        password: '',
    });

    //store value

    const setValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setuser((prev) => {
            if(name === 'username'){
                return({
                    username: value,
                    password: prev.password,
                })
            } else if(name === 'password'){
                return({
                    username: prev.username,
                    password: value,
                })
            }
        });
    }

    //post data to server

    const postData = async (e) =>{
        e.preventDefault();

        const response = fetch('/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        

        if((await response).status === 500){
            console.log((await response).status);
            const errorPlaceholder = document.getElementById('Cerror');
            errorPlaceholder.textContent= 'Login failed!! try again...'
        } else{
            const errorPlaceholder = document.getElementById('Cerror');
            errorPlaceholder.textContent= ''
            window.location.replace("http://localhost:3000/people");
        }
        //const result = await response.json();
        //window.location.replace("http://localhost:3000/people");

    }

    return (
        <>
            <div>
                <div className='main-sec'></div>
                <div className='loginSec'>
                    <div className='loginImg'>
                        <img src={loginImage} alt='siam' height= '200px'></img>
                    </div>
                    <div className='loginForm'>
                        <img src={avatar} alt='siam' height= '100px'></img>
                        <h3 style={{textAlign: 'center', margin: '20px'}}>Log in - Todo App</h3>
                        <form method='POST' onSubmit={postData}>
                            <input onChange={setValue} id='input-username' type='text' className="form-control i" name="username" placeholder="Enter Email/Phone"></input> 
                             
                            <br></br>
                            <input  onChange={setValue} id='input-username' type='password' className="form-control i" name="password" placeholder="Enter Password"></input> 
                             
                            <p className='error' id='Cerror' style={{marginTop: '5px'}}></p> <br></br>
                            <p style={{textAlign: 'right'}}>Need an <a href='/singup'>account?</a></p>
                            <input className='btn btn-primary i' type='submit' value="Log In"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;