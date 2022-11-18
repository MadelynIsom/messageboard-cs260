import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {generate} from "project-name-generator";
import Error from "./Error.js"

const Home = () => {
  
function generateRoomName() { 
  return generate({words:2, alliterative:true}).spaced;
}
    
const [rooms, setRooms] = useState([]);
const [error, setError] = useState("");
const [update, setUpdate] = useState(0);

  const fetchRooms = async() => {
    try {      
      const response = await axios.get("/api/rooms");
      setRooms(response.data.rooms);
    } catch(error) {
      setError("error retrieving rooms: " + error);
    }
  }
  
  useEffect(() => {
      fetchRooms();
  }, [update]);
  
    
    async function removeRoom(roomId) {
        try {
            const response = await axios.delete(`/api/rooms/${roomId}`);
            setUpdate(update + 1);
        } catch (error) {
            setError("error retrieving room: " + error);
        }
    }
    
    async function addRoom() {
      try {
        const response = await axios.post(`/api/rooms`, {name:generateRoomName()});
        setUpdate(update + 1);
      } catch (error) {
        setError("error adding room: " + error);
      }
    }
    
    async function updateRoom(roomId) {
      try {
        const response = await axios.put(`/api/rooms/${roomId}`, {name:generateRoomName()});
        setUpdate(update + 1);
      } catch (error) {
        setError("error updating room: " + error);
      }
    }
    
    return (
        <div>
        <h1 class="header"> Rooms </h1>
        <Error error={error} />
        <button onClick={e => addRoom()}>add room</button>
        <ul>
        {rooms.map( room => (
        <li>
            <Link to={room.id}>{room.name}</Link>
            <button onClick={e => removeRoom(room.id)} >delete</button>
            <button onClick={e => updateRoom(room.id)} >new name</button>
        </li>
        ))}
        </ul>
        </div>
    );
};

export default Home;