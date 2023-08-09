import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Calendar2 from '../components/Calendar/Calendar2';
import { Home } from './Home';
import {Home as UserHome} from '../components/User Dashboard/UserHome';
import Individuals from './Indiviuals';
import EventTypes from '../components/User Dashboard/EventTypes';
import ScheduledEvents from '../components/User Dashboard/ScheduledEvents';
import RoutingForms from '../components/User Dashboard/RoutingForms';
import EventForm from '../components/User Dashboard/EventForm';
export const MainRoutes = () => {
  return (
    <div>
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/individuals' element={<Individuals/>}/>
     <Route path='/userevent/userhome' element={<UserHome/>}/>
     <Route path='/userevent/userhome/eventtype' element={<EventTypes/>}/>
     <Route path='/userevent/userhome/scheduledevents' element={<ScheduledEvents/>}/>
     <Route path='/userevent/userhome/routingforms' element={<RoutingForms/>}/>
     <Route path='/userevent/userhome/eventforms' element={<EventForm/>}/>
     <Route path='/userevent/userhome/availability' element={<Calendar2/>}/>
   </Routes>    
    </div>
  )
}
