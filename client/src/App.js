import './App.css';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import AddAppartment from './components/appartment/addAppartment';
import Appartments from './components/appartment/appartmentList';
// import DeleteAppartment from './components/appartment/deleteAppartment';
import Register from './components/auth/register';
import Login from './components/auth/login'
import Layout from './components/layOut';
import LogOut from './components/auth/logOut';
import HomePage from './components/homePage';
import Basket from './components/basket/basket'
// import { useRoutes } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         <Route path='/' element={<Layout></Layout>}>
          <Route index path='/' element={<><h1>דף הבית</h1><HomePage></HomePage><h5> אביגיל קאסל</h5></>}></Route>
          <Route path='/register' element={<Register></Register>}> </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/LogOut' element={<LogOut></LogOut>}></Route>
          <Route path='/basket' element={<Basket></Basket>}></Route>
          <Route path='/appartments' element={ <Appartments/> }></Route>
          <Route path='/addAppartments' element={ <AddAppartment/> }></Route>

         </Route>      
       </Routes>
      </Router>
    </div>
  );
}

export default App;
