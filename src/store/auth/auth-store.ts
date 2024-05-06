import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
interface I_AuthStore {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialValues = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
};

const useAuthStore = create<I_AuthStore>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get => ({
      ...initialValues,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;

export const setAuthIsLogin = (isLogin: boolean) => useAuthStore.setState(state => ({ ...state, isLogin }));

export const setAuthAccessToken = (accessToken: string | null) =>
  useAuthStore.setState(state => ({ ...state, accessToken }));

export const setAuthRefreshToken = (refreshToken: string | null) =>
  useAuthStore.setState(state => ({ ...state, refreshToken }));
