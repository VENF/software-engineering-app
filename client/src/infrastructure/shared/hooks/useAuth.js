import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkoutServices } from 'src/domain/auth.services';

export const useAuth = () => {
  const [auth, setAuth] = useState('loading');
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token) {
      setAuth('unauthorized');
    } else {
      checkoutServices()
        .then((data) => {
          setAuth('authorized');
          setUser(data);
        })
        .catch((err) => {
          setAuth('unauthorized');
        });
    }
  }, [token]);

  useEffect(() => {
    auth === 'unauthorized' &&
      pathname !== '/' &&
      pathname !== '/signup' &&
      navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return {
    auth,
    user
  };
};
