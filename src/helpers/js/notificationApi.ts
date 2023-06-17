export const isNotificationInWindow = "Notification" in window;

export const withNotificationPermission = (
  notificationCallback: (permission: NotificationPermission) => void
) => {
  if (isNotificationInWindow) {
    return notificationCallback(Notification.permission);
  }
};

export const requestNotificationPermission = (
  permissionCallback?: (permission: NotificationPermission) => void
) => {
  if (!isNotificationInWindow || Notification.permission !== "default") {
    permissionCallback?.(Notification.permission);
    return;
  }

  let isCallbackUsed = false;

  Notification.requestPermission((permission) => {
    isCallbackUsed = true;
    permissionCallback?.(permission);
  })
    .then((permission) => {
      if (!isCallbackUsed) {
        permissionCallback?.(permission);
      }
    })
    .catch(console.error);
};
