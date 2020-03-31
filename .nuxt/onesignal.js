window.$OneSignal = window.OneSignal = window.OneSignal || [];

OneSignal.push(['init', {
  "appId": "ec3da237-a499-423e-8a18-df2a38e6bbe1",
  "allowLocalhostAsSecureOrigin": true,
  "welcomeNotification": {
    "disable": true
  }
}]);

export default function (ctx, inject) {
  inject('OneSignal', OneSignal)
}
