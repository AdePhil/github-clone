import { fetchRepos } from "./api.js";
import timeAgo from "./date.js";

let app = document.getElementById("app");
let username = "Adephil";

const loadRepositories = () => {
  const payload = { username, count: 20 };

  app.innerHTML = pageLoaderTemplate;
  fetchRepos(payload)
    .then(renderRepos)
    .catch(() => {
      app.innerHTML = errorTemplate;
    });
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

  const headerTemplate = getHeaderTemplate({
    repos,
    avatarUrl,
    bio,
    name,
  });

  const mainTemplate = getMainTemplate({
    repos,
    avatarUrl,
    bio,
    name,
    twitterUsername,
  });

  app.innerHTML = `${headerTemplate} ${mainTemplate}`;
  callbackAfterDomLoads();
};

// Templates

const pageLoaderTemplate = `<div class="full-height center-content">
  <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#24292e">
      <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"/>
              </path>
          </g>
      </g>
  </svg>
</div>
`;

const errorTemplate = `<div class="center-content full-height">
    <p>😔 An error occurred while trying to fetch data for this page. 
    Please reload the page.</p>
</div>`;

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
                      ? `<a class="repo-details-bottom-item link" href='${url}/stargazers'>
                    <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                      <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          
                    </svg>
                    <span>2</span>
                  </a>`
                      : ""
                  }
                  ${
                    forkCount
                      ? `<a class="repo-details-bottom-item link" href='${url}/network/members'>
                    <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                      <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                    </svg>
                    <span>25</span>
                  </a>`
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
  return `
        <div class="avatar-name-group"> 
        <div class="profile-avatar">
          <img style="height:auto;" alt="" width="260" height="260" class="avatar  width-full border" src="${avatarUrl}">
          <div class="profile-emoji">
            <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"></path>
            </svg>
          </div>
        </div>
        <h1 class="profile-name">
          <span class="full-name">${name}</span>
          <span class="user-name">${username}</span>
        </H1>
        </div>
          <button class="btn btn-sm btn-status mobile-status" type="submit" value="Star" aria-label="Star this repository">
            <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"></path>
            </svg>
            <span class="btn-status-text">Set Status</span>
          </button>
        <div class="profile-description">
          ${bio || ""}
        </div>`;
};

const getHeaderTemplate = ({ avatarUrl }) => {
  return `<header class="header">
  <button class="btn-link mobile-hamburger" type="button" aria-label="Toggle navigation" aria-expanded="false">
    <svg height="24" class="octicon octicon-three-bars" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
      <path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path>
    </svg>
  </button>
  <a  href="https://github.com/" aria-label="Homepage" class="logo">
    <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
      <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
  </a>
  <div class="flex-full-width">
    <nav class="nav">
      <label class="form-control  header-search-wrapper">
        <input type="text" class="form-control  header-search-input"  autocapitalize="off"  spellcheck="false" autocomplete="off" placeholder="Search or jump to...">
        <img src="https://github.githubassets.com/images/search-key-slash.svg" alt="" class="header-search-key-slash">
      </label>
      <a class="nav-item mobile" aria-label="Dashboard" href="https://github.com/dashboard">
        Dashboard
      </a>
      <a class="nav-item" aria-label="Dashboard" href="https://github.com/pulls">
        Pull Requests
      </a>
      <a class="nav-item"  aria-label="Issues" href="https://github.com/issues">
        Issues
      </a>
      <a class="nav-item"  aria-label="Marketplace" href="https://github.com/marketplace">
        Marketplace
      </a>
      <a class="nav-item"  aria-label="Explore" href="https://github.com/explore">
        Explore
      </a>
      <a class="nav-item mobile" href="#">
        <img class="user-min-profile-avatar-dropdown" height="20" width="20" alt="@${username}" src="${avatarUrl}">
        &nbsp; <strong class="css-truncate-target">${username}</strong>
      </a>
      <a class="nav-item mobile" href="#">
      <svg class="octicon octicon-sign-out v-align-middle" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
        <path fill-rule="evenodd" d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25V2.75zm10.44 4.5H6.75a.75.75 0 000 1.5h5.69l-1.97 1.97a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 000-1.06l-3.25-3.25a.75.75 0 10-1.06 1.06l1.97 1.97z"></path>
      </svg>
      &nbsp; <strong class="css-truncate-target">Sign out</strong>
      </a>
    </nav>
  </div>
  <notification-indicator>
    <a href="/notifications" class="notification-indicator" aria-label="You have unread notifications">
      <span class="mail-status unread"></span>
      <svg class="octicon octicon-bell" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
        <path d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"></path>
        <path fill-rule="evenodd" d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z"></path>
      </svg>
      <span class="mail-status unread"></span>
    </a>
  </notification-indicator>
  <div class="nav-item nav-item-drop-down">
    <details class="details-overlay details-reset">
      <summary  aria-label="Create new…"  aria-haspopup="menu" role="button" class="summary">
        <svg class="octicon octicon-plus" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"></path>
        </svg> <span class="dropdown-caret"></span>
      </summary>
      <details-menu class="dropdown-menu dropdown-menu-sw" role="menu">
  
        <a role="menuitem" class="dropdown-item" href="https://github.com/new"   >
          New repository
        </a>
  
        <a role="menuitem" class="dropdown-item" href="https://github.com/new/import" >
          Import repository
        </a>
  
        <a role="menuitem" class="dropdown-item" href="https://gist.github.com">
          New gist
        </a>
  
        <a role="menuitem" class="dropdown-item" href="https://github.com/organizations/new" >
          New organization
        </a>
        <a role="menuitem" class="dropdown-item" href="https://github.com/new/project">
          New project
        </a>
  
      </details-menu>
    </details>
  
  </div>
  <div class="nav-item nav-item-drop-down profile-dropdown">
    <details class="details-overlay details-reset" >
      <summary aria-label="Create new…" aria-haspopup="menu" role="button" class="summary">
        <img class="user-min-profile-avatar-dropdown" height="20" width="20" alt="@${username}" src="${avatarUrl}"> <span class="dropdown-caret"></span>
      </summary>
      <details-menu class="dropdown-menu dropdown-menu-sw" role="menu">
  
        <a role="menuitem" class="dropdown-item" href="https://gist.github.com/778">
          Signed in as <strong class="css-truncate-target">${username}</strong>
        </a>

        <div class="status-wrapper">
          <button class="btn btn-sm btn-status" type="submit" value="Star" aria-label="Star this repository">
            <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"></path>
            </svg>
            <span class="btn-status-text">Set Status</span>
          </button>
        </div>
        
        <div class="dropdown-item-group">
          <a role="menuitem" class="dropdown-item" href="https://github.com/${username}">
            Your profile
          </a>
          
          <a role="menuitem" class="dropdown-item" href="https://github.com/${username}?tab=repositories">
            Your repository
          </a>
          
          <a role="menuitem" class="dropdown-item" href="https://github.com/settings/organizations">
            Your organizations
          </a>
          
          <a role="menuitem" class="dropdown-item" href="https://github.com/settings/enterprises">
            Your enterprises
          </a>
          <a role="menuitem" class="dropdown-item" href="https://github.com/${username}?tab=projects">
            Your projects
          </a>
          <a role="menuitem" class="dropdown-item" href="https://github.com/${username}?tab=stars">
            Your stars
          </a>
          <a role="menuitem" class="dropdown-item" href="https://gist.github.com/${username}">
            Your gist
          </a>
        </div>

        <div class="dropdown-feature-item">
          <a role="menuitem" class="dropdown-item" href="https://github.com/new">
            Feature Preview
          </a>
          <a role="menuitem" class="dropdown-item" href="https://docs.github.com/en">
            Help
          </a>
          <a role="menuitem" class="dropdown-item" href="https://github.com/settings/profile">
          Settings
          </a>
          <a role="menuitem" class="dropdown-item" href="#">
            Sign Out
          </a>
        </div>
  
      </details-menu>
    </details>
  
  </div>
 </header>`;
};

const getMainTemplate = ({ repos, avatarUrl, bio, name, twitterUsername }) => {
  const reposTemplate = repos.map((repo) => getRepoTemplate(repo)).join("");
  const userProfileTemplate = getUserProfileTemplate({
    avatarUrl,
    bio,
    name,
    twitterUsername,
  });

  return `<main class="main">
      <div class="main-nav-sticky desktop">
        <div class="container main-content grid nav-grid">
          <div class="main-nav-gutter"></div>
          <div class="main-nav">
            <a href="#" class="main-nav-item">
              <svg class="octicon octicon-book main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path>
              </svg><span class="main-nav-item-text">Overview</span></a>
            <a href="#" class="main-nav-item active">
              <svg class="octicon octicon-repo main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
              </svg><span class="main-nav-item-text">Repositories</span><span title="65" class="counter ">65</span></a>
            <a href="#" class="main-nav-item">
              <svg class="octicon octicon-project main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path>
              </svg><span class="main-nav-item-text">Projects</span></a>
            <a href="#" class="main-nav-item">
              <svg class="octicon octicon-package main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>
              </svg><span class="main-nav-item-text">Packages</span></a>
          </div>
        </div>
      </div>
      <div class="container main-content">
        <div class="user-profile-sticky-bar ">
          <div class="user-min-profile">
            <img class="user-min-profile-avatar" height="32" width="32" alt="@${username}" src="${avatarUrl}">
            <span class="user-min-profile-name">
              ${username}
            </span>
          </div>
        </div>
        <div class="main-nav-sticky mobile">
          <div class="main-nav center">
            <div class="main-nav-gutter"></div>
            <a href="#" class="main-nav-item">
              <svg class="octicon octicon-book main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path>
              </svg><span class="main-nav-item-text">Overview</span></a>
            <a href="#" class="main-nav-item active">
              <svg class="octicon octicon-repo main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
              </svg><span class="main-nav-item-text">Repositories</span><span title="65" class="counter ">65</span></a>
            <a href="#" class="main-nav-item">
              <svg class="octicon octicon-project main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path>
              </svg><span class="main-nav-item-text">Projects</span></a>
            <a href="#" class="main-nav-item">
              <svg class="octicon octicon-package main-nav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>
              </svg><span class="main-nav-item-text">Packages</span></a>
          </div>
        </div>
        <div class="main-content-left">
          ${userProfileTemplate}
        </div>
        <div class="main-content-right">
          <div class="main-content-inputs">
            <input type="search" id="your-repos-filter" name="q" class="form-control flex-full-width" placeholder="Find a repository…" autocomplete="off" aria-label="Find a repository…" value="" data-throttled-autosubmit="">
          </div>
          <ul class="repos">
          ${reposTemplate}
          </ul>
        </div>
      </div>
    </main>`;
};

loadRepositories();

function callbackAfterDomLoads() {
  //show mini profile
  const miniProfileCard = document.querySelector(".user-profile-sticky-bar");
  window.addEventListener("scroll", function (e) {
    if (window.scrollY >= 420) {
      miniProfileCard.classList.add("show");
    } else {
      miniProfileCard.classList.remove("show");
    }
  });

  // close all details on click outside
  const details = document.querySelectorAll("details");
  // Add the onclick listeners.
  document.addEventListener("click", function () {
    details.forEach((detail) => {
      detail.removeAttribute("open");
    });
  });

  //toggle class for mobile menu
  const menuButton = document.querySelector(".mobile-hamburger");
  const menu = document.querySelector(".nav");
  menuButton.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
}
