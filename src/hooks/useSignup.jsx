import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (user) => {
    setError(null);
    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      console.log(response);
      console.log(text);
        console.log(data);

      if (!response.ok) {
        setError(data.error || 'An error occurred during signup');
        return false;
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        
        dispatch({ type: 'login', payload: data });
        return data;
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
      return false;
    }
  };

  return { signup, error };
};
