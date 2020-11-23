// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRepos = void 0;
var repoQuery = "query($username: String!, $count: Int!){\n  user(login: $username) {\n    id,\n    avatarUrl,\n    bio,\n    name,\n    twitterUsername,\n    repositories(first: $count, orderBy: {field: UPDATED_AT, direction: DESC}) {\n      totalCount\n      nodes {\n        name,\n        updatedAt,\n        resourcePath,\n        url,\n        description,\n        forkCount,\n        stargazerCount,\n        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {\n          nodes {\n            id,\n            name,\n            color\n          }\n        },\n        licenseInfo {\n          key\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n}\n  }\n}\n";

var fetchRepos = function fetchRepos(payload) {
  console.log(undefined);
  var options = {
    method: "POST",
    body: JSON.stringify({
      query: repoQuery,
      variables: payload
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat("6c174affb7d3c45fba9708d4fe9290be1a4d1653")
    }
  };
  return fetch("https://api.github.com/graphql", options).then(function (res) {
    return res.json();
  });
};

exports.fetchRepos = fetchRepos;
},{}],"date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MONTH_NAMES = Array.from({
  length: 12
}, function (_, index) {
  return new Date(0, index).toLocaleDateString("en-US", {
    month: "short"
  });
});

function getFormattedDate(date) {
  var prefomattedDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var hideYear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var day = date.getDate();
  var month = MONTH_NAMES[date.getMonth()];
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = "0".concat(minutes);
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return "".concat(prefomattedDate);
  }

  if (hideYear) {
    return "".concat(month, " ").concat(day, " ");
  }

  return "".concat(month, " ").concat(day, ", ").concat(year);
} // --- Main function


function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  var date = _typeof(dateParam) === "object" ? dateParam : new Date(dateParam);
  var DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000

  var today = new Date();
  var yesterday = new Date(today - DAY_IN_MS);
  var seconds = Math.round((today - date) / 1000);
  var minutes = Math.round(seconds / 60);
  var isToday = today.toDateString() === date.toDateString();
  var isYesterday = yesterday.toDateString() === date.toDateString();
  var isThisYear = today.getFullYear() === date.getFullYear();
  var daysAgo = Math.round((today.getTime() - date.getTime()) / (1000 * 3600 * 24));

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return "".concat(seconds, " seconds ago");
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return "".concat(minutes, " minutes ago");
  } else if (isToday) {
    return getFormattedDate(date, "Today"); // Today at 10:20
  } else if (daysAgo < 30) {
    return "".concat(daysAgo, " days ago");
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
}

var _default = timeAgo;
exports.default = _default;
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _api = require("./api.js");

var _date = _interopRequireDefault(require("./date.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var loadRepositories = function loadRepositories(callbackAfterDomLoads) {
  var payload = {
    username: "Adephil",
    count: 20
  };
  (0, _api.fetchRepos)(payload).then(renderRepos);
};

var renderRepos = function renderRepos(userData) {
  var user = userData.data.user;
  var id = user.id,
      repos = user.repositories.nodes,
      avatarUrl = user.avatarUrl,
      twitterUsername = user.twitterUsername,
      bio = user.bio,
      name = user.name;
  var app = document.getElementById("app");
  var headerTemplate = getHeaderTemplate();
  var mainTemplate = getMainTemplate({
    repos: repos,
    avatarUrl: avatarUrl,
    bio: bio,
    name: name,
    twitterUsername: twitterUsername
  });
  app.innerHTML = "".concat(headerTemplate, " ").concat(mainTemplate);
  callbackAfterDomLoads();
};

var getRepoTemplate = function getRepoTemplate(repo) {
  var name = repo.name,
      url = repo.url,
      resourcePath = repo.resourcePath,
      forkCount = repo.forkCount,
      stargazerCount = repo.stargazerCount,
      licenseInfo = repo.licenseInfo,
      description = repo.description,
      updatedAt = repo.updatedAt,
      _repo$languages$nodes = _slicedToArray(repo.languages.nodes, 1),
      lang = _repo$languages$nodes[0];

  return "\n        <l1 class=\"repo\">\n            <div class=\"repo-details\">\n              <div class=\"flex-full-width\">\n                <h3 class=\"repo-name\">\n                  <a href=\"".concat(url, "\" class=\"repo-name-link\">").concat(name, "</a>\n                </h3>\n                ").concat(description ? "<p class=\"repo-details-description\">".concat(description, "</p>") : "", "\n                <div class=\"repo-details-bottom\">\n                  ").concat(lang ? "<div class=\"repo-details-bottom-item\">\n                    <span class=\"language-indicator\" style=\"background: ".concat(lang && lang.color, "\"></span>\n                    <span>").concat(lang && lang.name, "</span>\n                  </div>") : "", "\n                  ").concat(stargazerCount ? "<div class=\"repo-details-bottom-item\">\n                    <svg aria-label=\"star\" class=\"octicon octicon-star\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" role=\"img\">\n                      <path fill-rule=\"evenodd\" d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z\"></path>\n          \n                    </svg>\n                    <span>2</span>\n                  </div>" : "", "\n                  ").concat(forkCount ? "<div class=\"repo-details-bottom-item\">\n                    <svg aria-label=\"fork\" class=\"octicon octicon-repo-forked\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" role=\"img\">\n                      <path fill-rule=\"evenodd\" d=\"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z\"></path>\n                    </svg>\n                    <span>25</span>\n                  </div>" : "", "\n                  ").concat(licenseInfo ? "<div class=\"repo-details-bottom-item\">\n                    <svg class=\"octicon octicon-law mr-1\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n                      <path fill-rule=\"evenodd\" d=\"M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z\"></path>\n                    </svg>\n                    \n                        <span class=\"license\">".concat(licenseInfo.key, " </span><span>License</span>\n                        \n                  </div>") : "", "\n                  <p class=\"repo-details-bottom-item\">Updated ").concat((0, _date.default)(new Date(updatedAt)), "</p>\n                </div>\n              </div>\n              <button class=\"btn btn-sm \" type=\"submit\" value=\"Star\" aria-label=\"Star this repository\" >\n                <svg class=\"octicon octicon-star\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n                  <path fill-rule=\"evenodd\" d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z\"></path>\n                </svg>Star\n              </button>\n            </div>\n          </l1>\n  ");
};

var getUserProfileTemplate = function getUserProfileTemplate(_ref) {
  var avatarUrl = _ref.avatarUrl,
      name = _ref.name,
      bio = _ref.bio,
      twitterUsername = _ref.twitterUsername;
  return "\n        <div class=\"avatar-name-group\"> \n        <div class=\"profile-avatar\">\n          <img style=\"height:auto;\" alt=\"\" width=\"260\" height=\"260\" class=\"avatar  width-full border\" src=\"".concat(avatarUrl, "\">\n          <div class=\"profile-emoji\">\n            <svg class=\"octicon octicon-smiley\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z\"></path>\n            </svg>\n          </div>\n        </div>\n        <h1 class=\"profile-name\">\n          <span class=\"full-name\">").concat(name, "</span>\n          <span class=\"user-name\">Adephil</span>\n        </H1>\n        </div>\n          <button class=\"btn btn-sm btn-status mobile-status\" type=\"submit\" value=\"Star\" aria-label=\"Star this repository\">\n            <svg class=\"octicon octicon-smiley\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z\"></path>\n            </svg>\n            <span class=\"btn-status-text\">Set Status</span>\n          </button>\n        <div class=\"profile-description\">\n          ").concat(bio || "", "\n        </div>");
};

var getHeaderTemplate = function getHeaderTemplate() {
  return "<header class=\"header\">\n  <button class=\"btn-link mobile-hamburger\" type=\"button\" aria-label=\"Toggle navigation\" aria-expanded=\"false\">\n    <svg height=\"24\" class=\"octicon octicon-three-bars\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"24\" aria-hidden=\"true\">\n      <path fill-rule=\"evenodd\" d=\"M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z\"></path>\n    </svg>\n  </button>\n  <a  href=\"https://github.com/\" aria-label=\"Homepage\" class=\"logo\">\n    <svg class=\"octicon octicon-mark-github v-align-middle\" height=\"32\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"32\" aria-hidden=\"true\">\n      <path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path>\n    </svg>\n  </a>\n  <div class=\"flex-full-width\">\n    <nav class=\"nav\">\n      <label class=\"form-control  header-search-wrapper\">\n        <input type=\"text\" class=\"form-control  header-search-input\"  autocapitalize=\"off\"  spellcheck=\"false\" autocomplete=\"off\" placeholder=\"Search or jump to...\">\n        <img src=\"https://github.githubassets.com/images/search-key-slash.svg\" alt=\"\" class=\"header-search-key-slash\">\n      </label>\n      <a class=\"nav-item mobile\" aria-label=\"Dashboard\" href=\"/pulls\">\n        Dashboard\n      </a>\n      <a class=\"nav-item\" aria-label=\"Dashboard\" href=\"/pulls\">\n        Pull Requests\n      </a>\n      <a class=\"nav-item\"  aria-label=\"Issues\" href=\"/issues\">\n        Issues\n      </a>\n      <a class=\"nav-item\"  aria-label=\"Marketplace\" href=\"/dashboard\">\n        Marketplace\n      </a>\n      <a class=\"nav-item\"  aria-label=\"Explore\" href=\"/dashboard\">\n        Explore\n      </a>\n      <a class=\"nav-item mobile\" href=\"#\">\n        <img class=\"user-min-profile-avatar-dropdown\" height=\"20\" width=\"20\" alt=\"@AdePhil\" src=\"https://avatars0.githubusercontent.com/u/20032671?s=60&v=4\">\n        &nbsp; <strong class=\"css-truncate-target\">AdePhil</strong>\n      </a>\n      <a class=\"nav-item mobile\" href=\"#\">\n      <svg class=\"octicon octicon-sign-out v-align-middle\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n        <path fill-rule=\"evenodd\" d=\"M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25V2.75zm10.44 4.5H6.75a.75.75 0 000 1.5h5.69l-1.97 1.97a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 000-1.06l-3.25-3.25a.75.75 0 10-1.06 1.06l1.97 1.97z\"></path>\n      </svg>\n      &nbsp; <strong class=\"css-truncate-target\">Sign out</strong>\n      </a>\n    </nav>\n  </div>\n  <notification-indicator>\n    <a href=\"/notifications\" class=\"notification-indicator\" aria-label=\"You have unread notifications\">\n      <span class=\"mail-status unread\"></span>\n      <svg class=\"octicon octicon-bell\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n        <path d=\"M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z\"></path>\n        <path fill-rule=\"evenodd\" d=\"M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z\"></path>\n      </svg>\n      <span class=\"mail-status unread\"></span>\n    </a>\n  </notification-indicator>\n  <div class=\"nav-item nav-item-drop-down\">\n    <details class=\"details-overlay details-reset\">\n      <summary  aria-label=\"Create new\u2026\"  aria-haspopup=\"menu\" role=\"button\" class=\"summary\">\n        <svg class=\"octicon octicon-plus\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n          <path fill-rule=\"evenodd\" d=\"M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z\"></path>\n        </svg> <span class=\"dropdown-caret\"></span>\n      </summary>\n      <details-menu class=\"dropdown-menu dropdown-menu-sw\" role=\"menu\">\n  \n        <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/778\"   >\n          New repository\n        </a>\n  \n        <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/79090\" >\n          Import repository\n        </a>\n  \n        <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/78\">\n          New gist\n        </a>\n  \n        <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/mkkl\" >\n          New organization\n        </a>\n        <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n          New project\n        </a>\n  \n      </details-menu>\n    </details>\n  \n  </div>\n  <div class=\"nav-item nav-item-drop-down profile-dropdown\">\n    <details class=\"details-overlay details-reset\" >\n      <summary aria-label=\"Create new\u2026\" aria-haspopup=\"menu\" role=\"button\" class=\"summary\">\n        <img class=\"user-min-profile-avatar-dropdown\" height=\"20\" width=\"20\" alt=\"@AdePhil\" src=\"https://avatars0.githubusercontent.com/u/20032671?s=60&v=4\"> <span class=\"dropdown-caret\"></span>\n      </summary>\n      <details-menu class=\"dropdown-menu dropdown-menu-sw\" role=\"menu\">\n  \n        <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/778\">\n          Signed in as <strong class=\"css-truncate-target\">AdePhil</strong>\n        </a>\n\n        <div class=\"status-wrapper\">\n          <button class=\"btn btn-sm btn-status\" type=\"submit\" value=\"Star\" aria-label=\"Star this repository\">\n            <svg class=\"octicon octicon-smiley\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z\"></path>\n            </svg>\n            <span class=\"btn-status-text\">Set Status</span>\n          </button>\n        </div>\n        \n        <div class=\"dropdown-item-group\">\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/778\">\n            Your profile\n          </a>\n          \n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/79090\">\n            Your repository\n          </a>\n          \n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/78\">\n            Your organizations\n          </a>\n          \n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/mkkl\">\n            Your enterprises\n          </a>\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n            Your projects\n          </a>\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n            Your stars\n          </a>\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n            Your gist\n          </a>\n        </div>\n\n        <div class=\"dropdown-feature-item\">\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/mkkl\">\n            Feature Preview\n          </a>\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n            Help\n          </a>\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n            Settings\n          </a>\n          <a role=\"menuitem\" class=\"dropdown-item\" href=\"https://gist.github.com/44fgf\">\n            Sign Out\n          </a>\n        </div>\n  \n      </details-menu>\n    </details>\n  \n  </div>\n </header>";
};

var getMainTemplate = function getMainTemplate(_ref2) {
  var repos = _ref2.repos,
      avatarUrl = _ref2.avatarUrl,
      bio = _ref2.bio,
      name = _ref2.name,
      twitterUsername = _ref2.twitterUsername;
  var reposTemplate = repos.map(function (repo) {
    return getRepoTemplate(repo);
  }).join("");
  var userProfileTemplate = getUserProfileTemplate({
    avatarUrl: avatarUrl,
    bio: bio,
    name: name,
    twitterUsername: twitterUsername
  });
  return "<main class=\"main\">\n      <div class=\"main-nav-sticky desktop\">\n        <div class=\"container main-content grid nav-grid\">\n          <div class=\"main-nav-gutter\"></div>\n          <div class=\"main-nav\">\n            <a href=\"#\" class=\"main-nav-item\">\n              <svg class=\"octicon octicon-book main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z\"></path>\n              </svg><span class=\"main-nav-item-text\">Overview</span></a>\n            <a href=\"#\" class=\"main-nav-item active\">\n              <svg class=\"octicon octicon-repo main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z\"></path>\n              </svg><span class=\"main-nav-item-text\">Repositories</span><span title=\"65\" class=\"counter \">65</span></a>\n            <a href=\"#\" class=\"main-nav-item\">\n              <svg class=\"octicon octicon-project main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z\"></path>\n              </svg><span class=\"main-nav-item-text\">Projects</span></a>\n            <a href=\"#\" class=\"main-nav-item\">\n              <svg class=\"octicon octicon-package main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z\"></path>\n              </svg><span class=\"main-nav-item-text\">Packages</span></a>\n          </div>\n        </div>\n      </div>\n      <div class=\"container main-content\">\n        <div class=\"user-profile-sticky-bar \">\n          <div class=\"user-min-profile\">\n            <img class=\"user-min-profile-avatar\" height=\"32\" width=\"32\" alt=\"@AdePhil\" src=\"https://avatars2.githubusercontent.com/u/20032671?s=88&amp;u=0e16da20416c62d3797dbbcc60207ff70deef37f&amp;v=4\">\n            <span class=\"user-min-profile-name\">\n              AdePhil\n            </span>\n          </div>\n        </div>\n        <div class=\"main-nav-sticky mobile\">\n          <div class=\"main-nav center\">\n            <div class=\"main-nav-gutter\"></div>\n            <a href=\"#\" class=\"main-nav-item\">\n              <svg class=\"octicon octicon-book main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z\"></path>\n              </svg><span class=\"main-nav-item-text\">Overview</span></a>\n            <a href=\"#\" class=\"main-nav-item active\">\n              <svg class=\"octicon octicon-repo main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z\"></path>\n              </svg><span class=\"main-nav-item-text\">Repositories</span><span title=\"65\" class=\"counter \">65</span></a>\n            <a href=\"#\" class=\"main-nav-item\">\n              <svg class=\"octicon octicon-project main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z\"></path>\n              </svg><span class=\"main-nav-item-text\">Projects</span></a>\n            <a href=\"#\" class=\"main-nav-item\">\n              <svg class=\"octicon octicon-package main-nav-octicon hide-sm\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" aria-hidden=\"true\">\n                <path fill-rule=\"evenodd\" d=\"M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z\"></path>\n              </svg><span class=\"main-nav-item-text\">Packages</span></a>\n          </div>\n        </div>\n        <div class=\"main-content-left\">\n          ".concat(userProfileTemplate, "\n        </div>\n        <div class=\"main-content-right\">\n          <div class=\"main-content-inputs\">\n            <input type=\"search\" id=\"your-repos-filter\" name=\"q\" class=\"form-control flex-full-width\" placeholder=\"Find a repository\u2026\" autocomplete=\"off\" aria-label=\"Find a repository\u2026\" value=\"\" data-throttled-autosubmit=\"\">\n          </div>\n          <ul class=\"repos\">\n          ").concat(reposTemplate, "\n          </ul>\n        </div>\n      </div>\n    </main>");
};

loadRepositories(callbackAfterDomLoads);

function callbackAfterDomLoads() {
  //show mini profile
  var miniProfileCard = document.querySelector(".user-profile-sticky-bar");
  window.addEventListener("scroll", function (e) {
    if (window.scrollY >= 420) {
      miniProfileCard.classList.add("show");
    } else {
      miniProfileCard.classList.remove("show");
    }
  }); // close all details on click outside

  var details = document.querySelectorAll("details"); // Add the onclick listeners.

  document.addEventListener("click", function () {
    details.forEach(function (detail) {
      detail.removeAttribute("open");
    });
  }); //show mobile menu

  var menuButton = document.querySelector(".mobile-hamburger");
  var menu = document.querySelector(".nav");
  menuButton.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
}
},{"./api.js":"api.js","./date.js":"date.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53051" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map