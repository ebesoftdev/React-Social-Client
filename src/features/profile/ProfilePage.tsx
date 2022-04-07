import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";
import { useParams } from "react-router";
import {getNotification} from "../notification/notification.api"

export default function ProfilePage(props: any) {

  console.log("Running getnotofication");
  
  const resp = getNotification("d5ERictvfpdyQ791YQ3dmnG2jQP2").then(resp => console.log(resp)).catch(err => console.log(err));
  console.log(resp);
  
  return(
    <>
      <SearchBar />
      {console.log(props) }
      {console.log(useParams)}
      {console.log(resp)}
      <ProfileInformation beep={props.beep}/>
      
    </>
  )
}
