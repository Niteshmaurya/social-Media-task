import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_URL);
console.log("this is socket " + socket)
const EmployeeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const createEmployee = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("socialId", data.socialId);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/createUser`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!savedUserResponse.ok) {
        const errorData = await savedUserResponse.json();
        throw new Error(`Error: ${savedUserResponse.status}, ${errorData.message}`);
      }

      const savedUserData = await savedUserResponse.json();
      console.log("FORM RESPONSE SUCCESS:", savedUserData);


      socket.emit("newEmployee", savedUserData.data);

      alert("User created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };


  return (
    <div>
      <form onSubmit={handleSubmit(createEmployee)} className="mt-8" encType="multipart/form-data">
        <div className="space-y-5 text-white">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm"
                type="text"
                placeholder="Enter Your Full Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="socialId" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Social Media Handle
            </label>
            <div className="mt-2.5">
              <input
                id="socialId"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm"
                type="text"
                placeholder="Enter Social media handle"
                {...register("socialId", { required: "Social media handle is required" })}
              />
              {errors.socialId && <span className="text-red-500 text-sm">{errors.socialId.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="images" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Profile Images
            </label>
            <div className="mt-2.5">
              <input
                id="images"
                className="flex w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
