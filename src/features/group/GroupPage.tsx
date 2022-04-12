import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Feed from "../feed/Feed";
import { setGroup } from "./groupSlice";
import { getGroupByName } from "./Group.api";

// Components
import GroupInformation from "./GroupInformation";

export default function GroupPage() {

  const [doneLoading, setDoneLoading] = useState(false);
  const { groupName } = useParams();

  const dispatch = useAppDispatch();

  async function getGroupInformation(name: string | undefined) {
    console.log(name);
    
    if (name) {
        try {
          const group = await getGroupByName(name);
          // const group = {
          //   groupID: '12345',
          //   owner : {
          //     id: '54321',
          //     email: 'aidan@mail.com'
          //   },
          //   name : 'Aidan',
          //   description : 'My group',
          //   headerImg : '',
          //   profilePic : '',
          //   joinedUsers : []
          // }
          
          dispatch(setGroup(group));
          setDoneLoading(true);
        } catch (err) {
          console.log(err);
        }
    }
  }

  useEffect(() => {
      getGroupInformation(groupName);
  });

  return (doneLoading ?
      <>
          <GroupInformation />
          <h2 className='text-center mt-3'>Group Feed</h2>
          <Feed isGroup={true} />
      </>
      :(<Image id="LoadingImg" src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"} 
      style={{height:'192px', width: '300px'}} fluid data-testid="gif"/>))
    
}