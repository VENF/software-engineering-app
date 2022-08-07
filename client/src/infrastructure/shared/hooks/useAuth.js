import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutServices } from 'src/domain/auth.services';

export const useAuth = () => {
  const [auth, setAuth] = useState('loading');
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setAuth('unauthorized');
    } else {
      checkoutServices().then((data) => {
        setAuth('authorized');
        setUser(data);
      });
    }
  }, [token]);

  useEffect(() => {
    if (auth === 'unauthorized') return navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return {
    auth,
    user
  };
};
