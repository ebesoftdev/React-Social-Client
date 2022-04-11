import { FollowerResponse, Profile } from "./profile";
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient"

export const getProfile = async () => {
    const {data: profile} = await reverbClientWithAuth.get<Profile>("/api/profile/getUsersProfile");
    return profile;
}

export const updateProfile = async (updatedProfile:Profile):Promise<Profile> => {
    const { data: profile } = await reverbClientWithAuth.put<Profile>("/api/profile/update", updatedProfile);
    return profile;
}

export const getProfileById = async (id: string) => {
    const {data: profile} = await reverbClientWithAuth.get<Profile>("/api/profile/"+id);
    return profile;
}

export const getProfileByAuthor = async (id: string) => {
    const {data: profile} = await reverbClientWithAuth.get<Profile>("/api/profile/getByAuthor/"+id);
    return profile;
}

export const checkProfileOwnership = async (id: string) => {
    const {data: owns} = await reverbClientWithAuth.get<boolean>("/api/profile/checkProfileOwnership/"+id);
    return owns;
}

export const getProfileByUserId = async (id: string) => {
    const {data: profile} = await reverbClientWithAuth.get<Profile>("/api/user/getProfileByUserId/"+id);
    return profile;
}

export const getFollowersProfileByUserId = async (id: string) => {
    const {data: profiles} = await reverbClientWithAuth.get<FollowerResponse[]>("/api/user/getFollowerProfilesByUserId/"+id);
    return profiles;
}

export const getFollowingsProfileByUserId = async (id: string) => {
    const {data: profiles} = await reverbClientWithAuth.get<FollowerResponse[]>("/api/user/getFollowingProfilesByUserId/"+id);
    return profiles;
}