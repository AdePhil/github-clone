import { repoQuery, token } from "./constants.js";
import timeAgo from "./date.js";

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

const renderRepos = (userData) => {
  const user = userData.data.user;
  const {
    id,
    repositories: { nodes: repos },
    avatarUrl,
    twitterUsername,
    bio,
    name,
  } = user;
  console.log(repos);

  const reposTemplate = repos.map((repo) => getRepoTemplate(repo));
  const userProfileTemplate = getUserProfileTemplate({
    avatarUrl,
    bio,
    name,
    twitterUsername,
  });
  console.log(reposTemplate);
  document.querySelector(".repos").innerHTML = reposTemplate.join("");
  document.querySelector(".main-content-left").innerHTML = userProfileTemplate;
};

const getRepoTemplate = (repo) => {
  const {
    name,
    url,
    resourcePath,
    forkCount,
    stargazerCount,
    licenseInfo,
    description,
    updatedAt,
    languages: {
      nodes: [lang],
    },
  } = repo;

  // const [lang] = langs;
  console.log(lang);
  return `
        <l1 class="repo">
            <div class="repo-details">
              <div class="flex-full-width">
                <h3 class="repo-name">
                  <a href="${url}" class="repo-name-link">${name}</a>
                </h3>
                ${
                  description
                    ? `<p class="repo-details-description">${description}</p>`
                    : ""
                }
                <div class="repo-details-bottom">
                  ${
                    lang
                      ? `<div class="repo-details-bottom-item">
                    <span class="language-indicator" style="background: ${
                      lang && lang.color
                    }"></span>
                    <span>${lang && lang.name}</span>
                  </div>`
                      : ""
                  }
                  ${
                    stargazerCount
                      ? `<div class="repo-details-bottom-item">
                    <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                      <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          
                    </svg>
                    <span>2</span>
                  </div>`
                      : ""
                  }
                  ${
                    forkCount
                      ? `<div class="repo-details-bottom-item">
                    <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                      <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                    </svg>
                    <span>25</span>
                  </div>`
                      : ""
                  }
                  ${
                    licenseInfo
                      ? `<div class="repo-details-bottom-item">
                    <svg class="octicon octicon-law mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path>
                    </svg>
                    
                        <span class="license">${licenseInfo.key} </span><span>License</span>
                        
                  </div>`
                      : ""
                  }
                  <p class="repo-details-bottom-item">Updated ${timeAgo(
                    new Date(updatedAt)
                  )}</p>
                </div>
              </div>
              <button class="btn btn-sm " type="submit" value="Star" aria-label="Star this repository" >
                <svg class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                </svg>Star
              </button>
            </div>
          </l1>
  `;
};

const getUserProfileTemplate = ({ avatarUrl, name, bio, twitterUsername }) => {
  return `<div class="profile-avatar">
          <img style="height:auto;" alt="" width="260" height="260" class="avatar  width-full border" src="${avatarUrl}">
          <div class="profile-emoji">
            <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"></path>
            </svg>
          </div>
        </div>
        <h1 class="profile-name">
          <span class="full-name">${name}</span>
          <span class="user-name">Adephil</span>
        </H1>
        <div class="profile-description">
          ${bio || ""}
        </div>`;
};

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

loadRepositories();
