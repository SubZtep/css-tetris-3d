export const notify = async (text: string): Promise<Notification> => {
  if (Notification.permission === "default") {
    if (await Notification.requestPermission() === "denied") {
      console.warn("Will alert instead")
      return
    }
  }

  if (Notification.permission === "denied") {
    alert(text)
    return
  }

  if (Notification.permission === "granted") {
    return new Notification(text)
  }
}
