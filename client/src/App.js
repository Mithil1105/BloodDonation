import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import Dashboard from './Pages/Dashboard';
import MedInfo from './Pages/MedInfo';
import About from './Pages/About';
import Layout from './Pages/Layout';
import Missing from './Pages/Missing';
import Unauthorized from './Pages/Unauthorized';
import PersistLogin from './Components/PersistLogin';  
import { AuthProvider } from './Context/AuthProvider'; 
import RequireAuth from './Pages/RequireAuth';         
import Logout from './Pages/Logout';
import AdminLayout from './Pages/AdminLayout';
import AdminDash from './AdminPages/AdminDash';
import SendMessage from './AdminPages/SendMessage';
import AddDonation from './AdminPages/AddDonation';
import UserDonationHistory from './Pages/UserDonationHistory';
import Donate from './Pages/Donate';



const ROLES = {
    'User' : 2001 ,
    'Admin' : 1984 ,
}


function App() {

  return (
   <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/*public routes */}
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path='medinfo' element={<MedInfo/>}/>
            <Route path="unauthorized" element={<Unauthorized />}/>
            <Route path="logout" element={<Logout/>}/>


            {/*protected routes*/}
            {/* protected for users */}
            <Route element={<PersistLogin/>}>
              <Route element={<RequireAuth allowedRoles={ROLES.User}/>}>
                  <Route path='feed' element={<Feed />}/>
                  <Route path='dashboard' element={<Dashboard/>}/>
                  <Route path='donhistory' element={<UserDonationHistory/>}/>
                  <Route path='donate/:id' element={<Donate/>}/>
              </Route>

              {/* protected for admins */}
              <Route element={<RequireAuth allowedRoles={ROLES.Admin}/>}>
                <Route path='admin' element={<AdminLayout/>}>
                    <Route path='dash' element={<AdminDash/>}/>
                    <Route path='sendmsg' element={<SendMessage/>}/>
                    <Route path='newdon' element={<AddDonation/>}/>
                </Route>
              </Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing/>}/>
          </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}
export default App;

