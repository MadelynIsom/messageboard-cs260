import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Error from "./Error.js";


const Room = () => {
    
const {id} = useParams();
const [comments, setComments] = useState([]);
const[update, setUpdate] = useState(0);
const [room, setRoom] = useState({});
const [error, setError] = useState("");
const [values, setValues] = useState({
  room: id,
  body: "",
  username: ""
});

  const fetchRoom = async() => {
    try {      
      const response = await axios.get(`/api/rooms/${id}`);
      setRoom(response.data);
    } catch(error) {
      setError("error retrieving room: " + error);
    }
  }
  
  const fetchComments = async() => {
    try {      
      const response = await axios.get(`/api/comments/${id}`);
      setComments(response.data);
    } catch(error) {
      setError("error retrieving comments: " + error);
    }
  }
  
  useEffect(() => {
      fetchRoom();
  }, []);
  
  useEffect(() => {
    fetchComments();
  }, [update]);
  
  async function addComment(e) {
    e.preventDefault();
      try {
        const response = await axios.post(`/api/comments`, values);
        setUpdate(update + 1);
        setValues((values) => ({
          ...values,
          body: "",
          username: "",
        })
        );
      } catch (error) {
        setError("error adding comment: " + error);
      }
  }
  
    async function deleteComment(commentId) {
      try {
        const response = await axios.delete(`/api/comments/${commentId}`);
        setUpdate(update + 1);
      } catch (error) {
        setError("error deleting comment: " + error);
      }
  }
  
function handleBodyChange(event) {
	event.persist();
	setValues((values) => ({
		...values,
		body: event.target.value,
	}));
};
    
function handleUsernameChange(event) {
	event.persist();
	setValues((values) => ({
		...values,
		username: event.target.value,
	}));
};
    return (
        <div>
        <h1 class="header">{room.name}</h1>
        <Error error={error} />
          <form onSubmit={addComment}>
            <label for="username"> name </label>
            <input id="username" type="text" name="username" value={values.username} onChange={handleUsernameChange}/>
            <label for="body"> comment </label>
            <textarea id="body" type="text" name="body" value={values.body} onChange={handleBodyChange}/>
            <button type="submit">add a comment</button>
          </form>
          {comments.map(comment => (
            <div>{comment.username} - {comment.body} - {new Date(comment.date).toLocaleString()}
            <button onClick={e=>deleteComment(comment.id)}>delete</button>
            </div>
          ))}
        </div>
    );
};

export default Room;