import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, add, update } from '../post/postSlice';
import { getFollowingPosts, createPost } from '../post/post.api';
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';

// components
import SearchBar from '../search/SearchBar';
import PostComponent from '../post/PostComponent';
import SubmitComment from '../comment/SubmitComment';
import SubmitPost from '../post/SubmitPost';

export let util = {
  updateAll: () => { },
  leavePost: () => { },
  leaveComment: (npostId: number) => { },
  dispatchComment: () => { },
  dispatchPost: () => { }
};

const FollowingFeed = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);

  const [postId, setPostId] = useState(0);

  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);
  const [shouldUpdateCanBookmark, setShouldUpdateCanBookmark] = useState([false]);

  util.updateAll = async () => {
    const posts = await getFollowingPosts();
  
    
    dispatch(update(posts));

    setShouldUpdateLikes([!shouldUpdateLikes[0]]); // :^);
    setShouldUpdateCanBookmark([!shouldUpdateCanBookmark[0]]);
  }

  const [comment, setComment] = useState(initialComment);
  const [post, setPost] = useState(initialPost);

  util.leavePost = () => {
    setPost(initialPost);
    setModalShowPost(true);
  }

  util.leaveComment = (npostId: number) => {
    setComment(initialComment);
    setPostId(npostId);
    setModalShowComment(true);
  }

  util.dispatchComment = () => {
    createComment(postId, comment).then(() => util.updateAll());
  }

  util.dispatchPost = async () => {
    const createdPost = await createPost(post);

    dispatch(add(createdPost));
  }

  useEffect(() =>{
    util.updateAll();
  },[]);

  return (
    <div id="feedBody">
      <SearchBar />
      <div id="postColumn">
        <div id="feedButtons"> 
        </div>
        <SubmitPost
          setPost={setPost}
          post={post}
          dispatchPost={util.dispatchPost}
          showModal={modalShowPost}
          onHide={() => setModalShowPost(false)}
        />
        <SubmitComment
          setComment={setComment}
          comment={comment}
          show={modalShowComment}
          dispatchComment={util.dispatchComment}
          onHide={() => setModalShowComment(false)}
          postId={postId}
        />
        
      </div>
      {posts.map((post) => (<PostComponent shouldUpdateLikes={shouldUpdateLikes} shouldUpdateCanBookmark={shouldUpdateCanBookmark}
          post={post} leaveComment={util.leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default FollowingFeed;
