export const repoQuery = `{
  viewer {
    repositories(first: 20, privacy: PUBLIC) {
      totalCount
      nodes {
        name,
        updatedAt,
        resourcePath,
        description,
        forkCount,
        stargazerCount,
        languages{
          nodes{
            id,
            name
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
}`;
