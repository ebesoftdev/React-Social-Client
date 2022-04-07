import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, add, update } from '../post/postSlice';
import PostComponent from '../post/PostComponent'
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';
import { selectGroup } from '../group/groupSlice';
import { Post } from "../post/post"
import SearchBarGroup from './SearchBarGroup';
import { getAllGroupPosts, getAllPosts, createGroupPost, createPost } from '../post/post.api';


function Discover({isGroup}: {isGroup: boolean}) {
  const [comment, setComment] = useState(initialComment);
  const [post, setPost] = useState(initialPost);
  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);
  const [postId, setPostId] = useState(0);
  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);
  
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
    // posts = [{
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
    // }];
    
    dispatch(update(posts));
      
    setShouldUpdateLikes([!shouldUpdateLikes[0]]);
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
    createComment(postId, comment).then(() => updateAll(isGroup));
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
      <SearchBarGroup />
      {posts.map((post) => (<PostComponent shouldUpdateLikes={shouldUpdateLikes}
        post={post} leaveComment={leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default Discover;
