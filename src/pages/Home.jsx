import { useEffect } from "react";
import Layout from "../components/Layout";
import { useBlog } from "../context/Blog";
import Card from "../components/Card";

const Home = () => {
  const { getPosts, getPost, posts } = useBlog();

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <Layout>
      {posts.length === 0 && (
        <div className="flex justify-center items-center">

          <p> No Posts, Add One !</p>
        </div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-4 p-5">

        {posts.map(post=> <Card key={post.id} post={post} prev={true}/>)}
      </div>
    </Layout>
  );
};

export default Home;
