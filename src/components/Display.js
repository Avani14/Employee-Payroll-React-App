import React from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Display.css'
import logo from '../assets/logo.png'
import EmployeeService from '../../src/services/EmployeeService'
import profile1 from '../assets/avatar2.png'
import profile2 from '../assets/avatar5.png'
import profile3 from '../assets/avatar6.png'
import profile4 from '../assets/img_avatar2.png'
import profile5 from '../assets/img_avatar.png'
import deleteLogo from '../assets/delete-black-18dp.svg'
import updateLogo from '../assets/create-black-18dp.svg'

function Display () {
  const [empValues, setValues] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    EmployeeService.getAllEmployees().then(response => {
      setValues(response.data.data)
      console.log(response.data.data)
    })
  }, [])
  const update = (id) => {
    navigate(`/edit-employee/${id}`);
};
  const remove = (id) => {
    EmployeeService
      .deleteEmployee(id)
      .then((data) => {
        var answer = window.confirm("Do you want to continue",data);
        if(answer === true){
            alert("Employee details deleted successfully!!");
            window.location.reload();
        }
        else{
          window.location.reload();
        }
      })
  };
  const renderData = () => {
    return empValues.map((val, num) => (
      <tr key={num}>
        <td>
          <img className='profile' src={val.profile === "../assets/avatar2.png"?profile1
          :val.profile === "../assets/avatar5.png"? profile2
          :val.profile === "../assets/avatar6.png"? profile3:profile4 }  alt='profile' />
        </td>
        <td>{val.name}</td>
        <td>{val.gender}</td>
        <td>{val.email}</td>
        <td>{val.department}</td>
        <td>{val.salary}</td>
        <td>{val.start_date}</td>
        <td>
          <img src={deleteLogo} onClick={() => remove(val.id)}/>
          <img src={updateLogo} onClick={() => update(val.id)}/>
        </td>
      </tr>
    ))
  }
  return (
    <>
      <header className='header-content header'>
        <div className='logo-content'>
          <img src={logo} alt='' />
          <div>
            <span className='emp-text'>Employee</span>
            <br />
            <span className='emp-text emp-payroll'>Payroll</span>
          </div>
        </div>
      </header>
      <div className='main-content'>
        <div className='header-content'>
          <div className='emp-detail-text'>
            Employee Details <div class="emp-count" id="emp_count">{empValues.length}</div> 
          </div>
          <Link className='add-button' to='/add-employee'>
            Add Employee
          </Link>
        </div>
      </div>
      <table id='display'>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email ID</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Start Date</th>
          <th>Actions</th>
        </tr>
        <tbody>{renderData()}</tbody>
      </table>
    </>
  )
}

export default Display
