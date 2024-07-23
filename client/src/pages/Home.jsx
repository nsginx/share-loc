import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h1>Welcome to Share Loc</h1>
            <h2>your personal location sharing app</h2> 
            <div className='max-w-[700px] flex flex-row md:flex-col mx-auto'>
                <Link to={'/share'}>Share</Link>
                {/* <Link to={'/view'}>View</Link> */}
            </div>           
        </div>
    )
}

export default Home;