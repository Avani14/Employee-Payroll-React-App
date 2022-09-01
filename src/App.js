import {Routes,Route} from 'react-router-dom'
import PayrollForm from './components/PayrollForm.js'
import Display from './components/Display.js'
function App() {
  return (
    <>
      <Routes>
        <Route exact path = "/add-employee" element={<PayrollForm/>} />
        <Route exact path="/edit-employee/:id" element={<PayrollForm/>}/>
        <Route exact path = "/" element={<Display/>} />
      </Routes>
    </>
  );
}

export default App;
