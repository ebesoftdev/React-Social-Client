import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, add, update } from '../post/postSlice';
import { getAllGroupPosts, getAllPosts, createGroupPost, createPost } from '../post/post.api';
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';
import RefreshIcon from '../../assets/images/refreshicon.svg'
import { selectGroup } from '../group/groupSlice';
import { Post } from "../post/post"
import { postNotification, getNotificationsByOwner } from "../notification/notification.api";
import { setNotifications } from '../notification/notificationSlice';
import { selectUser } from '../login/userSlice';

// components
import SearchBar from '../search/SearchBar';
import PostComponent from '../post/PostComponent'
import SubmitComment from '../comment/SubmitComment';
import SubmitPost from '../post/SubmitPost'

function Feed({isGroup}: {isGroup: boolean}) {
  const [comment, setComment] = useState(initialComment);
  const [post, setPost] = useState(initialPost);
  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);
  const [postId, setPostId] = useState(0);
  const [ownerId, setOwnerId] = useState('');
  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);
  const [shouldUpdateCanBookmark, setShouldUpdateCanBookmark] = useState([false]);
  
  const posts = useSelector(selectPosts);
  const group = useSelector(selectGroup);
  const user = useSelector(selectUser);
  
  const dispatch = useDispatch();

  const updateAll = async (isGroup: boolean) => {
    let posts;
    if (isGroup) {
       posts = await getAllGroupPosts(group.name);
    } else {
       posts = await getAllPosts();
    }
    
    dispatch(update(posts));
      
    setShouldUpdateLikes([!shouldUpdateLikes[0]]);
    setShouldUpdateCanBookmark([!shouldUpdateCanBookmark[0]]);
  }

  const leavePost = () => {
    setPost(initialPost);
    setModalShowPost(true);
  }

  const leaveComment = (npostId: number, nOwnerId: string) => {
    setComment(initialComment);
    setPostId(npostId);
    setOwnerId(nOwnerId);
    setModalShowComment(true);
  }

  const dispatchComment = () => {
    createComment(postId, comment)
      .then(async () => {
        updateAll(isGroup);
        try {
          const notifRes = await postNotification(
            {
              otherUserId: ownerId, 
              type_id: {
                id: '2',
                typeName: 'comment'
              }
            }
          );
          console.log(notifRes);
          
          const res = await getNotificationsByOwner(user.id);
          dispatch(setNotifications(res.data));

        } catch (err) {
          console.log(err);
        }

      });
  }

  const dispatchPost = async (isGroup?: boolean) => {
    let createdPost;
     isGroup ? createdPost = await createGroupPost(post) : createdPost = await createPost(post);
    // createdPost = {
    //   id: "123445",
    //   title: "title",
    //   postText: "some text here",
    //   contentLink: "",
    //   contentType: "",
    //   date: new Date(),
    //   comments: [],
    //   authorID: "Aidan",
    //   groupID: "",
    //   groupName: ""
    // };

    dispatch(add(createdPost));
    updateAll(isGroup as boolean);
  }

  useEffect(() => {
    updateAll(isGroup);
    
    let newPost: Post = post;
    if (isGroup) { 
      newPost.groupID = group.groupID;
    } else {
      newPost.groupID = "";
    }

    setPost(newPost);
  }, []);

  return (
    <div id="feedBody">
      <SearchBar />
      <div id="postColumn">
        <div id="feedButtons"> 
          <Button data-testid="postButton" id="postBtn" className='feed-btns' variant="primary" onClick={() => leavePost()}>
            + Create Post
          </Button>
          <Button data-testid="refreshButton" id="refreshBtn" className='feed-btns' variant="primary" onClick={() => updateAll(isGroup)}>
            <img id="refresh-icon" src={RefreshIcon} /> Refresh
          </Button>
        </div>
        <SubmitPost
          setPost={setPost}
          post={post}
          dispatchPost={dispatchPost}
          showModal={modalShowPost}
          onHide={() => setModalShowPost(false)}
        />
        <SubmitComment
          setComment={setComment}
          comment={comment}
          show={modalShowComment}
          dispatchComment={dispatchComment}
          onHide={() => setModalShowComment(false)}
          postId={postId}
        />
        </div>
        {posts.map((post) => (<PostComponent author={post.authorID} shouldUpdateLikes={shouldUpdateLikes} shouldUpdateCanBookmark={shouldUpdateCanBookmark}
          post={post} leaveComment={leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default Feed;
