import { List } from "antd-mobile";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Discover() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();

  useEffect(async () => {
    setPosts((await axios.get(serverUrl + "/post")).data);
  }, []);

  return (
    <div>
      <List>
        {posts?.map((post) => {
          return (
            <List.Item
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
              description={post.content.slice(0, 50)}
            >
              {post.title}
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}

export default Discover;
