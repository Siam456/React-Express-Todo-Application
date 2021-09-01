import './about.css'
import profileTwo from './image/dev.svg'
import profileOne from './image/siam_n.jpg'


const About = () => {
    const user = {
        name: 'Hasibul Hasan (siam)',
        email: 'hasibul15-11038@diu.edu.bd',
        phone: '01755770538',
    };

    
    return (
        <>
            <div className='profileWrap'>
                <div className='profileImg'>
                    <img src={profileTwo} alt='siam'></img> <br></br>
                </div>
                <div className='profileInfo'>
                    <img src={profileOne} alt='siam'></img> <br></br>
                    <div className='profileInfoDetails'>
                        <h4 style={{textAlign: 'center'}}>Dev - Info</h4>
                        <span className='tt'>Name: </span><span>{user.name}</span> <br></br> <br></br>
                        <span className='tt'>Email: </span><span>{user.email}</span> <br></br> <br></br>
                        <span className='tt'>Phone: </span><span>{user.phone}</span> 
                        
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default About;