import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import NotificationRequest from "./NotificationRequest";

export const getNotificationsByOwner = async (ownerId: string) => {
  const resp = await reverbClientWithAuth.get(`/api/notifications/owner/${ownerId}`);

  return resp;
}

export const postNotification = async (notificationRequest: NotificationRequest) => {
  const resp = await reverbClientWithAuth.post(`/api/notifications/create`, notificationRequest);

  return resp;
}