import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    // if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      // console.log(res.data.data)
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex justify-center my-10">No connections found!</h1>;
  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, age, gender, about, photoUrl} = connection
        return (
          <div key={_id} className=" flex  m-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto">
          <div>
            <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4 ">
            <h2 className="font-bold text-xl">{firstName+ " "+ lastName}</h2>
           {age && gender&& <p>{age+ ", "+ gender}</p>}
            <p>{about}</p>
            </div>
           
          </div>
        );
      })}
    </div>
  );
};

export default Connections;