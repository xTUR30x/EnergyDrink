import { StateCreator, create } from 'zustand';
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface UserState {

    firstName: string,
    lastName: string,
    email: string,
    accessToken: string,
    refreshToken: string,
    userId: string,

    setFirstName: (name: string) => void,
    setLastName: (name: string) => void,
    setEmail: (email: string) => void,
    setAccessToken: (token: string ) => void,
    setRefreshToken: (token: string ) => void,
    setUserId: (token: string ) => void,
}


const userStore: StateCreator<UserState, [["zustand/immer", never]]> = ((set, get) => ({
    firstName: '',
    lastName: '',
    email: '',
    accessToken: '',
    refreshToken: '',
    userId: '',

    setFirstName: (value: string) => set((state) => ({ firstName: value })),
    setLastName: (value: string) => set((state) => ({ lastName: value })),
    setEmail: (value: string) => set((state) => ({ email: value })),
    setAccessToken: (value: string) => set((state) => ({ accessToken: value })),
    setRefreshToken: (value: string) => set((state) => ({ refreshToken: value })),
    setUserId: (value: string) => set((state) => ({ userId: value })),

}));

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            immer(userStore),
            { name: 'auth-store' }
        )
    )
);