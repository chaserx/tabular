'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

console.log('\'Allo \'Allo! Event Page');

const messages = ['Yo! Watch it on the tabs will ya?!',
                  'Easy on the tabs, man.',
                  'Sometimes you get the tab, sometimes the tab gets you.',
                  'Oh so many tabs. So many.',
                  'Stop. Stop this tabuse.',
                  'Seriously?! Another tab?',
                  'So this is your plan? Another tab. Great.'];

function getMessage() {
   return messages[Math.floor(Math.random() * messages.length)];
}

function showNotification() {
  return new Notification('Excessive Tab Reminder',
                          {
                            body: getMessage(),
                            icon: 'images/noun_158509_48.png'
                          });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.tabLimit = 10;
  localStorage.isInitialized = true;
}

if (window.Notification) {
  if (JSON.parse(localStorage.tabLimit)) {
    var tabLimit = localStorage.tabLimit;
  }
  chrome.tabs.onCreated.addListener(function() {
    chrome.windows.getAll({populate: true}, function(allWindows) {
      var tabCount = allWindows[0].tabs.length;
      if (tabCount > tabLimit) {
        showNotification();
      }
    });
  });
}
