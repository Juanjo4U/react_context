import { FunctionComponent } from "react";

type AnyFunction = (...args: Array<any>) => any;

export interface ContextParams {
    initialState?: any,
    onStateUpdate?: AnyFunction
}

export interface ReturnContext {
    useContext: AnyFunction,
    provider: FunctionComponent<any>
}