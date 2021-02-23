export const notify = async (text: string): Promise<Notification> => {
  if (!("Notification" in window) || Notification.permission === "denied") {
    return
  }

  if (Notification.permission === "default") {
    if (await Notification.requestPermission() === "denied") {
      return
    }
  }

  if (Notification.permission === "granted") {
    return new Notification(text)
  }
}
