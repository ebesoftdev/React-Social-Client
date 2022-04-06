import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmitPost from '../post/SubmitPost'
import { getGroupPostsAsync, getPostsAsync, postGroupPostAsync, postPostAsync, selectPosts } from '../post/postSlice'
import PostComponent from '../post/PostComponent'
import SubmitComment from '../comment/SubmitComment';
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';
import RefreshIcon from '../../assets/images/refreshicon.svg'
import { selectGroup } from '../group/groupSlice';
import { Post } from "../post/post"
import SearchBarGroup from './SearchBarGroup';

export let util = {
  updateAll: (isGroup: boolean) => { },
  leavePost: () => { },
  leaveComment: (npostId: number) => { },
  dispatchComment: () => { },
  dispatchPost: (isGroup: boolean) => { }
};

    //isGroup: boolean;

function Discover(props: {isGroup: boolean}) {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);

  const [postId, setPostId] = useState(0);

  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);

  const group = useSelector(selectGroup);

  util.updateAll = (isGroup: boolean) => {
    isGroup ? 
    dispatch(getGroupPostsAsync(group.name))
    :
    dispatch(getPostsAsync({}));
    setShouldUpdateLikes([!shouldUpdateLikes[0]]); // :^) 
    
    // console.log("Updated feed");
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
    createComment(postId, comment).then(() => util.updateAll(props.isGroup));
  }

  util.dispatchPost = (isGroup) => {
    isGroup ? dispatch(postGroupPostAsync(post)) : dispatch(postPostAsync(post));
  }

  useEffect(() => {
    util.updateAll(props.isGroup);
    
    let newPost: Post = post;
    if (props.isGroup) { 
      newPost.groupID = group.groupID;
    } else {
      newPost.groupID = "";
    }

    setPost(newPost);
  }, [])

  return (
    <div id="GroupfeedBody">
      <SearchBarGroup />
      <div id="postColumn">

        <SubmitPost
          setPost={setPost}
          post={post}
          dispatchPost={util.dispatchPost}
          show={modalShowPost}
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
        {posts.map((post) => (<PostComponent shouldUpdateLikes={shouldUpdateLikes}
          post={post} leaveComment={util.leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default Discover;
