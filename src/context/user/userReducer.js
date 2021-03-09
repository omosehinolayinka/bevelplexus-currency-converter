import { GET_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: {
          ...action.payload,
          userVerification: {
            ...action.payload.userVerification,
            isIdentityVerified: action.payload.userKyc.isVerified
          }
        },
      };

    default:
      return state;
  }
};
