import { useSelector } from "react-redux";
import {MdOutlineError} from "react-icons/md"

function Avatar({}) {
  const {user, isAuth} = useSelector(state => state.auth)

    return ( 
        <i className="avatar">
          {user?.firstname?.substring(0, 1)}
          {!user.isActivated ? <i className="warning"><MdOutlineError /></i> : '' }
        </i>
     );
}

export default Avatar;