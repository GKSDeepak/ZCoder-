import React, { createContext, useEffect,useReducer } from 'react';

export const AuthContext = createContext();
export const authReducer = (state,action) => {
  switch (action.type){
    case 'signup' :
      return{
        user: action.payload,
        isAuthenticated:false,
      }
    case 'login':
      return {
        userLogin: action.payload,
        isAuthenticated:true,
        isEdited:false,
      }
    case 'profileEdit' :
      return{
        isEdited:true,
        updatedUser:action.payload,
      }
    case 'logout':
      return {
        user:null,
        userLogin:null,
        isAuthenticated:false,
      }
    default:
      return state
  }
}
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    userLogin:null,
    isAuthenticated: false,
  });

  // Check only for isAuthenticated flag to avoid automatic login
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isAuthenticated');
  //   if (isLoggedIn === 'true') {
  //     dispatch({ type: 'login' });
  //   }
  // }, []);
  useEffect(() => {
    // Retrieve authentication state from local storage
    const storedState = JSON.parse(localStorage.getItem('authState'));

    if (storedState) {
      dispatch(storedState);
    }
  }, []);

  useEffect(() => {
    // Store authentication state in local storage
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type : 'login', payload: user})
    }
  },[])

  console.log('AuthContext state', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
