import React, { createContext, useEffect,useReducer } from 'react';

export const AuthContext = createContext();
export const authReducer = (state,action) => {
  switch (action.type){
    case 'login':
      return {
        user: action.payload,
        isAuthenticated:true,
      }
    case 'logout':
      return {
        user:null,
        isAuthenticated:false,
      }
    default:
      return state
  }
}
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  // Check only for isAuthenticated flag to avoid automatic login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated');
    if (isLoggedIn === 'true') {
      dispatch({ type: 'login' });
    }
  }, []);

  console.log('AuthContext state', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
