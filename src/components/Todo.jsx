import { useEffect, useState,useRef } from 'react';
import './CSS/Todo.css'
import Todoitems from './Todoitems';

let count=0

const Todo=()=> {

    const [todos,setTodos] = useState([]);
    const inputref = useRef(null);

    const add=() =>{
        setTodos([...todos,{no:count++,text:inputref.current.value,display:""}])
        inputref.current.value = "";
        localStorage.setItem("todos_count",count)
    }

    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todos")));
        count = localStorage.getItem("todos_count")
    },[])

    useEffect(()=>{
        setTimeout(()=>{
        console.log(todos);
        localStorage.setItem("todos",JSON.stringify(todos));
        

        },100)
    },[todos])
    return(
        <div className='todo'>
             <div className="todo-header">To-do List</div>
             <div className="todo-add">
                <input ref={inputref} type="text" placeholder='Add Your Task' className='todo-input'/>
                <div onClick={()=>{add()}} className="todo-add-btn">ADD</div>
             </div>
             <div className="todo-list">
                {todos.map((item,index)=>{
                    return <Todoitems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
                })}
             </div>
        </div>
    )
}

export default Todo;