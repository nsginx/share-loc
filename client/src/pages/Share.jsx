import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { socket } from "../../connectSocket";
import { ClientURL } from "../../constants";

function Share(){

    const [locationLink, setLocationLink]= useState(socket.connected?socket.id:"---");
    const [sharing, setSharing]= useState(socket.connected);

    if(navigator.geolocation){

        navigator.geolocation.watchPosition((position)=>{
            const {latitude, longitude} = position.coords;
            
            socket.emit('update-location', {latitude, longitude});
            console.log(position);
        }, (error)=>{
            console.error(error);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }
    
    function startShare(){
        socket.connect();
        socket.on('connect', ()=>{
            setLocationLink(`${ClientURL}/view/${socket.id}`)
            setSharing(socket.connected)
        })

    }
    function stopShare(){
        // console.log(socket.id);
        socket.disconnect();
        setSharing(socket.connected)
        setLocationLink("---");
    }

    function copyText(){
        navigator.clipboard.writeText(locationLink).then(()=>{
            alert("share link copied")
        })
    }

    return(
        <div className="w-full h-full flex flex-col gap-16 justify-center mt-16"> 

        <button onClick={startShare} className={`mx-auto px-8 py-4 rounded-lg ${sharing ? "bg-green-100" : "bg-green-500"}`} disabled={sharing}>{sharing? "sharing...":"Share your Location"}</button>

        <div className="flex flex-col text-center">
            <label>Your location link : </label>
            <div className="flex flex-row gap-2 mx-auto">
                <input value={locationLink} type="text" className="rounded-md py-2 px-4 border-none bg-slate-400 text-center" disabled/>
                <button onClick={copyText} className="bg-blue-400 p-2 rounded-xl" disabled={!sharing}><FaLink/></button>
            </div>
        </div>

        <button onClick={stopShare} className={`mx-auto px-8 py-4 rounded-lg ${sharing ? "bg-red-500" : "bg-red-100"}`} disabled={!sharing}>Stop Sharing</button>
        </div>
    )
}

export default Share;