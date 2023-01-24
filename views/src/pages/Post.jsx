import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState();
  const params = useParams();
  useEffect(async () => {
    setPost((await axios.get(serverUrl + `/post/${params.id}`)).data);
  });

  return (
    <div style={{ padding: "10px 20px", wordBreak: "break-all" }}>
      <h1>{post?.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: post?.content.replaceAll("\n", "<br>"),
        }}
      ></div>
    </div>
  );
}

export default Post;
