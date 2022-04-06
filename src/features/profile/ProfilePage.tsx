import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";

/* if beep is false, get profile from profile id in uri, 
otherwise get the current user's profile.
*/
export default function ProfilePage({beep}: {beep: boolean}) {
  return(
    <>
      <SearchBar />
      <ProfileInformation beep={beep}/>
    </>
  )
}
