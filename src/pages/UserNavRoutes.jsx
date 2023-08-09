import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Availablity from '../components/User Dashboard/UserAvailablity';
import {Home} from '../components/User Dashboard/UserHome';
import AddOne from './AddOne';
import Indiviuals from './Indiviuals';
const UserNavRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/addone' element={<AddOne/>}/>
            <Route path='/indiviuals' element={<Indiviuals/>}/>
            <Route path='/avaliablity' element={<Availablity/>}/>
        </Routes>
    </div>
  )
}

export default UserNavRoutes