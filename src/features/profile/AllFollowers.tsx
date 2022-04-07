import { useEffect, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReverbIcon from '../../assets/images/reverb_icon_final.png';
import { formatYT } from "../../util/youtubeFunctions";
import { getProfile, getProfileByAuthor, getProfileById } from "./profile.api";
import { Profile, initialProfile } from "./profile";
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, update } from "./profileSlice";

export let util = {
    updateAll: () => { },
    dispatchUser: () => { }
}

const AllFollowers = () => {

    const dispatch = useDispatch();

    const profile = useSelector(selectProfile);

    const [modelShowFollower, setModalShowFollower] = useState(false);

    const [userId, setUserId] = useState(0);

    const [shouldUpdateFollow, setShouldUpdateFollow] = useState([false]);

    util.updateAll = async () => {
        const profile = await getProfile();
        dispatch(update(profile));
        setShouldUpdateFollow([!shouldUpdateFollow[0]]);
    }

    useEffect(() =>{
        util.updateAll();
      },[]);

      console.log(profile);

    return (
        <>
            <h1>Followers</h1>
            {profile.followers.map(follower => (<p>{follower.email}</p>))}
        </>
    )
}

export default AllFollowers;


