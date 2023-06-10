export const withNotificationPermission = (
  notificationCallback: VoidFunction
) => {
  if (!("Notification" in window)) {
    return;
  }

  let isCallbackUsed = false;

  Notification.requestPermission((permission) => {
    isCallbackUsed = true;
    if (permission === "granted") {
      notificationCallback();
    }
  }).then((permission) => {
    if (!isCallbackUsed && permission === "granted") {
      notificationCallback();
    }
  });
};
