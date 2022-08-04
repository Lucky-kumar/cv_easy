import { useState } from "react";
import "./styles/SignUp.css";
import FormInput from './FormInput';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: values.name,
      email : values.email,
      password: values.password
    }

    console.log(newUser)


    try{
      await axios.post("http://localhost:8800/api/auth/register", newUser);
      navigate("/signin")
    }
    catch(err){
      console.log(err);
    }

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="signUp">
      <form className="signup_form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        Already have an account? <Link to="/signin">Sign in here</Link>
      </form>
    </div>
  );
}

export default SignUp