import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './Pages/CreateListing';
import UpdateListing from './Pages/UpdateListing';
import Listing from './Pages/Listing';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
 
export default function App() {
  return (
   <BrowserRouter>
   <Header />
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/about' element={<About />}/>
    <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing/>} />
          <Route path='/update-listing/:listingId' element={<UpdateListing/>} />
        
    </Route>
    <Route path='/sign-in' element={<SignIn />}/>
    <Route path='/sign-up' element={<SignUp />}/>
    <Route path='/listing/:listingId' element={<Listing/>} />
    <Route path='/search' element={<Search />} />
   
   </Routes>
   
   </BrowserRouter>
  )
}