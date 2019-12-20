import{FETCH_WORK_FORCE,WORK_FORCE_LOADING} from '../actions/types';
const initialState = {
    data : [],
    loading:false
}

export default function(state=initialState,action){

    switch(action.type){
        case FETCH_WORK_FORCE:
          
            return{
                ...state,
               data :action.payload,
                
                loading:false
            }
        
            
            case WORK_FORCE_LOADING:
                return{
                    ...state,
                    loading:true
                }
           

            default:
                return state;
}

}