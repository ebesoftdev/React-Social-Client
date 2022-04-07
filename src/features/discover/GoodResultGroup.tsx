import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import SearchResult from '../search/SearchResult';

export default function GoodResultGroup({ results }: {results: SearchResult[]}) {
  const [groups, setGroups] = useState([]);

  // useEffect(() => { 
  //   const groupArr = results.map(async result => {
  //     const resp = await reverbClientWithAuth.get(`/api/group/${result.label}`);
  //     return resp;
  //   });

  //   setGroups(groupArr);
  // }, []);

  const handleClick = () => {
    followGroup();
  }

  const followGroup = async () => {
    // const resp = await reverbClientWithAuth.put(`/api/group/join/${results.label}`);
  }

  console.log(results);

  return (
    <>
      {results.map((result: SearchResult) => (
      <div>
        <NavLink
          className='search-resultGroup'
          to={"/group/" + result.label}
          // key={group.name}
        >
          {/* <img className='profile-pic-mini' src={group.profilePic}/> */}
          {result.label}
        </NavLink>
        <button type='button' className="follow-btn" onClick={handleClick}>
          FOLLOW
        </button>
      </div>
    ))}
    </>
  );
}
