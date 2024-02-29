export const DevicesIconSelection = (device: string) => {
  if (device.startsWith('Chrome,Windows')) {
    return 'PC'
  }
  if (device.startsWith('Microsoft Edge,Windows')) {
    return 'PC'
  }
  if (device.startsWith('Chrome,GNU/Linux')) {
    return 'Phone'
  }
  if (device.startsWith('Chrome Mobile,Android')) {
    return 'Phone'
  }
}
