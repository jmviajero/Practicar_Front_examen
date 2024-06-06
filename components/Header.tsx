import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx"

type Prop ={
  username: string
}

const Header: FunctionComponent<Prop> = ({username}) => {
  return(
        <header className="header-container">
        <div className="header-content">
          <span className="user-name">{username}</span>
          <Logout />
        </div>
      </header>
    )
}
export default Header