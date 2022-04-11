const Notifications = ({loggedIn}: {loggedIn: string}) => {
  if (!loggedIn)
    return (<></>)
  else
    return (
      <div id="notifications"></div>
    )
}

export default Notifications;