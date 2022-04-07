import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Group } from '../group/Group';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroup, setGroup } from '../group/groupSlice';

export default function GoodResultGroup({ user }: any) {
  const groupState = useSelector(selectGroup);
  const [ group, setGroupLocal ] = useState<Group>(groupState);

  const dispatch = useDispatch();

  useEffect(() => { 
    const getGroupID = async () => {
      if (!group) {
        const resp = await reverbClientWithAuth.get(`/api/group/${user.label}`);
        
        console.log(resp);
        console.log(resp.data);

        dispatch(setGroup(resp.data));
        setGroupLocal(groupState);
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
        key={group.name}
      >
        <img className='profile-pic-mini' src={group.profilePic}/>
        {group.name}&nbsp;&nbsp;
        {user.label}
      </NavLink>
      <button type='button' className="follow-btn" onClick={handleClick}>
        FOLLOW
      </button>
      <br key={group.name + "1"}/>
    </div>
  );
}
