import React from "react";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import EmployeeForm from "../components/UserForm";
import AdminLogin from "./AdminLogin"


const UserPage = () => {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
            Fill form
          </h2>

          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            <Link
              to={"/AdminLogin"}
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
            >
              <FaBackward />
              Login as Admin
            </Link>
          </p>

          <EmployeeForm />
        </div>
      </div>
    </section>
  );
};

export default UserPage;
