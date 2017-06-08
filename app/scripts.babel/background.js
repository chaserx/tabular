'use strict'

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion)
})

const messages = ['Everything is going great!',
                  'Don\'t worry about it',
                  'Tabs are a great feature of modern browsers',
                  'More tabs are always better',
                  'Let\'s open another tab with pictures of puppies',
                  'You are doing great',
                  'More tabs, awesome!']

const getMessage = () => {
   return messages[Math.floor(Math.random() * messages.length)]
}

const showNotification = () => {
  return new Notification('Excessive Tab Reminder', {
    body: getMessage(),
    icon: 'images/noun_158509_48.png'
  })
}

if (window.Notification) {
  let tabLimit = JSON.parse(localStorage.getItem('tabLimit')) || 12
  chrome.tabs.onCreated.addListener(() => {
    chrome.windows.getAll({populate: true}, (allWindows) => {
      let ourUserIsAGoodUser = true
      allWindows.forEach((win) => {
        if (win.tabs.length > tabLimit) {
          ourUserIsAGoodUser = false
        }
      })
      if (!ourUserIsAGoodUser) {
        showNotification()
      }
    })
  })
}
