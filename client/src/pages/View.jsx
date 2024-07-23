import {useParams} from "react-router-dom";
import { socket } from "../../connectSocket";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl
});

function View(){

    const [location, setLocation]= useState(null);


    const pathId= useParams().id;
    socket.connect();
    socket.on('connect', ()=>{
        socket.emit('req-location', {id: pathId});
        // console.log(`connected for view with id : ${socket.id}`);
    })

    useEffect(() => {
        socket.on('get-location', (data) => {
            // console.log("data incoming");
            setLocation(data);
        });

        return () => {
            socket.off('get-location');
        };
    }, []);
    
    return(
        <>
        <div className="h-full w-full text-center">
            <div className="flex flex-row justify-start my-2">
                <p className="my-auto">Live Location of id : {pathId}</p>
            </div>

            {location ? 
                <div >
                    <MapContainer center={[location.latitude, location.longitude]} zoom={16} scrollWheelZoom={false} className="w-[80vw] h-[80vh] mx-auto">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[location.latitude, location.longitude]}></Marker>
                    </MapContainer> 
                </div>
            :
                <>
                    <h1 className="mt-24 text-2xl">Loading...</h1>
                </>
            }

        </div>
        </>
    )
}

export default View;