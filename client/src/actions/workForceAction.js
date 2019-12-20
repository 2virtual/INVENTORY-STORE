import axios from 'axios';
import{FETCH_ATTENDANCE,FETCH_WORK_FORCE,WORK_FORCE_LOADING,ATTENDANCE_LOADING} from './types';

export const getWorkForce =()=>dispatch=>{
 dispatch(setWorkersLoading());
 axios.get('/api/v1/employee/employeeTotal')
 
 .then(res=>
   dispatch({
   type: FETCH_WORK_FORCE,
   payload: res.data
   
   })
   
   )

   };
  
export const getAttendance =()=>dispatch=>{
 dispatch(setAttendanceLoading());
 axios
 .get('/api/employee/attendances')
 
 .then(res=>
   dispatch({
   type: FETCH_ATTENDANCE,
   payload: res.data
  
   })
   )
   };


   
export const setWorkersLoading=()=>{
 
    return{
       type:WORK_FORCE_LOADING
    }
       };
        
   
export const setAttendanceLoading=()=>{
 
    return{
       type:ATTENDANCE_LOADING
    }
       };
        