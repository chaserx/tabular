"use strict";

const messages = [
  "Everything is going great! \uD83D\uDE09",
  "Don't worry about it \uD83D\uDE09",
  "Tabs are a great feature of modern browsers \uD83D\uDE09",
  "More tabs are always better \uD83D\uDE09",
  "Let's open another tab with pictures of puppies \uD83D\uDE09",
  "You are doing great \uD83D\uDE09",
  "More tabs, awesome! \uD83D\uDE09",
  "Yo! Watch it on the tabs will ya?! \uD83D\uDE10",
  "Easy on the tabs, man. \uD83D\uDE10",
  "Sometimes you get the tab, sometimes the tab gets you. \uD83D\uDE10",
  "Oh so many tabs. So many. \uD83D\uDE10",
  "Stop. Stop this tabuse. \uD83D\uDE10",
  "Seriously?! Another tab? \uD83D\uDE10",
  "So this is your plan? Another tab. Great. \uD83D\uDE10",
  "Too much tabs! \uD83D\uDE10"
];

const defaultLimit = 25;

const getMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const showNotification = () => {
  return new Notification("Excessive Tab Reminder", {
    body: getMessage(),
    icon: "images/noun_158509_48.png"
  });
};

// NOTE(chaserx): colors from https://clrs.cc/
const colorMap = [
  { percent: 0, color: "#2ECC40" }, // green
  { percent: 0.5, color: "#FF851B" }, // orange
  { percent: 1, color: "#FF4136" } // red
];

const pickColorByPercentage = (percentage) => {
  return colorMap.reduce((prev, curr) => {
    return Math.abs(curr.percent - percentage) <= Math.abs(prev.percent - percentage) ? curr : prev;
  });
};

const updateBadge = (tally, limit) => {
  chrome.browserAction.setBadgeBackgroundColor({
    color: pickColorByPercentage(tally / limit).color
  });
  chrome.browserAction.setBadgeText({ text: tally.toString() });
};

chrome.runtime.onInstalled.addListener(function() {
  let tabLimit = JSON.parse(localStorage.getItem("tabLimit")) || defaultLimit;
  chrome.windows.getAll({ populate: true }, allWindows => {
    let tabTally = allWindows.reduce((total, win) => {
      return total + win.tabs.length;
    }, 0);
    updateBadge(tabTally, tabLimit);
  });
});

if (window.Notification) {
  chrome.tabs.onCreated.addListener(() => {
    chrome.windows.getAll({ populate: true }, allWindows => {
      let tabLimit = JSON.parse(localStorage.getItem("tabLimit")) || defaultLimit;
      let ourUserIsAGoodUser = true;
      let tabTally = allWindows.reduce((total, win) => {
        return total + win.tabs.length;
      }, 0);
      updateBadge(tabTally, tabLimit);
      if (tabTally > tabLimit) {
        ourUserIsAGoodUser = false;
      }
      if (!ourUserIsAGoodUser) {
        showNotification();
      }
    });
  });

  chrome.tabs.onRemoved.addListener(() => {
    let tabLimit = JSON.parse(localStorage.getItem("tabLimit")) || defaultLimit;
    chrome.windows.getAll({ populate: true }, allWindows => {
      let tabTally = allWindows.reduce((total, win) => {
        return total + win.tabs.length;
      }, 0);
      updateBadge(tabTally, tabLimit);
    });
  });
}
