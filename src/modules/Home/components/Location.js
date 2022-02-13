import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../../constants";
import { deg2rad } from '../../../utils';

export default function Location() {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [currentDistance, setCurrentDistance] = useState(0);  
    const map = useMap();
      
    const distanceFromOffice = (currentPosition) => {
        const { lat, lng } = currentPosition;
        const officeLat = 23.7937486;
        const officeLng = 90.4140757;
        
        const R = 6371; 
        const dLat = deg2rad(lat-officeLat);
        const dLon = deg2rad(lng-officeLng); 
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat)) * Math.cos(deg2rad(officeLat)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c;
        setCurrentDistance(d.toFixed(2))
    }


    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            distanceFromOffice(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius, {color: 'rgba(0, 0, 0, 0.2)', opacity:0});
            circle.addTo(map);
        });
        
        return ()=>setPosition(null)
    }, [map]);

    return position && (
        <Marker position={position} icon={icon}>   
            <Tooltip className="border-0 glass-effect" direction="top" offset={[2, -40]} opacity={1} permanent>
                <div className="d-flex align-items-center text-indigo fw-semi-bold pad-x-16">  
                    You are here
                </div>
            </Tooltip>
        </Marker>
    );
  }

  return (
    <MapContainer
        center={[49.1951, 16.6068]}
        zoom={15}
        scrollWheelZoom
        
        style={{
            height: "calc(100vh - 80px)",
            borderRadius: "15px",
            boxShadow: "0 0 8px 2px #f5e8ff"
        }}
    >
        <TileLayer
            attribution=''
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
    </MapContainer>
  );
}
