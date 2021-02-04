
const initialState = {
    type:"",
    device:""
};

export function device(state = initialState, action) {
    switch (action.type) {
       
        case "SELECT DEVICE":
            return {
                device: action.device
            };
      
        default:
            return state
    }
}