import {configureStore, getDefaultMiddleware, Store} from "@reduxjs/toolkit";
import {Context, createWrapper} from "next-redux-wrapper";
import {setupListeners} from "@reduxjs/toolkit/query";
import tabSlice from "./features/Tab.slice";
import {userService} from "./services/User.service";
import userSlice from "./features/User.slice";

const middleware = [...getDefaultMiddleware(), userService.middleware];

export const store = configureStore({
    reducer: {
        tabSlice,
        userSlice,
        [userService.reducerPath]: userService.reducer
    },
    middleware,
});

const makeStore = (context: Context) => store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<Store<RootState>>(makeStore);