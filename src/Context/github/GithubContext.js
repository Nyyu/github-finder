import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const Github_URL = process.env.REACT_APP_GITHUB_LINK;
const Github_KEY = process.env.REACT_APP_GITHUB_KEY;

export const GithubProvicer = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Setting spinner (true -> active, false...)
    const setLoading = (bool) => {
        dispatch({
            type: "SET_LOADING",
            payload: {
                loading: bool,
            },
        });
    };

    // Search users
    const searchUsers = async (value) => {
        setLoading(true);

        const params = new URLSearchParams({
            q: value,
        });

        const response = await fetch(`${Github_URL}/search/users?${params}`, {
            method: "GET",
            headers: {
                Authorization: `token ${Github_KEY}`,
            },
        });

        const { items } = await response.json();
        dispatch({
            type: "GET_USERS",
            payload: {
                users: items,
                loading: false,
            },
        });
    };

    // Search a single USER
    const getUser = async (login) => {
        setLoading(true);

        const response = await fetch(`${Github_URL}/users/${login}`, {
            method: "GET",
            headers: {
                Authorization: `token ${Github_KEY}`,
            },
        });

        if (response.status === 404) {
            window.location = "/notfound";
        } else {
            const data = await response.json();
            dispatch({
                type: "GET_USER",
                payload: {
                    user: data,
                    loading: false,
                },
            });
        }
    };

    // Clear the user's array
    const resetUsers = () => {
        dispatch({
            type: "RESET_USERS",
        });
    };

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                loading: state.loading,
                searchUsers,
                resetUsers,
                getUser,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
