export const repoQuery = `{
  user(login: "Adephil") {
    id,
    avatarUrl,
    bio,
    name,
    repositories(first: 22, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
