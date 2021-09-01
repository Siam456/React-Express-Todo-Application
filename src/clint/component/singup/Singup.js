import React, { useState } from 'react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './singup.css'
import singuping from '../../../images/sing.svg'

const Singup = () => {

    const [user, setuser] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    })

    const onSuubmit = async (e) => {
        e.preventDefault();

        const inputError = document.querySelectorAll('input.i-error');
        for( let i = 0 ; i< inputError.length ; i++){
            inputError[i].classList.remove('errorInpit');
        }

        const errorPlaceHolderAll = document.querySelectorAll('p.error');

        for( let j = 0 ; j < errorPlaceHolderAll.length ; j++){
            errorPlaceHolderAll[j].style.display = 'none'
        }

        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        const errorRes = await response.json();
        console.log(errorRes)
        if(errorRes.errors){
            Object.keys(errorRes.errors).forEach((errorName) =>{
                //input fild
                const ip_er = document.getElementById(`input-${errorName}`);
                ip_er.classList.add('errorInpit')
                
                //place holders
                const errorPlaceholder = document.getElementById(`error-${errorName}`);
                errorPlaceholder.style.display = 'block';
                errorPlaceholder.textContent = errorRes.errors[errorName].msg;
            })
        } else{
            alert("Singup successfully! Login now..")
            window.location.replace("http://localhost:3000/");
        }
        
        // alert('user Added successfully')
        //window.location.replace("http://localhost:3000/");
        //console.log(await response.json());
    }

    const setval = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setuser((prev) => {
            if(name === 'username'){
                return {
                    username: value,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                }
            } else if(name === 'email'){
                return{
                    username: prev.username,
                    email: value,
                    phone: prev.phone,
                    password: prev.password,
                }
            } else if(name === 'phone'){
                return{
                    username: prev.username,
                    email: prev.email,
                    phone: value,
                    password: prev.password,
                }
            } else if(name === 'password'){
                return{
                    username: prev.username,
                    email: prev.email,
                    phone: prev.phone,
                    password: value,
                }
            }
        });
    }

    return (
        <>
            <div className='container'>
                <div className='singup-por'>
                    <div className='form-style mt-3' >
                        <h4 style={{textAlign: 'left' , marginBottom: '30px'}}>Sing Up - Todo application</h4>
                        <form method='POST' onSubmit={onSuubmit}>
                            <input id='input-username' onChange={setval} className="form-control i-error" type="text" name="username" placeholder="Name"></input>
                            <p id='error-username' className='error'></p> <br></br>
                            <input id='input-email' onChange={setval} className="form-control i-error" type="text" name="email" placeholder="Email"></input>
                            <p id='error-email' className='error'></p> <br></br>
                            <input id='input-phone' onChange={setval} className="form-control i-error" type="text" name="phone" placeholder="Phone"></input>
                            <p id='error-phone' className='error'></p> <br></br>
                            <input id='input-password' onChange={setval} className="form-control i-error" type="password" name="password" placeholder="Password"></input> 
                            <p id='error-password' className='error'></p> <br></br>
                            <p style={{textAlign: 'right'}}>Already have <a href='/'>account?</a></p>
                            <input className='btn btn-primary' type='submit' value='Add User'></input>
                        </form>
                    </div>
                    <div className='img-sec'>
                        <img className='simg' src={singuping} alt='siam' width='75%'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Singup;
