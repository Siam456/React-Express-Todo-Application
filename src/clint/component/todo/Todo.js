import React, { useState , useEffect } from 'react'
import './todo.css'
import singuping from '../../../images/todoing.svg'
import axios from 'axios'

const Todo = () => {
    const date = new Date();
    
    const [todo, settodo] = useState({
        title: '',
        description: '',
        Tdate: date,
    });

    const [todoList, settodoList] = useState([]);


    //fetch data from api

    //let unmount = false;
    useEffect(() => {
        axios.get('/todo')
        .then((res) => {
            settodoList(res.data.data)
        })
        .catch(err => console.log(err))

        
    })

    const onsubmit = async (e) => {
        e.preventDefault()

        const inputTtitle = document.getElementById('inputTtitle');
        const inputDescription = document.getElementById('inputDescription');

        const errorPlaceHolder = document.querySelectorAll('p.error');
        
        for(let i = 0 ; i< errorPlaceHolder.length ; i++){
            errorPlaceHolder[i].style.display = 'none';
        }

        inputTtitle.classList.remove('error-input')
        inputDescription.classList.remove('error-input')
        const result = await fetch('/todo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        });
        const re = await result.json();
        if(re.errors) {
            Object.keys(re.errors).forEach(errorname => {
                const errorPlaceholder = document.getElementById(`error-${errorname}`);
                errorPlaceholder.style.display = 'block';
                errorPlaceholder.textContent = re.errors[errorname].msg;

                if(errorname === 'title'){
                    inputTtitle.classList.add('error-input')
                } else if(errorname === 'description'){
                    inputDescription.classList.add('error-input')
                }
                
            })
        } else{
            window.location.replace("http://localhost:3000/people");
        }
        
    }

    //delete todo

    const deletetodo = async (e) => {
       await fetch(`/todo/${e.target.value}`, {
            method: 'DELETE'
        });

        window.location.href = "http://localhost:3000/people";


    }

    //update todo process
    const updateProcess =(e) => {
        axios.put(`/todo/${e.target.value}`)
        .then(res => {
            console.log(res)
            window.location.href = "http://localhost:3000/people";
        })
        .catch(err => {
            window.location.href = "http://localhost:3000/people";
            console.log(err);
        });
    }

    const storeData = (e) => {
        const value= e.target.value;
        const name = e.target.name;
        
        settodo((prev)=>{
            if(name === 'title'){
                return{
                    title: value,
                    description: prev.description,
                    Tdate: prev.Tdate,
                };
            } else if(name === 'description'){
                return{
                    title: prev.title,
                    description: value,
                    Tdate: prev.Tdate,
                };
            }  else if(name === 'date'){
                const dateSplit = value.split('-');
                const year = dateSplit[0];
                const mnth = dateSplit[1]-1;
                const tariq = dateSplit[2];
                const newDate = new Date(year,mnth,tariq);
                return{
                    title: prev.title,
                    description: prev.description,
                    Tdate: newDate,
                };
            }
        });  
    }

    return (
        <>
            <div className='container'>
                <div className='img-sec-up'>
                    <img src={singuping} alt='siam' width='200px'/>
                </div>
                <div className='todo-add-por'>
                    <div className='todo-form-style mt-3' >
                        <h4 style={{textAlign: 'left' , marginBottom: '30px'}}>Add Task</h4>
                        <form id='add-form' onSubmit={onsubmit}>
                            <input autoComplete="off" onChange={storeData} className="form-control" type="text" name="title" placeholder="Title" id='inputTtitle'></input>
                            <p id='error-title' className='error'></p> <br></br>
                            <textarea style={{textAlign: 'left'}} onChange={storeData} className="form-control" type="text" name="description" placeholder="Description" id='inputDescription'></textarea> 
                            <p id='error-description' className='error'></p> <br></br>

                            <span>Target date: </span>

                            <input className="form-control" type="date" onChange={storeData} id="start" name="date"
                            
                                min="2021-01-01" max="2023-12-31" /> <br></br>

                            <input className='btn btn-primary' type='submit' value='Add'></input>
                        </form>
                    </div>
                    <div className='img-sec'>
                        <img className='simg' alt='siam' src={singuping} width='75%'/>
                    </div>
                </div>
                <div className='todo-show'>
                    <h4 style={{textAlign: 'center', textDecoration: 'underline', marginTop: '30px'}}>My Task</h4>
                    <div className='card-wrap'>
                        {todoList.map((todo, index) => {

                            //check single digite or not
                            let indexTask;
                            if(index >= 10){
                                indexTask = index;
                            } else {
                                indexTask = `0${index}`
                            }

                            let d = todo.date;
                            let date = new Date(d);
                            let formattedDate = date.toDateString();

                            //target date

                            let td = todo.Tdate;
                            let tdate = new Date(td);
                            let tformattedDate = tdate.toDateString();

                            let today = new Date();
                            let yesterday = new Date();
                            yesterday. setDate(today. getDate() - 1);
                            
                            //header

                            const cardHeader = <div className="card-header">TASK #{indexTask} </div>

                            const cardHeaderDate = <div className="card-header" style={{background: '#cc6060', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>TASK #{indexTask} Expired</div>

                            const cardHeaderGreen = <div className="card-header" style={{background: '#65629C', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>TASK #{indexTask} </div>

                            //problem solving

                            const probTitle = todo.title.split(' ');
                            //console.log(todo.title);

                            return <div key={index} className="card text-center" style={{margin: '30px', width: '220px', borderRadius: '10px'}} id='todoCard'>
                                    {tdate < yesterday ? todo.process === 'done' ?  cardHeaderGreen : cardHeaderDate : todo.process === 'done' ?  cardHeaderGreen : cardHeader}
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">{todo.title}</h5>
                                        <p className="card-text">{todo.description}</p>
                                        <div style={{marginBottom: '10px'}}>
                                            <span className="text-primary">Target : {tformattedDate}</span>
                                        </div>

                                        {/* problem solving part */}
                                        <div>
                                            { (probTitle[0] === 'testing' && probTitle[1] === '#mark30')
                                            || (probTitle[0] === 'problem' && probTitle[1] === 'solving')
                                            || (probTitle[0] === 'Problem' && probTitle[1] === 'Solving') 
                                            ?  <span style={{color : '#65629c'}}>count: {todo.count}
                                            <button style={{marginLeft: '5px'}} value={todo._id} onClick={(e) => {
                                                //console.log(e.target.value)

                                                //update count
                                                axios.put(`/todo/count/${e.target.value}`)
                                                .then(res => {
                                                    console.log(res)
                                                    window.location.href = "http://localhost:3000/people";
                                                })
                                                .catch(err => {
                                                    window.location.href = "http://localhost:3000/people";
                                                    //console.log(err);
                                                });
                                                

                                            }} className="btn btn-success">++</button>
                                            <button style={{marginLeft: '5px'}} value={todo._id} onClick={(e) => {
                                                //console.log(e.target.value);

                                                //reset count
                                                axios.put(`/todo/count/reset/${e.target.value}`)
                                                .then(res => {
                                                    console.log(res)
                                                    //window.location.href = "http://localhost:3000/people";
                                                })
                                                .catch(err => {
                                                    window.location.href = "http://localhost:3000/people";
                                                    //console.log(err);
                                                });

                                            }} className="btn btn-secondary">R</button>
                                            </span>
                                                
                                            : <span></span>}
                                            
                                        </div>


                                        <div style={{marginBottom: '10px'}}>
                                            <span style={{fontWeight: 'bold'}}> Status: {todo.process === 'done' ? <span className="text-success"  style={{fontWeight: 'bold'}} > {todo.process} </span> : <span className="text-danger" style={{fontWeight: 'bold' , textDecoration: 'line-through'}} > {todo.process} </span>}</span>
                                        </div>
                                        <button className="btn btn-primary m-1" onClick={updateProcess} value={todo._id}>Done</button>
                                        <button className="btn btn-danger" onClick={deletetodo} value={todo._id}>Delete</button>
                                    </div>
                                    <div className="card-footer text-muted">
                                        Created at: {formattedDate}
                                    </div>
                                </div>
                            
                        })}
                    </div>
                </div>

            </div>

           
        </>
    )
}

export default Todo;
