import { useEffect, useState } from "react";
import "./styles.css";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENT_URL = "https://jsonplaceholder.typicode.com/comments";

export default function App() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await fetch(POST_URL).then((data) => data.json());
      const commentResponse = await fetch(COMMENT_URL).then((data) =>
        data.json()
      );

      if (!postResponse) {
        return;
      }

      // console.log(postResponse);

      //TODO: Get post id from url
      const path = window.location.pathname;
      if (!path.match(/\/post\/[0-9]+/gm)) {
        return;
      }

      const postId = path.match(/[0-9]+$/gm)[0];
      // console.log(postId)
      const _post = postResponse.find((data) => data.id == postId);

      if (!_post) {
        return;
      }
      setPost(_post);

      // fetch comments for post
      const _comments = commentResponse.filter((data) => data.postId == postId);
      setComments(_comments);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h2>Post</h2>
      <h3>Title: {post.title}</h3>
      <p>{post.body}</p>
      <p>Comments</p>
      <li>
        {comments.map((data) => (
          <ol key={data.id}>{data.body}</ol>
        ))}
      </li>
    </div>
  );
}
