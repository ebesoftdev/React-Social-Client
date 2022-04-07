import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Group } from '../group/Group';

export default function GoodResultGroup({ user }: any) {
  
  const [ group, setGroup ] = useState<Group>();

  useEffect(() => { 
    const getGroupID = async () => {
      if (!group) {
        const resp = await reverbClientWithAuth.get(`/api/group/${user.label}`);
        console.log(resp);
        
        console.log(resp.data);
        setGroup(resp.data);
      }
    };
    
    getGroupID()
  }, []);

  const handleClick = () => {
    followGroup();
  }

  const followGroup = async () => {
    const resp = await reverbClientWithAuth.put(`/api/group/join/${user?.label}`);
  }

  return (
    <div>
      <NavLink
        className='search-resultGroup'
        to={"/group/" + user?.label}
        key={group?.key?.name}
      >
        <img className='profile-pic-mini' src={group?.key?.profilePic}/>
        {group?.key?.name}&nbsp;&nbsp;
        {user.label}
      </NavLink>
      <button type='button' className="follow-btn" onClick={handleClick}>
        FOLLOW
      </button>
      <br key={group?.key?.name + "1"}/>
    </div>
  );
}
