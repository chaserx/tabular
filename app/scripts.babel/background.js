'use strict'

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion)
})

const messages = ['Everything is going great! \uD83D\uDE09',
                  'Don\'t worry about it \uD83D\uDE09',
                  'Tabs are a great feature of modern browsers \uD83D\uDE09',
                  'More tabs are always better \uD83D\uDE09',
                  'Let\'s open another tab with pictures of puppies \uD83D\uDE09',
                  'You are doing great \uD83D\uDE09',
                  'More tabs, awesome! \uD83D\uDE09',
                  'Yo! Watch it on the tabs will ya?! \uD83D\uDE10',
                  'Easy on the tabs, man. \uD83D\uDE10',
                  'Sometimes you get the tab, sometimes the tab gets you. \uD83D\uDE10',
                  'Oh so many tabs. So many. \uD83D\uDE10',
                  'Stop. Stop this tabuse. \uD83D\uDE10',
                  'Seriously?! Another tab? \uD83D\uDE10',
                  'So this is your plan? Another tab. Great. \uD83D\uDE10',
                  'Too much tabs! \uD83D\uDE10']

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
