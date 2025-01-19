import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const HomePage = () => {
  const location = useLocation();
  const [empData, setEmpData] = useState(location.state?.userData || null);

  const socket = useRef(null);

  useEffect(() => {
    // Initialize the socket connection if not already established
    if (!socket.current) {
      socket.current = io(process.env.REACT_APP_BASE_URL, {
        transports: ["websocket", "polling"], // Use WebSocket and Polling as fallback
        withCredentials: true, // Required for some CORS setups
        reconnection: true, // Enable auto-reconnection
        reconnectionAttempts: 5, // Number of attempts before giving up
        reconnectionDelay: 2000, // Delay between reconnection attempts
      });
    }


    const getAllData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getallUsers`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setEmpData(data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };


    if (!empData) getAllData();


    socket.current.on("userCreated", (newUser) => {
      setEmpData((prevData) => [...prevData, newUser]);
    });

    // Cleanup function to properly close the WebSocket connection
    return () => {
      if (socket.current) {
        socket.current.off("userCreated");
        socket.current.disconnect(); // Disconnect the socket
        socket.current = null; // Reset the socket reference
      }
    };
  }, [empData]);


  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Users
            </h2>
          </div>
          <Link to={"/"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500">
                Fill Form
              </button>
            </div>
          </Link>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Social URL
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Images
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {empData?.map((person) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {person.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {person.socialId}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.images?.length > 0 ? (
                            person.images.map((image, index) => (
                              <a
                                href={`${process.env.REACT_APP_BASE_URL}/api/v1/${image}`}
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/api/v1/${image}`}
                                  alt={`employee-${index}`}
                                  className="w-10 h-10 object-cover rounded-full"
                                />
                              </a>
                            ))
                          ) : (
                            "No images"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default HomePage;
