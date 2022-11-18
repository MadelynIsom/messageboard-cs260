const axios = require("axios");

const baseURL = "http://localhost:3001";

describe("getting, adding, and deleting comments", () => {
  let commentID = "";
  test("add a comment", async () => {
    // create a comment
    const newComment = {
        username: "Piglet",
        body: "I'm going looking for acorns today, but I'm too scared to go alone. Will someone come with me?",
        date: "2022-11-13",
        roomName: "The Hundred Acre Wood Chatroom"
    };
    // add the comment
    const response = await axios.post(`${baseURL}/api/comments`, newComment);
    // we expect the response to be 200 and contain our comment
    expect(response.status).toBe(200);
    expect(response.data.username).toEqual("Piglet");
    let CommentID = response.data.id;
  });
  test("get comments", async () => {
    // get one comment
    const response = await axios.get(`${baseURL}/api/comments/${roomName}`);
    // we expect the response to be 200 and contain our pdouct
    expect(response.status).toBe(200);
    expect(response.data.username).toEqual("Piglet");
  });
  /*
  test("get products", async () => {
    // get all products
    const response = await axios.get(`${baseURL}/api/products`);
    expect(response.status).toBe(200);
    // look for the product we added
    const foundProduct = response.data.find((product) => {
      return product.id === productID;
    });
    // we expect the product ID to be the one we added
    expect(foundProduct.id).toEqual(productID);
  });
  */
  test("delete a comment", async () => {
    const response = await axios.delete(`${baseURL}/api/comments/${CommentID}`);
    expect(response.status).toBe(200);
  });
});
