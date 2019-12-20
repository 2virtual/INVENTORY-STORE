import axios from 'axios';
import{GET_ITEMS,ADD_ITEM,DELETE_ITEM, ITEMS_LOADING} from './types';

export const getItems =()=>dispatch=>{
 dispatch(setItemLoading());
 axios
 .get('/api/inventory/stock')
 .then(res=>
   dispatch({
   type:GET_ITEMS,
   payload: res.data
   })
   )
   };
    
   export const addItem =item=>dispatch=>{
     axios
     .post('/api/items',item)
     .then(res=>
      dispatch({
         type:ADD_ITEM,
         payload:res.data
      })
      )
       
   };
   
export const deleteItems =id=>dispatch=>{
  axios
  .delete(`/api/items/${id}`)
  .then(res=>dispatch({
     type:DELETE_ITEM,
     payload:id
  }))
     
 };

 

export const setItemLoading=()=>{
 
return{
   type:ITEMS_LOADING
}
   };
    
