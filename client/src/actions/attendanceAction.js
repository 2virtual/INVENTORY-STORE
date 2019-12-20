import axios from 'axios';
import{FETCH_ATTENDANCE,ATTENDANCE_LOADING}  from './types';

export const getAttendance =()=>dispatch=>{
 dispatch(setAttendanceLoading());
 axios
 .get('/api/employee/sumattendances')
 
 .then(res=>
   dispatch({
   type: FETCH_ATTENDANCE,
   payload: res.data
   
   })
   
   )

   };
  

export const setAttendanceLoading=()=>{
 
    return{
       type:ATTENDANCE_LOADING
    }
       };