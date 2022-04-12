import { useEffect, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReverbIcon from '../../assets/images/reverb_icon_final.png';
import { unfollowUser } from "../follow/followers.api";
import { getProfile, getProfileByAuthor, getProfileById } from "./profile.api";
import { Profile, initialProfile } from "./profile";
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, update, selectFollowerProfiles } from "./profileSlice";
import { useHistory } from "react-router-dom";

export let util = {
    updateAll: () => { },
    dispatchUser: () => { }
}

const AllFollowings = () => {

    const dispatch = useDispatch();

    const profile = useSelector(selectProfile);

    const followerProfiles = useSelector(selectFollowerProfiles);

    const history = useHistory();

    const [shouldUpdateFollow, setShouldUpdateFollow] = useState([false]);

    util.updateAll = async () => {
        const profile = await getProfile();
        dispatch(update(profile));
        setShouldUpdateFollow([!shouldUpdateFollow[0]]);
    }

    const unfollowFollower=(userId:string)=>{
        unfollowUser(userId);
    }

    useEffect(() =>{
        util.updateAll();
      },[]);

      console.log(profile);

    return (
        <>
            <h1 className="text-center">Followings</h1>
            <div className="followerCardContainer">
            {followerProfiles.map(follower => (
            <Card className="followerCard m-3">
                <Card.Img variant="top" src={follower.profilePicURL} style={{height:"100px", width:"100px"}}/>
                <Card.Body>
                    <Card.Text>
                    {follower.firstName} {follower.lastName}
                    </Card.Text>
                    <Card.Title>{follower.email}</Card.Title>

                    {/* <div className="">
                        <Button variant="primary" onClick={()=> unfollowFollower(follower.followerId) }>Unfollow</Button>
                    </div> */}
                    </Card.Body>
            </Card>))}
            </div>
        </>
    )
}

export default AllFollowings;


