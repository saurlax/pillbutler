// @ts-nocheck
import { List } from "antd-mobile";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGet } from "@/lib/http";

function Discover() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      setPosts(await httpGet(serverUrl + "/post"));
    })();
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
              description={
                post.content.length > 30
                  ? post.content.slice(0, 50) + "..."
                  : post.content
              }
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
