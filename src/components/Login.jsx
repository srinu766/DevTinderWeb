// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";

// const Login = () => {
//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [error, setError] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);

//   const toggleForm = () => {
//     setIsLoginForm(!isLoginForm);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           emailId,
//           password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       setError(err?.response?.data || "Something went wrong!");
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         {
//           firstName,
//           lastName,
//           emailId,
//           password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data));
//       navigate("/profile");
//     } catch (err) {
//       console.log(err);
//       setError(err?.response?.data || "Something went wrong!");
//     }
//   };
  

//   return (
//     <div className="flex justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center">
//             {isLoginForm ? "Login" : "SignUp"}
//           </h2>
//           <div>
//             {!isLoginForm && (
//               <>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">First Name</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={firstName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">Last Name</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={lastName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </label>
//               </>
//             )}
//             <label className="form-control w-full max-w-xs my-2">
//               <div className="label">
//                 <span className="label-text">Email ID</span>
//               </div>
//               <input
//                 type="text"
//                 value={emailId}
//                 className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setEmailId(e.target.value)}
//               />
//             </label>
//             <label className="form-control w-full max-w-xs my-2">
//               <div className="label">
//                 <span className="label-text">Password</span>
//               </div>
//               <input
//                 type="password"
//                 value={password}
//                 className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>
//           </div>
//           <p className="text-red-600">{error}</p>
//           <div className="card-actions justify-center">
//             <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
//               {isLoginForm ? "Login" : "SignUp"}
//             </button>
//           </div>
//           <p className="flex justify-center cursor-pointer underline py-2" onClick={toggleForm}>
//             {isLoginForm
//               ? "New User? SignUp Here"
//               : "Existing User? Login Here"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 flex items-center justify-center">
    <div className="card bg-white shadow-4xl rounded-lg w-11/12 max-w-md p-6 mt-[-150px]">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {isLoginForm ? "Welcome Back" : "Create Your Account"}
      </h2>
      <p className="text-gray-500 text-center mb-6">
        {isLoginForm
          ? "Please login to continue"
          : "Join us by creating an account"}
      </p>
      <form className="space-y-4">
        {!isLoginForm && (
          <>
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="form-control">
          <label className="label text-sm font-medium text-gray-700">
            Email ID
          </label>
          <input
            type="email"
            value={emailId}
            className="input input-bordered w-full"
            placeholder="Enter your email"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="input input-bordered w-full"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="card-actions">
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p
          className="text-sm text-gray-500 cursor-pointer underline"
          onClick={toggleForm}
        >
          {isLoginForm
            ? "New user? Sign up here"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
