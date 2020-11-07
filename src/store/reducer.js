export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.price + amount, 0);

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE__ITEM":
      const index = state.basket.findIndex(
        (basketitem) => basketitem.id === action.id
      );
      let newbasket = [...state.basket];

      if (index >= 0) {
        newbasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newbasket,
        // basket: state.basket.filter((item) => item.id !== action.id),
      };
    case "SET__USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
