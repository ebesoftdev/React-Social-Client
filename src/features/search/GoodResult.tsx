import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Profile } from '../profile/profile';

export default function GoodResult({ user }: any) {
  
  const [ profile, setProfile ] = useState<Profile>();

  useEffect(() => { 
    const getProfileId = async () => {
      if (!profile) {
        const resp = await reverbClientWithAuth.get(`/api/profile/getByAuthor/${user.key}`);
        
        console.log(resp.data);
        setProfile(resp.data);
      }
    };
    getProfileId();
  }, []);

  const handleClick = () => {
    followUser();
  }

  const followUser = async () => {
    const resp = await reverbClientWithAuth.put(`/api/user/follow-user/${user?.key}`);
  }

  return (
    <div>
      <NavLink
        className='search-result'
        to={"/user_profile/" + profile?.id}
        key={profile?.id}
      >
        <img className='profile-pic-mini' src={profile?.profile_img}/>
        {profile?.first_name}&nbsp;&nbsp;
        {user.label}
      </NavLink>
      <button type='button' className="follow-btn" onClick={handleClick}>
        FOLLOW
      </button>
      <br key={profile?.id + "1"}/>
    </div>
  );
}
