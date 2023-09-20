import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { useAuth } from "../context/Auth";

const Register = () => {
  const initialValues = { email: "", password: "", password2: "" };

const navigate = useNavigate();
const {register} = useAuth()
  // Validation
  const registerSchema = object().shape({
    email: string().email("Invalid Email!").required("Email is required!"),
    password: string()
      .min(5, "Min 5 characters")
      .required("Password is required!"),
    password2: string()
      .required("Password is required!")
      .oneOf([ref("password")], "Password does not match"),
  });

  const handleSubmit = (values, actions) => {
    register(values, navigate)
  };

  return (

    <section className="flex items-center min-h-screen">
    <img
      className="hidden lg:block w-7/12 h-screen object-cover"
      src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
      alt="login page image"
    />

    <div className="w-full max-w-sm p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <h5 className="text-3xl text-center font-bold text-gray-500 ">
              Sign Up
            </h5>
            <div>
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <Field
                type="text"
                name="email"
                id="email"
                className="form-control"
                placeholder="name@email.com"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="******"
              />
              {errors.password && touched.password && (
                <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="password2" className="form-label">
                Confirm Password:
              </label>
              <Field
                type="password"
                name="password2"
                id="password2"
                className="form-control"
                placeholder="******"
              />
              {errors.password2 && touched.password2 && (
                <p className="mt-1 text-red-500 text-xs">{errors.password2}</p>
              )}
            </div>

            <div className="flex flex-col justify-center items-center space-y-4" >
              <button type="submit" className="btn-primary">
                Register
              </button>
          
          <p className="text-sm font-medium text-gray-500"> Already Registered?  
          <Link to="/auth/login"
          className="text-blue-700 hover:underline"> Login to your account</Link>
          
          </p>
            </div>

          
          </Form>
        )}
      </Formik>
    </div>
  </section>
  )
};

export default Register;
