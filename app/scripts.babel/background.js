'use strict'

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion)
})

const messages = ['Yo! Watch it on the tabs will ya?!',
                  'Easy on the tabs, man.',
                  'Sometimes you get the tab, sometimes the tab gets you.',
                  'Oh so many tabs. So many.',
                  'Stop. Stop this tabuse.',
                  'Seriously?! Another tab?',
                  'So this is your plan? Another tab. Great.',
                  'Too much tabs!']

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
