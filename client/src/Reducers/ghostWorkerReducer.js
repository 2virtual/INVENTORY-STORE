import{FETCH_GHOST_WORKER,GHOST_WORKER_LOADING} from '../actions/types';
const initialState = {
    dataGhost : [],
    loading:false
}

export default function(state=initialState,action){

    switch(action.type){
     
        case FETCH_GHOST_WORKER:
          
            return{
                ...state,
               dataGhost :action.payload,
                
                loading:false
            }
            
            
            case GHOST_WORKER_LOADING:
                return{
                    ...state,
                    loading:true
                }

            default:
                return state;
}

}