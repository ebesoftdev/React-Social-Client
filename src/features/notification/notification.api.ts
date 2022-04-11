import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient"

export const getNotification = async (notificationId: string) => {
    const resp = await reverbClientWithAuth.get("/api/notification/d5ERictvfpdyQ791YQ3dmnG2jQP2");
    console.log("HEYO: " + resp);
    
    return resp;
}

export const getNotificationsByOwner = async (ownerId: string) => {
  const resp = await reverbClientWithAuth.get(`/api/notifications/owner/${ownerId}`);

  return resp;
}