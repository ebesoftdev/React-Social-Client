export default interface NotificationRequest {
  otherUserId: string,
  type_id: {
    id: string,
    typeName: string
  }
}