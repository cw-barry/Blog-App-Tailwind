import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { createContext } from 'react';

const AuthContext = createContext({
  register: () => {},
  userInfo: '',
  login: () => {},
  logout: () => {},
});
const baseUrl = 'https://cwbarry.pythonanywhere.com/';

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  if (!userInfo) checkAuth();
  console.log(userInfo);

  useEffect(() => {
    checkAuth();
  }, [userInfo]);

  function checkAuth() {
    if (userInfo) {
      localStorage.setItem('user', JSON.stringify(userInfo));
    } else {
      const user = localStorage.getItem('user');
      if (user) setUserInfo(JSON.parse(user));
    }
  }

  const register = async (userData, navigate) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/account/register/`,
        userData
      );
      setUserInfo({ key: data.key, ...data.user });
      toast.success('User registered successfully!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const login = async (userData, navigate) => {
    try {
      const { data } = await axios.post(`${baseUrl}/account/login/`, userData);
      setUserInfo({ key: data.key, ...data.user });
      toast.success('User loged in  successfully!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = async (navigate) => {
    let token = JSON.parse(localStorage.getItem('user')).key;
    try {
      axios.post(`${baseUrl}/account/logout/`, {
        headers: { Authorization: `Berar ${token}` },
      });
      toast.success('Logged out successfully');
      localStorage.removeItem('user');
      navigate('/auth/login');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <AuthContext.Provider value={{ register, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
