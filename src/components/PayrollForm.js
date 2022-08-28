import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'

import profile1 from '../assets/avatar2.png'
import profile2 from '../assets/avatar5.png'
import profile3 from '../assets/avatar6.png'
import profile4 from '../assets/img_avatar2.png'
import profile5 from '../assets/img_avatar.png'
import logo from '../assets/logo.png'
import './PayrollForm.css'

function PayrollForm() {
  let initialValues = {
    name:'',
    salary:'',
    email:'',
    profile:'',
    password:'',
    gender:'',
    start_date:'',
    allDepartment: [
        'HR', 'Sales', 'Finance', 'IT', 'Others'
    ],
    department: [],
  }
  const [formValue,setValues] = useState(initialValues)
  const changeValue = (event) =>{
     setValues({
        ...formValue,
        [event.target.name]:event.target.value})
  }
  
  const save = async(event) =>
  {
    let object = {
        name:formValue.name,
        salary:formValue.salary,
        email:formValue.email,
        profile:formValue.profile.pic,
        password:formValue.password,
        gender:formValue.gender,
        department:formValue.department,
        start_date:formValue.start_date
    }
    localStorage.setItem("empMap", JSON.stringify(object));
    console.log(object)
  }
  const reset = () =>{
    setValues({...initialValues})
  }
  const setData = (obj) => {
    let array=obj.startDate;
    console.log(array);
    console.log()
     setValues({
       ...formValue,
       ...obj,
       id: obj.empId,
       name: obj.name,
       departmentValue: obj.department,
       start_date:obj.start_date
     });
   };
  const onCheckChange = (name) => {
    let index = formValue.department.indexOf(name);

    let depArray = [...formValue.department]
    if (index > -1)
        depArray.splice(index, 1)
    else
        depArray.push(name);
        setValues({ ...formValue, department: depArray });
}

const getChecked = (name) => {
    return formValue.department && formValue.department.includes(name);
}

  return (
    <div className="payroll-main">
            <header className='header-content header'>
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form-head" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="name">Name</label>
                            <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                
                        </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label >
                                <input type="radio" name="profilePic" onChange={changeValue} />
                                <img className="profile" src={profile2} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" onChange={changeValue} />
                                <img className="profile" src={profile1} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" onChange={changeValue} />
                                <img className="profile" src={profile4} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" onChange={changeValue} />
                                <img className="profile" src={profile3} alt="profile" />
                            </label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="email">email</label>
                        <input className="input" type="text" id="email" name="email" value={formValue.email} onChange={changeValue} />
                    
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="text" id="salary" name="salary" value={formValue.salary} onChange={changeValue} />
                    
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="start_date">Start Date</label>
                        <input className="input" type="date" name="start_date" id="start_date" value={formValue.start_date} onChange={changeValue} />
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="password">password</label>
                        <input className="input" type="password" id="password" name="password" value={formValue.password} onChange={changeValue} />
                    
                    </div>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" >Submit</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                </form >
            </div >
        </div >
  )
}

export default PayrollForm