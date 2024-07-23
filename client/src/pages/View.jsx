import {useParams} from "react-router-dom";
import { socket } from "../../connectSocket";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

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
        <div className="h-full w-full">
            <div className="flex flex-row justify-start my-2">
                <p className="my-auto">Live Location: </p>
            </div>

            {location ? 
                <div >
                    <MapContainer center={[location.latitude, location.longitude]} zoom={16} scrollWheelZoom={false} className="w-[80vw] h-[80vh] mx-auto">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[location.latitude, location.longitude]}>
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer> 
                </div>
            :
                <>
                    <h1>Location not available</h1>
                </>
            }

        </div>
        </>
    )
}

export default View;