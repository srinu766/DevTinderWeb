// import axios from "axios";
// import React from "react";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const {_id,  firstName, lastName, photoUrl, gender, age, about } = user;

//   const dispatch = useDispatch();

//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed(userId));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="card bg-base-300 w-96 shadow-xl ">
//       <figure className="mt-10">
//         <img
//           className="rounded-full h-40 w-40 "
//           src={
//             photoUrl
//               ? photoUrl
//               : "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
//           }
//           alt="photoUrl"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{firstName + " " + lastName}</h2>
//         {age && gender && <p>{age + ", " + gender}</p>}
//         <p>{about}</p>
//         <div className="card-actions justify-center">
//           <button className="btn btn-primary"
//           onClick={()=>handleSendRequest("ignored", _id)}>Ingore</button>
//           <button className="btn btn-secondary"
//           onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;


import axios from "axios";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useAnimation } from "framer-motion";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, gender, age, about } = user;
  const dispatch = useDispatch();
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const refreshContent = () => {
  window.location.reload();
  };
  

  const handleDragEnd = async (event, info) => {
    setIsDragging(false);
    const threshold = 100;
    
    if (info.offset.x < -threshold) {
      // Swiped left - ignore
      await controls.start({ 
        x: "-100%", 
        opacity: 0,
        transition: { duration: 0.3 }
      });
      handleSendRequest("ignored", _id);
      refreshContent();
    } else if (info.offset.x > threshold) {
      // Swiped right - interested
      await controls.start({ 
        x: "100%", 
        opacity: 0,
        transition: { duration: 0.3 }
      });
      handleSendRequest("interested", _id);
      refreshContent();
    } else {
      // Return to center
      controls.start({ 
        x: 0, 
        opacity: 1,
        transition: { duration: 0.3 }
      });
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-96">
      {/* Background indicators */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <motion.div 
          className="text-4xl font-bold text-red-500"
          animate={{ opacity: isDragging ? 0.7 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Ignore
        </motion.div>
        <motion.div 
          className="text-4xl font-bold text-green-500"
          animate={{ opacity: isDragging ? 0.7 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Interested
        </motion.div>
      </div>

      {/* Main card */}
      <motion.div
        ref={cardRef}
        className="absolute inset-0 bg-base-300 rounded-2xl shadow-xl overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div className="h-full flex flex-col">
          {/* User image */}
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                photoUrl
                  ? photoUrl
                  : "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
              }
              alt={`${firstName} ${lastName}`}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-2xl font-bold text-white">
                {firstName + " " + lastName}
                {age && <span className="font-normal">, {age}</span>}
              </h2>
              {gender && (
                <p className="text-white/80 capitalize">{gender}</p>
              )}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600 line-clamp-3">
                {about || "No description provided"}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-4 gap-3">
              <button
                className="btn btn-outline btn-error flex-1"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;