const repoQuery = `query ($username: String!, $count: Int!) {
  user(login: $username) {
    id
    avatarUrl
    bio
    name
    twitterUsername
    repositories(first: $count, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        updatedAt
        resourcePath
        url
        description,
        shortDescriptionHTML,
        forkCount
        stargazerCount
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            id
            name
            color
          }
        }
        licenseInfo {
          key
        }
      }
    }
  }
}

`;
export const fetchRepos = (payload) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      query: repoQuery,
      variables: payload,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  };
  return fetch(`https://api.github.com/graphql`, options).then((res) =>
    res.json()
  );
};
