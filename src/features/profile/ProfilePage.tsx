import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";
import { useParams } from "react-router";
import {getNotification} from "../notification/notification.api"

export default function ProfilePage(props: any) {

  console.log("Running getnotofication");
  
  getNotification("d5ERictvfpdyQ791YQ3dmnG2jQP2").then(resp => console.log(resp)).catch(err => console.log(err));
 
  
  return(
    <>
      <SearchBar />
      {console.log(props) }
      {console.log(useParams)}
      <ProfileInformation beep={props.beep}/>
      
    </>
  )
}
