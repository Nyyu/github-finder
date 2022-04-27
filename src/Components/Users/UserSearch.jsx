import React, { useState, useContext } from "react";

import AlertContext from "../../Context/Alert/AlertContext";
import GithubContext from "../../Context/github/GithubContext";

import { searchUsers } from "../../Context/github/GithubActions";

function UserSearch() {
    const [text, setText] = useState("");
    const { users, dispatch } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text === "") {
            setAlert("Please enter something.", "error");
        } else {
            dispatch({ type: "SET_LOADING", payload: { loading: true } });
            const users = await searchUsers(text);

            dispatch({
                type: "GET_USERS",
                payload: {
                    users: users,
                    loading: false,
                },
            });

            setText("");
        }
    };

    // Handle the input's change
    const handleInput = (e) => {
        const { value } = e.target;
        setText(value);
    };

    return (
        <div className="grid grid-cos-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div className="">
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder="Search"
                                value={text}
                                onChange={handleInput}
                            />
                            <button
                                type="submit"
                                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div className="">
                    <button
                        className="btn btn-ghost btn-lg"
                        onClick={() =>
                            dispatch({
                                type: "RESET_USERS",
                            })
                        }
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserSearch;
