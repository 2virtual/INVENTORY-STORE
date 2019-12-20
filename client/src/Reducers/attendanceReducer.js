import{FETCH_ATTENDANCE,ATTENDANCE_LOADING} from '../actions/types';
const initialState = {
    data1 : [],
    loading:false
}

export default function(state=initialState,action){

    switch(action.type){
     
        case FETCH_ATTENDANCE:
          
            return{
                ...state,
               data1 :action.payload,
                
                loading:false
            }
            
            
            case ATTENDANCE_LOADING:
                return{
                    ...state,
                    loading:true
                }

            default:
                return state;
}

}