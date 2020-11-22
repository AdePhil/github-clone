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
  const token = "ada5643828d0e960f7b3fa5e9b665177473d7031";
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
