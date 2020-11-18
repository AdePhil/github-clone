const repoQuery = `query($username: String!, $count: Int!){
  user(login: $username) {
    id,
    avatarUrl,
    bio,
    name,
    twitterUsername,
    repositories(first: $count, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        name,
        updatedAt,
        resourcePath,
        url,
        description,
        forkCount,
        stargazerCount,
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            id,
            name,
            color
          }
        },
        licenseInfo {
          key
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
}
  }
}
`;
export const fetchRepos = (payload) => {
  const token = "062013aab292fcb4b4eafe6ae245b0a46ee9f4b9";
  const options = {
    method: "POST",
    body: JSON.stringify({
      query: repoQuery,
      variables: payload,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  // const fetch = window.fetch.bind(window);
  return fetch(`https://api.github.com/graphql`, options).then((res) =>
    res.json()
  );
};
