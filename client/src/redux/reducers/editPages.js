const initialState = {
   errors: [],
   msg: null,
   isLoading: false,
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'RESET-EDIT': {
         return {
            ...initialState,
         };
      }
      case 'EDIT-START': {
         return {
            ...state,
            isLoading: true,
            msg: null,
            errors: [],
         };
      }
      case 'EDIT-SUCCESS': {
         return {
            ...state,
            errors: [],
            msg: 'Изменения сохранены',
            isLoading: false,
         };
      }
      case 'EDIT-FAILED': {
         return {
            ...state,
            errors: action.payload,
            msg: null,
            isLoading: false,
         };
      }
      default: {
         return state;
      }
   }
};

export default reducer;
