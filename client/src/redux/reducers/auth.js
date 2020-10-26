const initialState = {
   isLoading: true,
   isAuth: null,
   user: null,
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET-USER': {
         return { ...state, user: action.payload };
      }
      case 'AUTH-SUCCESS': {
         return {
            ...state,
            isLoading: false,
            isAuth: true,
            user: action.payload,
         };
      }
      case 'LOGOUT':
      case 'AUTH-FAILED': {
         return {
            ...state,
            isLoading: false,
            isAuth: false,
            user: null,
         };
      }
      default: {
         return state;
      }
   }
};

export default reducer;
