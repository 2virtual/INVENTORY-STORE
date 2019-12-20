import{FETCH_All_STAT, ALL_STAT_LOADING} from '../actions/types';
const initialState = {
   displayStatsData : [],
    loading:false
}

export default function(state=initialState,action){

    switch(action.type){
     
        case FETCH_All_STAT:
          
            return{
                ...state,
               displayStatsData :action.payload,
                
                loading:false
            }
            
            
            case ALL_STAT_LOADING:
                return{
                    ...state,
                    loading:true
                }

            default:
                return state;
}

}