import axios from 'axios';
import{FETCH_All_STAT, ALL_STAT_LOADING} from './types';

export const getStats =()=>dispatch=>{
 dispatch(setStatsLoading());
 axios
 .get('/api/v1/employee/attendance')
 
 .then(res=>
   dispatch({
   type: FETCH_All_STAT,
   payload: res.data
   
   })
   
   )

   };
  

export const setStatsLoading=()=>{
 
    return{
       type: ALL_STAT_LOADING
    }
       };