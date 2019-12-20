import axios from 'axios';
import{FETCH_GHOST_WORKER, GHOST_WORKER_LOADING}  from './types';

export const getGhostWorker =()=>dispatch=>{
 dispatch(setGhostWorkerLoading());
 axios
 .get('/api/employee/ghost')
 
 .then(res=>
   dispatch({
   type: FETCH_GHOST_WORKER,
   payload: res.data
   
   })
   
   )

   };
  

export const setGhostWorkerLoading=()=>{
 
    return{
       type:GHOST_WORKER_LOADING
    }
       };