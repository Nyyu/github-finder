import { useContext } from "react";
import GithubContext from "../../Context/github/GithubContext";

import Spinner from "../Layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
    const { loading, users } = useContext(GithubContext);

    if (!loading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    } else {
        return <Spinner />;
    }
}

export default UserResults;
