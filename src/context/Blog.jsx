import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './Auth';

const BlogContext = createContext({
  getPosts: () => {},
  getPost: () => {},
  createPost: () => {},
  addComment: () => {},
  addLike: () => {},
  deletePost: () => {},
  updatePost: () => {},
  posts: [],
  currentPost: {},
  paginationData: {},
  page: 1,
  setPage: () => {},
});
const baseUrl = 'https://cwbarry.pythonanywhere.com/';

const BlogProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    count: 0,
    next: null,
    previous: null,
    totalPages: 0,
  });

  useEffect(() => {
    if (page) {
      getPosts(page);
    }
  }, [page]);

  // Get all Posts
  const getPosts = async (page) => {
    let url = `${baseUrl}blog/`;
    if (page) {
      url = `${baseUrl}blog/?page=${page}`;
    }
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setPosts(data.results);
      setPaginationData({
        count: data.count,
        next: data.next,
        previous: data.previous,
        totalPages: Math.ceil(data.count / 10),
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get a single Post with an id
  const getPost = async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/blog/${id}/`);
      setCurrentPost(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Create Post
  const createPost = async (data, navigate) => {
    try {
      const formdata = new FormData();
      formdata.append('title', data.title);
      formdata.append('content', data.content);
      if (data.image) formdata.append('image', data.image, data.image.name);

      await axios({
        method: 'Post',
        url: `${baseUrl}/blog/`,
        data: formdata,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      toast.success('Post created successfully !');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Add comment to a post

  const addComment = async (id, content) => {
    try {
      await axios({
        method: 'Post',
        url: `${baseUrl}/blog/comment/`,
        data: { post: id, content },
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });

      toast.success('Comment added successfully !');
      getPost(id);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //   Delete a post using its id

  const deletePost = async (id, navigate) => {
    try {
      await axios({
        method: 'Delete',
        url: `${baseUrl}/blog/${id}/`,

        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });

      toast.success('Post deleted successfully !');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Add a Like to a post

  const addLike = async (slug, id) => {
    try {
      await axios({
        method: 'Post',
        url: `${baseUrl}/blog/like/${slug}/`,

        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });

      getPosts();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Update a post using its id

  const updatePost = async (data, navigate, id) => {
    try {
      const formdata = new FormData();
      formdata.append('title', data.title);
      formdata.append('content', data.content);
      if (data.image) formdata.append('image', data.image, data.image.name);

      await axios({
        method: 'Put',
        url: `${baseUrl}/blog/${id}/`,
        data: formdata,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });

      toast.success('Post updated successfully !');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <BlogContext.Provider
      value={{
        getPosts,
        getPost,
        createPost,
        addComment,
        addLike,
        deletePost,
        updatePost,
        posts,
        currentPost,
        paginationData,
        setPage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
export const useBlog = () => useContext(BlogContext);
