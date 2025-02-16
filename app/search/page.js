"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchsearch } from "@/actions/useractions";
import { useSession } from "next-auth/react";

const page = () => {
  const router = useRouter();
  const [prefix, setprefix] = useState("");
  const [search, setsearch] = useState([]);
  const { data: session, status } = useSession();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : true
  );

  // Redirect if screen size is greater than sm (640px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        router.replace("/"); // Uses `replace` to avoid navigation history issues
      } else {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);

    if (window.innerWidth >= 640) {
      router.replace("/");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.replace("/");
    }
  }, [session, status, router]);

  // Fetch users when prefix changes
  useEffect(() => {
    if (prefix) {
      getUsers();
    }
  }, [prefix]);

  const getUsers = async () => {
    let u = await fetchsearch(prefix);
    setsearch(u);
  };

  // Don't render if screen is too large
  if (!isMobile) return null;

  return (
    <div className="relative max-w-md mx-auto w-[90%] flex flex-col mt-5">
      <input
        type="search"
        id="default-search"
        value={prefix}
        name="prefix"
        onChange={(e) => setprefix(e.target.value)}
        className="block w-full m-auto p-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search by username"
        required
      />
      {(prefix && search.length > 0) || search.length === 0 ? (
        <div className="w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {search.length > 0 ? (
            search.map((user) => (
              <div
                key={user.username}
                className="p-2 hover:bg-gray-100 text-black cursor-pointer flex gap-2"
                onClick={() => router.push(`/${user.username}`)}
              >
                <div className="w-9 h-9">
                  <img src={user.profilepic} alt="dp" className="rounded-full object-cover w-full h-full" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-bold">@{user.username}</h3>
                  <span className="text-[8px]">{user.bio}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No users found</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default page;
