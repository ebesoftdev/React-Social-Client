import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, add, update } from '../post/postSlice';
import { getPersonalPosts, createPost } from '../post/post.api';
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';
import RefreshIcon from '../../assets/images/refreshicon.svg';

// components
import SearchBar from '../search/SearchBar';
import PostComponent from '../post/PostComponent';
import SubmitPost from '../post/SubmitPost';
import SubmitComment from '../comment/SubmitComment';

const PersonalFeed = () => {
  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);
  const [postId, setPostId] = useState(0);
  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);
  const [shouldUpdateCanBookmark, setShouldUpdateCanBookmark] = useState([false]);
  const [comment, setComment] = useState(initialComment);
  const [post, setPost] = useState(initialPost);
  
  const posts = useSelector(selectPosts);
  
  const dispatch = useDispatch();

  const updateAll = async () => {
    const posts = await getPersonalPosts();
    
    dispatch(update(posts));

    setShouldUpdateLikes([!shouldUpdateLikes[0]]);
    setShouldUpdateCanBookmark([!shouldUpdateCanBookmark[0]]);
  }

  const leavePost = () => {
    setPost(initialPost);
    setModalShowPost(true);
  }

  const leaveComment = (npostId: number) => {
    setComment(initialComment);
    setPostId(npostId);
    setModalShowComment(true);
  }

  const dispatchComment = () => {
    createComment(postId, comment).then(() => updateAll());
  }

  const dispatchPost = async () => {
    const createdPost = await createPost(post);
    
    dispatch(add(createdPost));
    updateAll();
  }

  useEffect(() => {
    updateAll();
  }, [])

  return (
    <div id="feedBody">
      <SearchBar />
      <div id="postColumn">
        <div id="feedButtons"> 
          <Button data-testid="postButton" id="postBtn" className='feed-btns' variant="primary" onClick={() => leavePost()}>
            + Create Post
          </Button>
          <Button data-testid="refreshButton" id="refreshBtn" className='feed-btns' variant="primary" onClick={() => updateAll()}>
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
      {posts.map((post) => (<PostComponent shouldUpdateLikes={shouldUpdateLikes} shouldUpdateCanBookmark={shouldUpdateCanBookmark}
          post={post} leaveComment={leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default PersonalFeed;
