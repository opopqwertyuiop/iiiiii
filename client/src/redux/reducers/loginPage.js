const initialState = {
   isLoading: false,
   errors: [],
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'RESET-LOGIN': {
         return { ...initialState };
      }
      case 'START-LOGIN': {
         return {
            ...state,
            isLoading: true,
            errors: [],
         };
      }
      case 'LOGIN-FAILED': {
         return {
            ...state,
            isLoading: false,
            errors: action.payload,
         };
      }
      default: {
         return state;
      }
   }
};

export default reducer;
