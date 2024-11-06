import { StateCreator, create } from 'zustand';
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface UserState {

    accessToken: string,
    refreshToken: string,
    userId: string,
    isStaff: boolean,

    setAccessToken: (token: string ) => void,
    setRefreshToken: (token: string ) => void,
    setUserId: (value: string ) => void,
    setIsStaff: (value: boolean) => void,
}


const userStore: StateCreator<UserState, [["zustand/immer", never]]> = ((set, get) => ({
    accessToken: '',
    refreshToken: '',
    userId: '',
    isStaff: false,

    setAccessToken: (value: string) => set((state) => ({ accessToken: value })),
    setRefreshToken: (value: string) => set((state) => ({ refreshToken: value })),
    setUserId: (value: string) => set((state) => ({ userId: value })),
    setIsStaff: (value: boolean) => set((state) => ({ isStaff: value })),

}));

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            immer(userStore),
            { name: 'auth-store' }
        )
    )
);