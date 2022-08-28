import {Routes,Route} from 'react-router-dom'
import PayrollForm from './components/PayrollForm.js'
function App() {
  return (
    <>
      <Routes>
        <Route exact path = "/" element={<PayrollForm/>} />
      </Routes>
    </>
  );
}

export default App;
