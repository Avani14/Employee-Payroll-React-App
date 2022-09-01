import axios from 'axios'

class EmployeeService{
    baseUrl='http://localhost:8081/employeepayroll'

    addEmployee(data){
        return axios.post(`${this.baseUrl}/addEmployee`,data)
    }
    getAllEmployees(){
        return axios.get(`${this.baseUrl}/getEmployee`)
    }
    getEmployeebyID(id){
        return axios.get(`${this.baseUrl}/getEmployeeById/${id}`)
    }
    deleteEmployee(id){
        return axios.delete(`${this.baseUrl}/deleteEmployee/${id}`)
    }
    updateEmployee(id,object){
        return axios.put(`${this.baseUrl}/editEmployee/${id}`,object)
    }
}
export default new EmployeeService();