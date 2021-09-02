import axios from 'axios';
import React , { useState , useEffect } from 'react';
import './people.css'


const People = () => {

    const [user, setuser] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'admin',
    });

    const [editUser, seteditUser] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'admin',
    });

    const [people, setpeople] = useState([]);
    const [editID, seteditID] = useState('');
    //submit
    const onSuubmit = async (e) => {
        e.preventDefault();
        
        const inputError = document.querySelectorAll('input.i-error');
        for( let i = 0 ; i< inputError.length ; i++){
            inputError[i].classList.remove('errorInpit');
        }

        const errorPlaceHolderAll = document.querySelectorAll('p.ei-error');
       
        for( let j = 0 ; j < errorPlaceHolderAll.length ; j++){
            errorPlaceHolderAll[j].style.display = 'none'
            console.log(errorPlaceHolderAll[j])
        
        }

        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

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
                
            });
        } else{
            //close modal

            const modal = document.getElementById('modala');
            const modalEdit = document.getElementById('modaledit');

            const overlay = document.getElementById('overlay');
            modal.classList.remove('active');
            modalEdit.classList.remove('active');
            overlay.classList.remove('active'); 


            setuser(()=> {
                return({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'admin',
                })
            })
            alert('User added successfully..');
        }

        

        //window.location.replace("http://localhost:3000/");
    }

    //edit
    const onSuubmitEdit = (e) => {
        
        e.preventDefault();
       
        document.querySelector('.error-update').textContent = ''; 
        
        axios.put(`/user/${editID}`, editUser)
        .then(res => {
            alert('update Successfully!!');
            seteditUser(()=> {
                return({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'admin',
                })
            })
        })
        .catch(err => {
            alert('Update Failed!! check again...');
            var myStatus = err.response.status;
            var errMsg = err.response.data.errors;
            if(myStatus === 500){
                console.log(errMsg)
                if(errMsg.username){
                    document.querySelector('.error-update').textContent = errMsg.username.msg;
                } else if(errMsg.email){
                    document.querySelector('.error-update').textContent = errMsg.email.msg;
                } else if(errMsg.phone){
                    document.querySelector('.error-update').textContent = errMsg.phone.msg;
                } else if(errMsg.password){
                    document.querySelector('.error-update').textContent = errMsg.password.msg;
                }
            } else if(myStatus === 501){
                document.querySelector('.error-update').textContent = errMsg;
            }
            });
        
            seteditUser(()=> {
                return({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'admin',
                })
            });
            
    } 

    
    //get data
    //let unmount = false;
    useEffect(() => {
        axios.get('/user')
        .then(res => {
            //if(!unmount){
                setpeople(res.data.users)
            //}
        })
        .catch(err => {console.log(err);
            window.location.href = "http://localhost:3000/loginfirst";});

        
    });


    //delete people 
    const deletePeople = async (e) => {
        const id = e.target.value;
        await axios.delete(`/user/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        window.location.href = "http://localhost:3000/people/admin";
    }

    //store data 
    const setval = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setuser((prev) => {
            if(name === 'username'){
                return({
                    username: value,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'email'){
                return({
                    username: prev.username,
                    email: value,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'phone'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: value,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'password'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: prev.phone,
                    password: value,
                    role: prev.role,
                })
            }
        })

    }


    // for edit
    const setvalEdit = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        seteditUser((prev) => {
            if(name === 'username'){
                return({
                    username: value,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'email'){
                return({
                    username: prev.username,
                    email: value,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'phone'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: value,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'password'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: prev.phone,
                    password: value,
                    role: prev.role,
                })
            }
        })

    }


    //modal open
    const openModal = () => {
        const modal = document.getElementById('modala');
        const overlay = document.getElementById('overlay');
        modal.classList.add('active');
        overlay.classList.add('active');  
    }

    //modal close
    const closeModal = () => {
        const modal = document.getElementById('modala');
        const modalEdit = document.getElementById('modaledit');

        const overlay = document.getElementById('overlay');
        modal.classList.remove('active');
        modalEdit.classList.remove('active');
        overlay.classList.remove('active');  
    }

    //open modal for edit
    const opemModalEdit = (e) => {
        const value = JSON.parse(e.target.value);
        seteditUser(() => {
            return({
                username: value.username,
                email: value.email,
                phone: value.phone,
                password: value.password,
                role : value.role,
            })
        })
        
        seteditID(value._id);

        const modal = document.getElementById('modaledit');
        const overlay = document.getElementById('overlay');
        modal.classList.add('active');
        overlay.classList.add('active');  
    }

    return (
        <>
            <div className='container'>
                <div style={{textAlign: 'center' , marginTop: '30px'}}>
                    <h1>Admin Panel - <span style={{color: '#65629C'}}>Todo application</span></h1>
                    <button className='btn btn-primary' onClick={openModal}>Add user</button>
                </div>
                <div className='modala' id='modala'>
                    <div className='modala-header'>
                        <div className='title'>Add User</div>
                        <button onClick={closeModal} className='close-button'>&times;</button>
                    </div>

                    <div className='modala-body'>
                        <form method='POST' onSubmit={onSuubmit}>
                            <input id='input-username' onChange={setval} value={user.username} className="form-control i-error" type="text" name="username" placeholder="Name"></input> 
                            <p id='error-username' className='ei-error'></p> <br></br>
                            <input id='input-email' onChange={setval} value={user.email} className="form-control i-error" type="text" name="email" placeholder="Email"></input> 
                            <p id='error-email' className='ei-error'></p><br></br>
                            <input id='input-phone' onChange={setval} value={user.phone} className="form-control i-error" type="text" name="phone" placeholder="Phone"></input>
                            <p id='error-phone' className='ei-error'></p><br></br>
                            <input id='input-password' onChange={setval} value={user.password} className="form-control i-error" type="password" name="password" placeholder="Password"></input>
                            <p id='error-password' className='ei-error'></p>  <br></br>
                            <p style={{textAlign:'left', fontWeight: 'bold'}}>Select Role</p>
                            <select onChange={(e) => {
                                console.log(e.target.value);
                                setuser((prev) => {
                                    return ({
                                        username: prev.username,
                                        email: prev.email,
                                        phone: prev.phone,
                                        password: prev.password,
                                        role: e.target.value,
                                    })
                                })
                            }}
                             name="role"  
                             className="form-select">
                                
                                <option value="admin" defaultValue>Admin</option>
                                <option value="user">User</option>
                            </select> <br></br>

                            <input onChange={setval} className='btn btn-primary' type='submit' value='Add User'></input>
                        </form>
                    </div>
                </div>
                <div id='overlay'></div>
                <div className='table-wraper' style={{overflowX : 'auto'}}>
                    <table className="table table-hover table-striped mt-5" style={{borderCollapse: 'collapse'}}>
                        <thead className='bg-secondary'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phoen</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map((data, index) => {
                                    return <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{data.username}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.role}</td>
                                                <td style={{display: 'flex'}}>
                                                    <button onClick={opemModalEdit} value={JSON.stringify(data)} className='btn btn-primary'>Edit</button>
                                                    
                                                    {/* edit modal */}
                                                    <div className='modala' id='modaledit'>
                                                        <div className='modala-header'>
                                                            <div className='title'>Edit User</div>
                                                            <button onClick={closeModal} className='close-button'>&times;</button>
                                                        </div>
                                                        <div className='modala-body'>
                                                            <form method='POST' onSubmit={onSuubmitEdit}>
                                                                <input onChange={setvalEdit} value={editUser.username} className="form-control" type="text" name="username" placeholder="Name"></input>
                                                                <input onChange={setvalEdit} value={editUser.email} className="form-control" type="text" name="email" placeholder="Email"></input>
                                                                <input onChange={setvalEdit} value={editUser.phone} className="form-control" type="text" name="phone" placeholder="Phone"></input>
                                                                
                                                                <p style={{textAlign:'left', fontWeight: 'bold'}}>Select Role</p>
                                                                <select onChange={(e) => {
                                                                    seteditUser((prev) => {
                                                                        return ({
                                                                            username: prev.username,
                                                                            email: prev.email,
                                                                            phone: prev.phone,
                                                                            password: prev.password,
                                                                            role: e.target.value,
                                                                        })
                                                                    })
                                                                }}
                                                                name="role"  
                                                                className="form-select">
                                                                    <option defaultValue='admin'>Select user role</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="user">User</option>
                                                                </select> 
                                                                

                                                                <p style={{textAlign:'left', fontWeight: 'bold'}}>Check Admin: </p>
                                                                <input onChange={setvalEdit} value={editUser.password} className="form-control" type="password" name="password" placeholder="Enter Admin Password Please"></input> <br></br>
                                                                <p className='error-update' style={{color: 'red'}}></p>  <br></br>
                                                                <input onChange={setvalEdit} onClick={closeModal} className='btn btn-primary' type='submit' value='Edit user'></input>

                                                            </form>
                                                        </div>
                                                    </div>


                                                    <button onClick={deletePeople} value={data._id} className='btn btn-danger' style={{marginLeft: '5px'}}>Delete</button>
                                                </td>
                                            </tr>
                            })}
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default People;