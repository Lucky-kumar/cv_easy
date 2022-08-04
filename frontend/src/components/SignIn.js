import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./styles/SignIn.css";
import FormInput from './FormInput';
import { Link } from "react-router-dom";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];


  const { loading, error, dispatch } = useContext(AuthContext);

  if (error) {
    console.log(error.message);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", values);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/about")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (loading) return "Loading...";

  return (
    <div className="signIn">
      <form className="signin_form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
        {error &&
          <span className="err_msg">{error.message}</span>}
        <button>Submit</button>
          Don't have an account yet? <Link to="/signup">Sign up here</Link>
      </form>
    </div>
  );
}

export default SignIn