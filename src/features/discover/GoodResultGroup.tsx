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
        
        setGroup(resp.data);
      }
    };
    console.log(group);
    getGroupID();
    console.log(group);
    
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
        to={"/group/" + group?.name}
        key={group?.name}
      >
        <img className='profile-pic-mini' src={group?.profilePic}/>
        {group?.name}&nbsp;&nbsp;
        {user.label}
      </NavLink>
      <button type='button' className="follow-btn" onClick={handleClick}>
        FOLLOW
      </button>
      <br key={group?.name + "1"}/>
    </div>
  );
}
