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
  const [state,dispatch] = useReducer(authReducer,{
    user:null,
    isAuthenticated:false,
  })
  
  //letting the react components know that the user is logged in after refreshing page
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'login',payload:user})
    }
  },[])
  console.log('AuthContext state', state)

  return (
    <AuthContext.Provider value={{...state,dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
