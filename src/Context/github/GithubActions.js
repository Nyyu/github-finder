const Github_URL = process.env.REACT_APP_GITHUB_LINK;
const Github_KEY = process.env.REACT_APP_GITHUB_KEY;

// Search users
export const searchUsers = async (value) => {
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
    return items;
};

// Search a single USER
export const getUser = async (login) => {
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
        return data;
    }
};

export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: "created",
        per_page: 10,
    });

    const response = await fetch(
        `${Github_URL}/users/${login}/repos?${params}`,
        {
            method: "GET",
            headers: {
                Authorization: `token ${Github_KEY}`,
            },
        }
    );

    const data = await response.json();
    return data;
};
