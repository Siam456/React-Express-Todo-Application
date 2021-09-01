import React from 'react';
import Eimage from './image/notfound.svg';
import './error.css'

const NotFound = () => {
    return (
        <div>
            <div className='image'>
                <img src={Eimage}  alt='siam'></img>
            </div>
            <div className='error-details'>
                <h3>404 - You are looking lost boy.... </h3>
                <h5 style={{margin: '30px'}}> <a  className='btn btn-primary' href='http://localhost:3000/'>Go home</a></h5>
            </div>
        </div>
    );
};

export default NotFound;