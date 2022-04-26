import { FaCodepen, FaUsers, FaStore, FaUserFriends } from "react-icons";
import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import GithubContext from "../../Context/github/GithubContext";
import Spinner from "../Layout/Spinner";

function Users() {
    const { user, getUser, loading } = useContext(GithubContext);
    const params = useParams();
    useEffect(() => {
        getUser(params.login);
    }, []);

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <>
                <div className="w-full mx-auto lg:w-10/12">
                    <div className="mb-4">
                        <Link to="/" className="btn btn-ghost">
                            Back to search
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                        <div className="custom-card-image mb-6 md:mb-0">
                            <div className="rounded-lg shadow-xl card image-full">
                                <figure className="">
                                    <img
                                        src={avatar_url}
                                        alt=""
                                        style={{
                                            borderRadius: 6,
                                        }}
                                    />
                                </figure>
                                <div className="card-body justify-end">
                                    <h2 className="card-title mb-0">{name}</h2>
                                    <p className="flex-grow-0">{login}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 relative">
                            <div className="mb-6">
                                <h1 className="text-3xl card-title">
                                    {name}
                                    <div className="ml-2 mr-1 badge badge-success">
                                        {type}
                                    </div>
                                    {hireable && (
                                        <div className="mx-1 badge badge-info">
                                            Hireable
                                        </div>
                                    )}
                                </h1>
                                <p className="mt-1">{bio}</p>
                                <div className="mt-4 absolute bottom-3 card-actions">
                                    <a
                                        href={html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline"
                                    >
                                        Visit profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Users;
