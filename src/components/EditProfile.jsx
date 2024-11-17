// import React, { useState } from "react";
// import UserCard from "./UserCard";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import UserCardProfile from "./UserCardProfile";

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user?.firstName);
//   const [lastName, setLastName] = useState(user?.lastName);
//   const [age, setAge] = useState(user?.age || "");
//   const [gender, setGender] = useState(user?.gender || "");
//   const [about, setAbout] = useState(user?.about);
//   const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
//   const [error, setError] = useState("")
//   const [showToast, setShowToast] = useState(false)

//   const dispatch= useDispatch()

//   const saveProfile = async ()=>{
//     try{
//         const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age, gender,about,photoUrl},{withCredentials:true})
//         dispatch(addUser(res?.data?.data))
//         setShowToast(true)
//         setTimeout(()=>{
//             setShowToast(false)
//         },3000)
//     }catch(err){
//         setError(err.response.data)
//     }
//   }

//   return (
//     <>
//     <div className="flex  justify-center  my-10">
//       <div className="flex justify-center mx-10">
//         <div className="card bg-base-300 w-96 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title justify-center">Edit Profile</h2>
//             <div>
//               <label className="form-control w-full max-w-xs my-2">
//                 <div className="label">
//                   <span className="label-text">First Name</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={firstName}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-2">
//                 <div className="label">
//                   <span className="label-text">Last Name</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={lastName}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-2">
//                 <div className="label">
//                   <span className="label-text">Age</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={age}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={(e) => setAge(e.target.value)}
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-2">
//                 <div className="label">
//                   <span className="label-text">Gender</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={gender}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={(e) => setGender(e.target.value)}
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-2">
//                 <div className="label">
//                   <span className="label-text">About</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={about}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={(e) => setAbout(e.target.value)}
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-2">
//                 <div className="label">
//                   <span className="label-text">PhotoUrl</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={photoUrl}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={(e) => setPhotoUrl(e.target.value)}
//                 />
//               </label>
//             </div>
//             <p className="text-red-800">{error}</p>
//             <div className="card-actions justify-center">

//               <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <UserCardProfile user={{firstName, lastName, age, gender, about,photoUrl}} />
//     </div>
//     <div className="toast toast-top toast-center">

//  {showToast && <div className="alert alert-success">
//     <span>Profile saved successfully.</span>
//   </div>}
// </div>
//     </>
//   );
// };

// export default EditProfile;

import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCardProfile from "./UserCardProfile";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-10 px-5">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                {/* <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label> */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled value="">
                      Select Gender
                    </option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    type="text"
                    value={about}
                    className="textarea textarea-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Bio"
                  ></textarea>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-800">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCardProfile
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      <div className="toast toast-top toast-center">
        {showToast && (
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
