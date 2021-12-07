import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { MAGIC_PUBLIC } from '../utils/urls';

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  /**
   * adds email to user
   * @param {string} email
   */

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push('/');
    } catch (error) {
      setUser(null);
    }
  };

  /**
   * Sets the user to null
   */
  const logoutUser = async () => {
    try {
      await magic.user.lougout();
      setUser(null);
      router.push('/');
    } catch (error) {}
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });

        //Just for testing
        const token = await getToken()
        console.log('checkUserLoggedIn token', token)
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Retrieves the Magic Issues Bearer Token
   * This allows user to make authenticated requests
   */
  
  const getToken = async () => {
    try{
      const token = await magic.user.getIdToken()
      console.log("🚀 ~ getToken ~ token", token);
      return token
    }catch(error){
    console.log("🚀 ~ getToken ~ error", error);

    }
  }

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC);
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
