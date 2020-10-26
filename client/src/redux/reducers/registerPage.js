const initialState = {
   isLoading: false,
   errors: [],
   msg: null,
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'RESET-REGISTER': {
         return { ...initialState };
      }
      case 'START-REGISTER': {
         return {
            ...state,
            isLoading: true,
            errors: [],
            msg: null,
         };
      }
      case 'REGISTER-SUCCESS': {
         return {
            ...state,
            isLoading: false,
            errors: [],
            msg: 'Вы зарегистрированы',
         };
      }
      case 'REGISTER-FAILED': {
         return {
            ...state,
            isLoading: false,
            errors: action.payload,
            msg: null,
         };
      }
      default: {
         return state;
      }
   }
};

export default reducer;
