function LinkSidebar({ route }) {
  return (
    <>
      <i className="sidebar-cabient__icon">{route.icon}</i>
      <span>{route.title}</span>
    </>
  );
}

export default LinkSidebar;
