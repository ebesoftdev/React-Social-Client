import User from "../login/User";

export interface Group {
  key: {
    groupID: string
    owner : User
    name : string
    description : string
    headerImg : string
    profilePic : string
    joinedUsers : User[]
  }
}