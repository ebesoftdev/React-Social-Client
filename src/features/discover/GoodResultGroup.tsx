import { useState, useEffect, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import SearchResult from '../search/SearchResult';
import Group from './Group';

export default function GoodResultGroup({ results }: {results: SearchResult[]}) {
  const [groups, setGroups] = useState<[Group] | []>();

  useEffect(() => { 
    const createGroups = async () => {
      const groupsArr: [Group] | [] = [];
      
      for (let i = 0; i < results.length; i++) {
        const group = {key: '', label: '', profilePic: ''};
        
        group.key = results[i].key;
        group.label = results[i].label;

        const resp = await reverbClientWithAuth.get(`/api/group/${results[i].label}`);
        group.profilePic = resp.data.profilePic;

        groupsArr.push(group as never);
      }

      setGroups(groupsArr);
    }
    
    createGroups();
  }, []);

  const handleClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;
    const aElement = target.previousSibling as HTMLAnchorElement;

    followGroup((aElement.getAttribute('id') as string));
  }

  const followGroup = async (label: string) => {
    reverbClientWithAuth.put(`/api/group/join/${label}`);
  }

  return (
    <>
      {groups && (groups as [Group]).map(group => (
      <div>
        <NavLink
          className='search-resultGroup'
          to={"/group/" + group.label}
          key={group.label}
          id={group.label}
        >
          <img className='profile-pic-mini' src={group.profilePic}/>
          {group.label}
        </NavLink>
        <button type='button' className="follow-btn" onClick={handleClick}>
          FOLLOW
        </button>
      </div>
    ))}
    </>
  );
}
