export const withNotificationPermission = (
  notificationCallback: VoidFunction
) => {
  if ("Notification" in window && Notification.permission === "granted") {
    return notificationCallback();
  }
};

export const requestNotificationPermission = () => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().catch(console.error);
  }
};
