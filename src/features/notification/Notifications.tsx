import { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { getNotificationsByOwner, setNotificationsToRead } from './notification.api';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../login/authSlice';
import { selectUser } from '../login/userSlice';
import { selectNotifications, setNotifications } from './notificationSlice'; 

const Notifications = ({loggedIn}: {loggedIn: string}) => {
  const [showModal, setShowModal] = useState(false);

  const token = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  const toggleModal = () => {
    if (showModal) {
      const ids = notifications.map(notification => notification.id) as string[];

      setNotificationsToRead(ids);
    }
    
    setShowModal(!showModal);
  }

  useEffect(() => {
    if (user.id && token) {
      getNotificationsByOwner(user.id)
      .then(res => {
        dispatch(setNotifications(res.data));
      })
      .catch(err => console.log(err));
    }
  }, [token, user, showModal]);
  
  if (!loggedIn)
    return (<></>)
  else
    return (
      <>
        <div id="notifications-icon" onClick={toggleModal}>
          <i className="btn bi bi-bell"></i>
        </div>
        <Modal
          id="notifications-modal"
          show={showModal}
          onHide={toggleModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{"Notifications"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {notifications.length ? 
              notifications.map((notification: any) => (
                <div id={notification.id}>
                  {notification.type_id.typeName === 'like' ?
                    (<p>{notification.otherUser.email} liked your post!</p>)
                  :
                    (<p>{notification.otherUser.email} commented on your post!</p>)
                  } 
                </div>
              ))
            : 
              (<p>No notifications</p>)
            }
          </Modal.Body>
        </Modal>
      </>
    )
}

export default Notifications;