import User from "../login/User"

export interface Profile {

  id: string,
  first_name: string,
  last_name: string,
  birthday: string,
  hobby: string,
  location: string,
  profile_img: string,
  header_img: string,
  about_me: string,
  user_id: string,
  follower_num: number,
  following_num: number,
  followers: Array<User>,
}

export interface FollowerResponse{
  firstName: string,
  lastName: string,
  email: string,
  profilePicURL: string
}

export const initialProfile = {
  id: '',
  first_name: '',
  last_name: '',
  birthday: '',
  hobby: '',
  location: '',
  profile_img: '',
  header_img: '',
  about_me: '',
  user_id: '',
  follower_num: 0,
  following_num: 0,
  followers: []
}