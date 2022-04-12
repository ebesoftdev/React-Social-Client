import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, add, update } from '../post/postSlice';
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';
import { selectGroup } from '../group/groupSlice';
import { Post } from "../post/post"
import { getAllGroupPosts, getAllPosts, createGroupPost, createPost } from '../post/post.api';

// components
import SearchBarGroup from './SearchBarGroup';
import PostComponent from '../post/PostComponent'
import SubmitComment from '../comment/SubmitComment';


function Discover({isGroup}: {isGroup: boolean}) {
  const [comment, setComment] = useState(initialComment);
  const [post, setPost] = useState(initialPost);
  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);
  const [postId, setPostId] = useState(0);
  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);
  const [shouldUpdateCanBookmark, setShouldUpdateCanBookmark] = useState([false]);
  
  const posts = useSelector(selectPosts);
  const group = useSelector(selectGroup);
  
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

  const leaveComment = (npostId: number) => {
    setComment(initialComment);
    setPostId(npostId);
    setModalShowComment(true);
  }

  const dispatchComment = () => {
    createComment(postId, comment).then(() => updateAll(isGroup));
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
      <SearchBarGroup />
      <SubmitComment
          setComment={setComment}
          comment={comment}
          show={modalShowComment}
          dispatchComment={dispatchComment}
          onHide={() => setModalShowComment(false)}
          postId={postId}
        />
      {posts.map((post) => (<PostComponent author={post.authorID} shouldUpdateLikes={shouldUpdateLikes} shouldUpdateCanBookmark={shouldUpdateCanBookmark}
        post={post} leaveComment={leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default Discover;
