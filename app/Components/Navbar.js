"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { fetchsearch} from "@/actions/useractions";
const Navbar = () => {
  const [showDropdown, setshowDropdown] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const [prefix, setprefix] = useState("")
  const [search, setsearch] = useState([])
  
  useEffect(() => {
    getUsers()
  }, [prefix])

  const getUsers = async() => {
    let u = await fetchsearch(prefix)
    setsearch(u)
  }
  
  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-4 h-16">
      <Link href={"/"}>
        <div className="logo font-bold text-lg flex items-center"  onClick={() => setshowDropdown(false)}>
          <img
            className="mb-2 invert-[0.23]"
            width={40}
            src="chai.gif"
            alt=""
          />
          <span>Get me a Chai!</span>
        </div>
      </Link>
      <div className="flex">
        {session && (
          <div className="flex gap-5 w-full items-center">
           {pathname === "/" &&  <div className="relative max-w-md mx-auto w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={prefix}
                name="prefix"
                onChange={(e)=>setprefix(e.target.value)}
                className="block w-auto p-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by username"
                required
              />
            </div>}

            <div className="relative w-full">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 mr-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setshowDropdown(!showDropdown)}
              >
                Profile
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`z-10 ${
                  showDropdown ? "" : "hidden"
                } absolute right-5 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                  onClick={() => setshowDropdown(false)}
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Log In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
