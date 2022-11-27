import {Link} from "react-router-dom"
import Street from "./assets/3042.jpg"
function LandingPageButton() {

    return <Link to="/maps" class="nav-link">
        <button class="btn btn-primary">
            <span style={{"font-size": "24px"}}>
                Take me to map
            </span>
        </button>
    </Link>
}

function LandingFrameMessage() {

    const style = {
        margin: "auto", padding: "10% 35% 10% 15%", color: "black"
    }

    return <div style={style}>
        {/*<div style={backgroundImage=}/>*/}
        <div style={{"font-size": "96px"}}>
            Stop searching for a parking spot!
        </div>

        <div style={{"font-size": "36px"}}>
            Know exactly where you can park in Timisoara! It's just one click away!
        </div>
        <br/>
        <LandingPageButton/>
    </div>
}

function LandingFrame() {
    const style = {

        "background-image": `url(${Street})`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        position: "absolute",
        height: "100%",
        width: "100%"
    }

    return <div style={style}>
        <LandingFrameMessage/>
    </div>
}

function HomePage() {
    return <div>
        <LandingFrame/>
    </div>
}

export default HomePage