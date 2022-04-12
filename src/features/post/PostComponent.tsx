import { useEffect, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Post } from './post';
import { checkIfPostCanBeLiked, getNumLikes, likePost, unlikePost } from "../like/likes.api";
import { bookmarkPost, checkIfPostCanBeBookmarked, removeBookmark } from "../bookmark/bookmarks.api";
import { Link } from "react-router-dom";
import ReverbIcon from '../../assets/images/reverb_icon_final.png';
import BookmarkIcon from '../../assets/images/bookmark_icon.png';
import { formatYT } from "../../util/youtubeFunctions";
import { getProfile, getProfileByAuthor, getProfileById } from "../profile/profile.api";
import { Profile, initialProfile } from "../profile/profile";

const  PostComponent =  ({ shouldUpdateLikes, post, leaveComment, shouldUpdateCanBookmark }: 
    { shouldUpdateLikes: boolean[], post: Post, leaveComment: any, shouldUpdateCanBookmark: boolean[] }) =>  {

    const initialLikes: number = 0;
    const [canLike, setCanLike] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const [canBookmark, setCanBookmark] = useState(true); 
    const [authorProfile, setAuthorProfile] = useState<Profile>(initialProfile);
    const [commentAuthor, setCommentAuthor] = useState<Profile>(initialProfile);

    const updateLikes = () => {
        // console.log("Calling backend to update likes on post " + post.id);
        getNumLikes(post.id)
            .then(
                (data) => { setLikes(data) }
            );
    }

    const updateCanBookmark = () => {
        checkIfPostCanBeBookmarked(post.id)
            .then(
                (data) => { setCanBookmark(data);}
            );
    }

    

    const likePostFunc = () => {
        if (canLike)
        {
            setCanLike(false);
            likePost(post.id).then(async () => {
                //instead of making another DB call, it just updates the likes by 1
                setLikes(likes + 1);
            }).catch((e) => {
                //unsuccessful
                setCanLike(true);
                console.log(e)
            })
        }
        else 
        {
            setCanLike(true);
            unlikePost(post.id).then(async () => {
                setLikes(likes - 1);
            }).catch((e) => {
                //unsuccessful
                setCanLike(false);
                console.log(e)
            })
        }
        
    }


    const addBookmark = () => {
        bookmarkPost(post.id).then(async () => {
            console.log("Bookmark added: ", post.id);
            setCanBookmark(false);
        }).catch((e)=>{
            setCanBookmark(true);
            console.log(e);
        })
    }

    const deleteBookmark = () => {
        removeBookmark(post.id).then(async () => {
            console.log("Bookmark removed: ", post.id);
            setCanBookmark(true);
        }).catch((e)=>{
            setCanBookmark(false);
            console.log(e);
        })
    }

    const getPostAuthor = () => {
        getProfileByAuthor(post.authorID).then(function (data) {
            setAuthorProfile(data);
        }); 
    }

    function getCommentAuthor(cAuthId: string){
        const getcAuth = () => {
                getProfileByAuthor(cAuthId).then(function(data) {
                setCommentAuthor(data);
            });
        }

        getcAuth();
    
    }


    

    //checks to see if the post can be liked
    //updates the number of likes
    
    useEffect(() => {
        updateLikes();
        updateCanBookmark();
        getPostAuthor();
        checkIfPostCanBeLiked(post.id).then(canLikeReturn => setCanLike(!canLikeReturn));
        checkIfPostCanBeBookmarked(post.id).then(canBookmarkReturn => setCanBookmark(!canBookmarkReturn));
    }, [shouldUpdateLikes, shouldUpdateCanBookmark]); 

    // Fetch the profile of the post's author to be linked
    
    
    

    //console.log("Outside post author!");
    //console.log(authorProfile);

    
    
    

    return (
        <Card id="postCard">
            <Card.Header>
                {/* Link to the group's profile in Reverb*/}
                {post.groupName && <Card.Subtitle id="group"><Link to={`/group/${post.groupName}`}>{`${post.groupName} / `}</Link></Card.Subtitle>}
                {/* Link to the poster's profile in Reverb*/}
                <Card.Subtitle id="postAuthor"><Link to={`/profile/${authorProfile.id}`}>{"" + authorProfile.first_name} {"" + authorProfile.last_name}</Link></Card.Subtitle>
                {/*Date that the post was made.*/}
                <Card.Text id = "postTime">{"" + new Date(post.date + 'Z').toLocaleString() }</Card.Text>
                {/*To like the post*/}
                <Button data-testid="reverbButton" id="reverbButton" onClick={() => likePostFunc()} variant="warning"
                    style={{ float: 'right', marginTop: "-2rem", fontSize:"20px" }}>{likes}<img id="reverbIcon" src={ReverbIcon} alt="Click to Like!"/></Button>
                
                {canBookmark?
                    <Button data-testid="bookmarkButton" id="bookmarkButton" onClick={addBookmark} variant="warning"
                    style={{ float: 'right', marginTop: "-2rem", marginRight: "1rem"}}><i style={{fontSize:"20px"}} className="bi bi-bookmark-plus"></i></Button>:
                    <Button data-testid="bookmarkButton" id="bookmarkButton" onClick={deleteBookmark} variant="warning"
                    style={{ float: 'right', marginTop: "-2rem", marginRight: "1rem" }}><i style={{fontSize:"20px"}} className="bi bi-bookmark-check"></i></Button>   
                }
                
            </Card.Header>
            <Card.Body id="postBody">
                {/*Sets the contents of a post. First by setting the embed. */}
                {post.contentType == 'VID' && <Card.Img as ='iframe' variant='top' id="postVideo" src={"https://www.youtube.com/embed/" + formatYT(post.contentLink)} frameBorder='0' allowFullScreen/>}
                {post.contentType == 'IMG' && <Card.Img variant='top' id="postImage" src={"" + post.contentLink} />}
                <Card.Text style={{ whiteSpace:'pre', maxHeight: '28vh', overflowY:'auto' }} >
                    {post.postText}
                </Card.Text>
            </Card.Body>
            
            <ListGroup id="commentBody" className="list-group-flush" >
                
                {post.comments && post.comments.map((comment, idx) => {

                    return (
                    <ListGroupItem key={idx}>
                        {comment.commentText}
                        <footer id="commentFooter" style={{ float: "right", fontSize: "0.8rem", marginTop: "0.8rem" }}>
                             <Link to={`profile/${comment.author?.pfId}`}>{comment.author?.firstname} {comment.author?.lastname}</Link> | {new Date(comment.date + 'Z').toLocaleString()}
                             
                        </footer>
                    </ListGroupItem>
                )
                })}

            </ListGroup>
                
                
            <Card.Body>
                <Button data-testid="submitButton" id="leaveCommentBtn" onClick={() => leaveComment(post.id)}>Leave Comment</Button>
            </Card.Body>
        </Card>
    );
}

export default PostComponent;
