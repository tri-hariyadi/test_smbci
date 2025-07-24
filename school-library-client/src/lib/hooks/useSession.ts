import { useEffect } from 'react';

import api from 'lib/api/api.ts';
import { useUserStore } from 'store/AuthStore';

const useSession = () => {
  const userStore = useUserStore();

  useEffect(() => {
    const verify = async () => {
      userStore.setUserLoading(true);
      const user = await api.verifyToken();
      if (user.data) {
        userStore.setUser(user.data);
      } else {
        window.localStorage.removeItem('access_token');
      }
      userStore.setUserLoading(false);
    };

    verify();
  }, []);

  return userStore;
};

export default useSession;
