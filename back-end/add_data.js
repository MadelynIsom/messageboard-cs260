const axios = require("axios");

const rooms = require("./rooms.js");
const comments = require("./comments.js");

const baseURL = "http://localhost:3001";

rooms.forEach(async (room) => {
  const response = await axios.post(`${baseURL}/api/rooms`, room);
  if (response.status != 200)
    console.log(`Error adding ${room.name}, code ${response.status}`);
});

async function listRooms () {
  const response = await axios.get(`${baseURL}/api/rooms`);
    console.log(response);
}

listRooms();

comments.forEach(async (comment) => {
  const response = await axios.post(`${baseURL}/api/comments`, comment);
  if (response.status != 200)
    console.log(`Error adding ${comment.name}, code ${response.status}`);
});

async function listComments () {
  const response = await axios.get(`${baseURL}/api/comments`);
    console.log(response);
}

listComments();