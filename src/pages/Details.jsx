import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useBlog } from '../context/Blog';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Details = () => {

  const {id} = useParams();
  const {getPost, currentPost, addComment, addLike, deletePost, getPosts} = useBlog()
    
  useEffect(()=>{
    getPost(id)
  }, [])
  return (
    
    <Layout>
    <div className="container max-w-5xl mx-auto mt-10">
    <Card post={currentPost} prev={false}/>
    
    
    </div>

    </Layout>
  )
}

export default Details