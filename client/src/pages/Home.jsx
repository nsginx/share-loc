import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import bgImage from '../assets/sail_compass.jpg'

function Home(){
    return(
        <div className="flex flex-col gap-32 text-center ">
            <img src={bgImage} className="-z-10 absolute w-full h-full object-cover"/>
            <h1 className="text-4xl mt-8 font-bold text-white">Welcome to Share Loc</h1>
            <div className="rounded-lg bg-slate-200 p-4 mx-8 text-wrap">
                Start Sharing and a link will be generated. Anyone with that can view your live location
            </div>
            <div className='max-w-[700px] flex flex-row md:flex-col mx-auto'>
                <Link to={'/share'} className="flex flex-row gap-4 hover:gap-6 px-4 py-2 rounded-md border-2 bg-slate-400">
                    <div className="font-bold">Start Sharing</div>
                    <FaArrowRight className="my-auto" size={25}/>

                </Link>
            </div>           
        </div>
    )
}

export default Home;