import React from 'react';
import './profile.css'
import profileOne from './image/profile1.svg'
import profileTwo from './image/profile2.svg'


const Profile = (props) => {
    const {name, email, phone} = props;
    
    
    return (
        <>
            <div className='profileWrap'>
                <div className='profileImg'>
                    <img src={profileTwo} alt='siam'></img> <br></br>
                </div>
                <div className='profileInfo'>
                    <img src={profileOne} alt='siam'></img> <br></br>
                    <div className='profileInfoDetails'>
                        <span className='tt'>Name: </span><span>{name}</span> <br></br> <br></br>
                        <span className='tt'>Email: </span><span>{email}</span> <br></br> <br></br>
                        <span className='tt'>Phone: </span><span>{phone}</span> <br></br> <br></br>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Profile;