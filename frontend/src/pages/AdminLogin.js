import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

export default function AdminLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            console.log("this is data " + JSON.stringify(data))
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/getallUsers`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!savedUserResponse.ok) {

                const errorText = await savedUserResponse.text();
                alert("Error: " + errorText);
                return;
            }

            const savedUserData = await savedUserResponse.json();

            if (savedUserData && savedUserData.data) {
                navigate("/list", { state: { userData: savedUserData.data } });
            } else {
                alert("Invalid username or password!");
            }
        } catch (error) {
            console.error("Error creating employee:", error.message);
            alert("An error occurred. Please try again.");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-sm">
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                        <Link
                            to={"/"}
                            className="font-medium text-black transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
                        >
                            <FaBackward />
                            Fill form as user
                        </Link>
                    </p>
                    <div>
                        <label
                            htmlFor="username"
                            className="text-base font-medium text-gray-900 dark:text-gray-200"
                        >
                            Admin Username
                        </label>
                        <div className="mt-2.5">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                type="text"
                                placeholder="Enter Admin Username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && (
                                <span className="text-red-500 text-sm">{errors.username.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-base font-medium text-gray-900 dark:text-gray-200"
                        >
                            Admin Password
                        </label>
                        <div className="mt-2.5">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                type="password"
                                placeholder="Enter Admin Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                        >
                            Login
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="ml-2 h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}