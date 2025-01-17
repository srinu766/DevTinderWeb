import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection/received", {
        withCredentials: true,
      });

      console.log("res", res.data.data[0]?.fromUserId);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No requests found!</h1>;
  return (
    <div className="text-center justify-centermy-10">
      <h1 className="text-bold text-white text-3xl ">Connections Requests</h1>
      {Array.isArray(requests) &&
        requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request?.fromUserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 border rounded-lg bg-base-200 w-full md:w-1/2  mx-auto"
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2 my-1"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
