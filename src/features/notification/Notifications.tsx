import { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { getNotificationsByOwner } from './notification.api';
import { useSelector } from 'react-redux';
import { selectAuth } from '../login/authSlice';
import { selectUser } from '../login/userSlice';

const Notifications = ({loggedIn}: {loggedIn: string}) => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);

  const token = useSelector(selectAuth);
  const user = useSelector(selectUser);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    console.log(user.id);
    console.log(token);
    
    if (user.id && token) {
      getNotificationsByOwner(user.id)
      .then(res => {
        console.log(res);
        setNotifications(res.data);
      })
      .catch(err => console.log(err));
    }
  }, [token, user]);
  
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
            {notifications ? 
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