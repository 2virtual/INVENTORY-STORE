import axios from 'axios';
import{GET_WORKERS,WORKERS_LOADING} from './types';

export const getWorkers =()=>dispatch=>{
 dispatch(setWorkersLoading());
 axios
 .get('/api/employee/all')
 
 .then(res=>
   dispatch({
   type: GET_WORKERS,
   payload: res.data
  
   })
   )
   };
  
   
export const setWorkersLoading=()=>{
 
    return{
       type:WORKERS_LOADING
    }
       };
        