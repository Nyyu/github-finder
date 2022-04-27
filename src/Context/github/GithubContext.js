import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvicer = ({ children }) => {
    const initialState = {
        loading: false,
        users: [],
        user: {},
        repos: [],
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    return (
        <GithubContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
