import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [error,setError] = useState(null)
  const {dispatch} = useAuthContext()
  const login = async (user) => {
    setError(null)
    const response = await fetch('/api/user/signup',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    const data = await response.json()
    
    if(!response.ok){
      setError(data.error)
    }else{
      //save user to local storage
      localStorage.setItem("user",JSON.stringify(data))

      //update auth context
       dispatch({type:'login',payload:data})
    }
    //dispatch({type:'login',payload:user})
  }
  return { login,error}

}