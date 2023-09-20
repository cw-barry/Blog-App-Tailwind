import React from "react";
import Layout from "../components/Layout";
import { Formik, Form, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FileUploader } from "react-drag-drop-files";
import { useBlog } from "../context/Blog";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {

  const fileTypes = ["JPG", "PNG", "GIF"];
  const navigate = useNavigate();
  const { createPost, updatePost } = useBlog();

  const{state} = useLocation()
 let post; 
  if(state){
     post = {title: state.title, content: state.content, image: state.image}

  }
console.log(state)
  const handleSubmit = (values) => {

    if(!post){
      console.log(values)
      createPost(values, navigate);
  
    }else{
      values.image = null;
      updatePost(values, navigate, state.id )
    }
  };

  const initialValues = post? post : { title: "", content: "", image: "" };
  return (
    <Layout>
      <div className="w-full mx-auto p-6 max-w-[450px] md:max-w-[900px] bg-white border border-gray-200 rounded-lg shadow mt-10">
        <h2 className="text-2xl text-center text-gray-800 mb-8"> {post? 'EDIT': 'ADD'} POST </h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, touched, setFieldValue }) => (
            <Form >
              <div className="my-4">
                <label htmlFor="title" className="form-label">
          
                  Post Title:
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="NYC Best Attractions"
                />
              </div>
              <div className="my-4">
                <label htmlFor="body" className="form-label">
                  Post Body:{" "}
                </label>

                <div className="min-h-[500]">
                <CKEditor 
                  name="body"
                    editor={ClassicEditor}
                    data={post? post?.content: ''}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                    
                      setFieldValue("content", data);
                    }}
                  />


                </div>
              </div>

              <div className="my-4 ">
                <label htmlFor="image" className="form-label">
           
                  Post Image:
                </label>
                <Field
                  as={FileUploader}
                  handleChange={(file) => setFieldValue("image", file)}
                  name="file"
                  types={fileTypes}
                />
              </div>

              <div className="my-4 flex justify-center">
                <button type="submit" className="btn-primary">
                {post? 'EDIT': 'ADD'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Add;
