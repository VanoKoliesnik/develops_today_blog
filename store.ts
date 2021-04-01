import { createStore, applyMiddleware } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { reducer } from "./components/reducers/reducer";
import { IState } from "./types";

export const makeStore: MakeStore<IState> = (context: Context) =>
	createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper<IState>(makeStore);
