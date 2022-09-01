import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import EmployeeService from '../../src/services/EmployeeService'
import profile1 from '../assets/avatar2.png'
import profile2 from '../assets/avatar5.png'
import profile3 from '../assets/avatar6.png'
import profile4 from '../assets/img_avatar2.png'
import profile5 from '../assets/img_avatar.png'
import logo from '../assets/logo.png'
import './PayrollForm.css'

function PayrollForm () {
  let initialValues = {
    name: '',
    salary: '',
    email: '',
    profile: '',
    password: '',
    gender: '',
    start_date: '',
    allDepartment: ['HR', 'Sales', 'Finance', 'IT', 'Others'],
    department: [],
    id: '',
    isUpdate: false
  }
  const navigate = useNavigate()
  const [formValue, setValues] = useState(initialValues)
  const param = useParams()
  useEffect(() => {
    if (param.id) {
      getEmployeeByid(param.id)
    }
  }, [])
  const getEmployeeByid = id => {
    EmployeeService.getEmployeebyID(id).then(res => {
      let emp = res.data.data
      setData(emp)
    })
  }
  const changeValue = event => {
    console.log(event.target.value)
    setValues({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }
  const setData = obj => {
    setValues({
      ...formValue,
      name: obj.name,
      salary: obj.salary,
      email: obj.email,
      profile: obj.profile,
      password: obj.password,
      gender: obj.gender,
      department: obj.department,
      start_date: obj.start_date,
      isUpdate: true
    })
    console.log(obj)
  }
  const save = async event => {
    event.preventDefault()
    let object = {
      name: formValue.name,
      salary: formValue.salary,
      email: formValue.email,
      profile: formValue.profile,
      password: formValue.password,
      gender: formValue.gender,
      department: formValue.department,
      start_date: formValue.start_date
    }
    console.log(formValue.isUpdate)
    if (formValue.isUpdate) {
        var ans = window.confirm('Do you want to continue?')
        if (ans === true) {
            EmployeeService.updateEmployee(param.id, object).then(res => {
          alert('Employee Details upated successfully')
          navigate('')
        })
        } 
        else {
            window.location.reload();
        }
      
    } else {
      EmployeeService.addEmployee(object).then(response => {
        console.log(response)
        alert('Employee registered successfully!!')
      })
    }
  }
  const reset = () => {
    setValues({ ...initialValues })
  }

  const onCheckChange = name => {
    let index = formValue.department.indexOf(name)

    let depArray = [...formValue.department]
    if (index > -1) depArray.splice(index, 1)
    else depArray.push(name)
    setValues({ ...formValue, department: depArray })
  }

  const getChecked = name => {
    return formValue.department && formValue.department.includes(name)
  }

  return (
    <div className='payroll-main'>
      <header className='header-content header'>
        <div className='logo-content'>
          <img src={logo} alt='' />
          <div>
            <span className='emp-text'>EMPLOYEE</span> <br />
            <span className='emp-text emp-payroll'>PAYROLL</span>
          </div>
        </div>
      </header>
      <div className='form-content'>
        <form className='form-head' onSubmit={save}>
          <div className='form-head'>Employee Payroll form</div>
          <div className='row-content'>
            <label className='label text' htmlFor='name'>
              Name
            </label>
            <input
              className='input'
              type='text'
              id='name'
              name='name'
              value={formValue.name}
              onChange={changeValue}
              placeholder='Your name..'
            />
          </div>
          <div className='row-content'>
            <label className='label text' htmlFor='profile'>
              Profile image
            </label>
            <div className='profile-radio-content'>
              <label>
                <input
                  type='radio'
                  name='profile'
                  onChange={changeValue}
                  value='../assets/avatar5.png'
                  checked={formValue.profile === '../assets/avatar5.png'}
                />
                <img className='profile' src={profile2} alt='profile' />
              </label>
              <label>
                <input
                  type='radio'
                  name='profile'
                  onChange={changeValue}
                  value='../assets/avatar2.png'
                  checked={formValue.profile === '../assets/avatar2.png'}
                />
                <img className='profile' src={profile1} alt='profile' />
              </label>
              <label>
                <input
                  type='radio'
                  name='profile'
                  onChange={changeValue}
                  value='../assets/img_avatar2.png'
                  checked={formValue.profile === '../assets/img_avatar2.png'}
                />
                <img className='profile' src={profile4} alt='profile' />
              </label>
              <label>
                <input
                  type='radio'
                  name='profile'
                  onChange={changeValue}
                  value='../assets/avatar6.png'
                  checked={formValue.profile === '../assets/avatar6.png'}
                />
                <img className='profile' src={profile3} alt='profile' />
              </label>
            </div>
          </div>
          <div className='row-content'>
            <label className='label text' htmlFor='gender'>
              Gender
            </label>
            <div>
              <input
                type='radio'
                id='male'
                checked={formValue.gender === 'male'}
                onChange={changeValue}
                name='gender'
                value='male'
              />
              <label className='text' htmlFor='male'>
                Male
              </label>
              <input
                type='radio'
                id='female'
                checked={formValue.gender === 'female'}
                onChange={changeValue}
                name='gender'
                value='female'
              />
              <label className='text' htmlFor='female'>
                Female
              </label>
            </div>
          </div>
          <div className='row-content'>
            <label className='label text' htmlFor='department'>
              Department
            </label>
            <div>
              {formValue.allDepartment.map(item => (
                <span key={item}>
                  <input
                    className='checkbox'
                    type='checkbox'
                    onChange={() => onCheckChange(item)}
                    name={item}
                    checked={getChecked(item)}
                    value={item}
                  />
                  <label className='text' htmlFor={item}>
                    {item}
                  </label>
                </span>
              ))}
            </div>
          </div>
          <div className='row-content'>
            <label className='label text' htmlFor='email'>
              email
            </label>
            <input
              className='input'
              type='text'
              id='email'
              name='email'
              value={formValue.email}
              onChange={changeValue}
            />
          </div>
          <div className='row-content'>
            <label className='label text' htmlFor='salary'>
              Salary
            </label>
            <input
              className='input'
              type='text'
              id='salary'
              name='salary'
              value={formValue.salary}
              onChange={changeValue}
            />
          </div>

          <div className='row-content'>
            <label className='label text' htmlFor='start_date'>
              Start Date
            </label>
            <input
              className='input'
              type='date'
              name='start_date'
              id='start_date'
              value={formValue.start_date}
              onChange={changeValue}
            />
          </div>
          <div className='row-content'>
            <label className='label text' htmlFor='password'>
              password
            </label>
            <input
              className='input'
              type='password'
              id='password'
              name='password'
              value={formValue.password}
              onChange={changeValue}
            />
          </div>

          <div className='submit-reset'>
            <Link  exact to='/'>
                <button className='button submitButton'>
                    Cancel
                </button>
            </Link>
            <button type='submit' className='button submitButton'>
              {formValue.isUpdate ? 'Update' : 'Submit'}
            </button>
            <button
              type='button'
              onClick={reset}
              className='resetButton button'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PayrollForm
