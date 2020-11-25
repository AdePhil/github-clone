function getFormattedDate(date, hideYear = false) {
  const MONTH_NAMES = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleDateString("en-US", { month: "short" })
  );
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  if (hideYear) {
    return `${month} ${day}`;
  }

  return `${month} ${day}, ${year}`;
}

function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / (60 * 60));
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();
  const daysAgo = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (hours < 48) {
    return `yesterday`;
  } else if (daysAgo < 30) {
    return `${daysAgo} days ago`;
  } else if (isThisYear) {
    return getFormattedDate(date, true);
  }

  return getFormattedDate(date);
}

export default timeAgo;
