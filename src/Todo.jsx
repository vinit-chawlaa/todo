import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const Todo = () => {

  const [values, setValues] = useState("")
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(null)
  const [handle, setHandle] = useState(false)
  const [displaydata,setDisplaydata] = useState([])
  const [clicked,setClicked] = useState('All')
  const refs = useRef()

  useEffect(()=>{
    refs.current.focus()
  },[])


    const  showalert = () =>{
      if(!toast.isActive('task'))
      {
        toast.info("Task already exists !!", {
          position: "top-right",
          closeButton: true,
          draggable: true,
          autoClose : 5000,
          toastId : 'task',
          style : {
            backgroundColor: 'lightblue',
            color: 'black', 
            marginLeft : '20px'
          }
        });
      }
    }

  const handleclick = () => {
    refs.current.focus()
    if (values.trim()) {
       
      if(data.some(datas => datas.Text.toLowerCase() === values.toLowerCase())  && !handle)
      {
        showalert()
        return
      }

      if (current !== null) {
        const updates = data.map((item, idx) =>
          idx === current ? { ...item, Text: values } : item
        )
        setData(updates)
        setDisplaydata(updates)
        setCurrent(null)
        setHandle(false)
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 100);

        if(updates)
        { 
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }
      }
      else {
        const newitem = {Text : values , checked : false}
        const newdata = [...data , newitem]
        setData(newdata)
        setDisplaydata(newdata)
        setClicked("All")
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 100);
      }
      setValues("")
    }
  }

  const handledelete = (idx) => {
    const deleted = data.filter((_, i) => {
      return i !== idx
    })
    setData(deleted)
    setDisplaydata(deleted)
  }

  const handleEdit = (idx) => {
    refs.current.focus()
    setValues(data[idx].Text)
    setCurrent(idx)
    setHandle(true)
  }

  const handlecheck = (idx) => {
    const updatedata = data.map((item, i) =>
      i === idx ? { ...item, checked: !item.checked } : item
    )
    setData(updatedata)
    setDisplaydata(updatedata)
  }

  const handlecompleted = () => {
    const filters = data.filter((item) => item.checked === true)
    setDisplaydata(filters)
    setClicked('Complete')
  }

  const handleactive = () => {
    const filteredactive = data.filter((item) => item.checked === false)
    setDisplaydata(filteredactive)
    setClicked('Active')
  }

  const handleall = () =>{
    setDisplaydata(data)
    setClicked('All')
  }

  const handlesubmit = (e) =>{
    e.preventDefault();
    refs.current.focus()
    if (values.trim()) {
       
      if(data.some(datas => datas.Text.toLowerCase() === values.toLowerCase())  && !handle)
      {
        showalert()
        return
      }

      if (current !== null) {
        const updates = data.map((item, idx) =>
          idx === current ? { ...item, Text: values } : item
        )
        setData(updates)
        setDisplaydata(updates)
        setCurrent(null)
        setHandle(false)
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 100);

        if(updates)
        { 
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }
      }
      else {
        const newitem = {Text : values , checked : false}
        const newdata = [...data , newitem]
        setData(newdata)
        setDisplaydata(newdata)
        setClicked("All")
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 100);
      }
      setValues("")
    }
  }
  return (
    <>
      <div className="todo-container">
        <h1>TodoMatic</h1>
        <p>What needs to be done ?</p>
        <form onSubmit={handlesubmit}>
        <input type="text" value={values} onChange={(e) => setValues(e.target.value)} ref={refs}/>
        </form>
        <button className='add' onClick={handleclick}>{handle ? 'Update' : 'Add'}</button>
        <div className="btns">
          <button onClick={handleall} className={clicked === 'All' ? 'active' : ''}>All</button>
          <button onClick={handleactive} className={clicked === 'Active' ? 'active' : ''}>Active</button>
          <button onClick={handlecompleted} className={clicked === 'Complete' ? 'active' : ''}>Completed</button>
        </div>
        <p className='p1'>
          {clicked === 'All' && `${displaydata.length} Tasks`} 
          {clicked === 'Active' && `${displaydata.length} Task Remaining`}
          {clicked === 'Complete' && `${displaydata.length} Task Completed`}
        </p>
        <div className="tasks">
          {displaydata.map((item, idx) => (
            <div className="div">
              <li key={idx}><input type="checkbox" className='checkbox' onChange={() => handlecheck(idx)} checked={item.checked}/>{item.Text}</li>
              <div className="btns1">
                <button className='edit' onClick={() => {handleEdit(idx); window.scrollTo(0,0)}}>Edit</button>
                <button className='delete' onClick={() => handledelete(idx)}>Delete</button>
              </div>
            </div>

          ))}
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Todo