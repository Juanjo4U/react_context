import React, {
    createContext as createReactContext,
    useContext as useReactContext,
    useEffect, useState
} from "react";
import { ContextParams, ReturnContext } from "./types";
import { isPromise } from "./utils/validations";

const defaultParams = {
    initialState: undefined,
    onStateUpdate: () => { }
}

export const createContext = ({ initialState, onStateUpdate }: ContextParams = defaultParams): ReturnContext => {
    const AppContext = createReactContext(initialState);
    onStateUpdate = typeof onStateUpdate === 'function' ? onStateUpdate : defaultParams.onStateUpdate;
    return {
        useContext: () => useReactContext(AppContext),
        provider: ({ children }) => {
            const [state, setState] = useState();

            const updateState = (nextState: any) => {
                if (onStateUpdate)
                    onStateUpdate(nextState);
                setState(nextState);
            };

            useEffect(() => {
                const initializeState = async () => {
                    initialState = isPromise(initialState) ? await initialState : initialState;
                    updateState(initialState);
                }
                initializeState();
            }, []);

            return (
                <AppContext.Provider value={[state, updateState]} >
                    {children}
                </AppContext.Provider>
            )
        }
    }
}