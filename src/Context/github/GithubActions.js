import axios from "axios";

const Github_URL = process.env.REACT_APP_GITHUB_LINK;
const Github_KEY = process.env.REACT_APP_GITHUB_KEY;

const github = axios.create({
    baseURL: Github_URL,
    headers: { Authorization: `token ${Github_KEY}` },
});

// Search users
export const searchUsers = async (value) => {
    const params = new URLSearchParams({
        q: value,
    });

    const response = await github.get(`/search/users?${params}`);
    return response.data.items;
};

// Search a single USER
export const getUserAndRepos = async (login) => {
    const [user, repos, status] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`),
    ]);

    if (status === 404) {
        window.location = "/notfound";
    } else {
        return { user: user.data, repos: repos.data };
    }
};
