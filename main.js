import { repoQuery, token } from "./constants.js";

const loadRepositories = () => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      query: repoQuery,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetch = window.fetch.bind(window);
  fetch(`https://api.github.com/graphql`, options)
    .then((res) => res.json())
    .then(renderRepos);
};

const renderRepos = (repos) => {
  console.log(repos);
};

loadRepositories();
