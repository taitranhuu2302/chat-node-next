import {configureStore, getDefaultMiddleware, Store} from "@reduxjs/toolkit";
import {Context, createWrapper} from "next-redux-wrapper";
import {setupListeners} from "@reduxjs/toolkit/query";

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
    reducer: {
    },
    middleware,
});

const makeStore = (context: Context) => store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<Store<RootState>>(makeStore);