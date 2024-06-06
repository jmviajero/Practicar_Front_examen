import { FunctionComponent } from "preact";

const Logaut: FunctionComponent = () => {
    const OnLogout = () => {
        //borrar cookie
        document.cookie = "auth=;  path=/;"
        document.location.href = "/login"
    }
    return(
        <a onClick={()=>OnLogout()} class={"logout-button"}>Logout</a>
    )
}
export default Logaut