"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../../context/hooks";
import { Icon } from "@iconify/react";
import axios from "axios";
import Loader from "../loader/Loader";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const path = usePathname();
  const [menuIcon, setMenuIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { replace } = useRouter();
  const { user, logout, mode, dispatch } = useAuthContext();

  useEffect(() => {
    if (mode)
      replace(mode == "driver" ? `/driver/${user?.id}` : `/client/${user?.id}`);
  }, [mode]);

  const handleSmScreen = () => {
    setMenuIcon(!menuIcon);
  };

  if (menuIcon) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const registerDriverAsAPassenger = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", user?.id);
      const response = await axios.post("/api/users/passenger", formData);
      if (response.status == 201) {
        enqueueSnackbar("Passenger Profile Created Successfully");
        replace(`/client/${user?.id}`);
        dispatch({
          type: "setPassengerInUser",
          payload: {
            passenger: response.data,
          },
        });
        dispatch({
          type: "setMode",
          payload: {
            mode: "passenger",
          },
        });
      }
      setLoading(false);
    } catch (err) {
      enqueueSnackbar(err.response?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const switchProfile = () => {
    dispatch({
      type: "setMode",
      payload: {
        mode: mode == "driver" ? "passenger" : "driver",
      },
    });
  };

  const RenderDriverButton = () => {
    if (!user) {
      return (
        <Link
          href={"/auth/register/user/driver"}
          className="bg-green text-center px-5  py-3  box-content rounded-md font-semibold text-sm"
        >
          <button>Become a driver</button>
        </Link>
      );
    }

    if (!user.driver && mode == "passenger") {
      return (
        <Link
          href={"/auth/register/driver"}
          className="bg-green text-center px-5 py-3  box-content rounded-md font-semibold text-sm"
        >
          <button>Become a driver</button>
        </Link>
      );
    }

    return null;
  };

  const RenderPassengerButton = () => {
    if (!user) {
      return (
        <Link
          href={"/auth/register/user/passenger"}
          className="bg-green text-center px-5 py-3  box-content rounded-md font-semibold text-sm"
        >
          <button>Become a user</button>
        </Link>
      );
    }
    if (!user?.passenger && mode == "driver") {
      return (
        <button
          className="bg-green text-center px-5  py-3  box-content rounded-md font-semibold text-sm"
          onClick={registerDriverAsAPassenger}
        >
          Become a user
        </button>
      );
    }

    return null;
  };

  useEffect(() => {
    console.log(user, "users ");
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <header className="bg-white text-2xl w-full ease-in duration-300  ">
          <nav className="max-w-[1366px] mx-auto h-24 flex justify-between items-center p-4">
            <div onClick={handleSmScreen}>
              <Link href="/">
                <Image
                  width={80}
                  height={80}
                  src={"/webAssets/images/home/header logo.png"}
                  alt=""
                />
              </Link>
            </div>

            {/* //Larger Screen  */}
            <ul className="hidden lg:flex uppercase font-semibold text-1xl lg:text-[20px] text-slate-800 gap-10">
              <li className="">
                <Link
                  href="/home"
                  className={`hover:text-green cursor-pointer ${
                    path === "/home/" ? "text-green" : "text-slate-600"
                  }`}
                >
                  HOME
                </Link>
              </li>
              <li className="">
                <Link
                  href="/about"
                  className={`hover:text-green cursor-pointer ${
                    path === "/about/" ? "text-green" : "text-slate-600"
                  }`}
                >
                  ABOUT
                </Link>
              </li>
              <li className="">
                <Link
                  href="#"
                  className={`hover:text-green cursor-pointer ${
                    path === "" ? "text-green" : "text-slate-600"
                  }`}
                >
                  SERVICES
                </Link>
              </li>
              {mode == "driver" && (
                <li className="">
                  <Link
                    href={`/driver/${user?.id}`}
                    className={`hover:text-green cursor-pointer ${
                      path === `/driver/${user?.id}/`
                        ? "text-green"
                        : "text-slate-600"
                    }`}
                  >
                    DRIVER
                  </Link>
                </li>
              )}
              {mode == "passenger" && (
                <li className="">
                  <Link
                    href={`/client/${user?.id}`}
                    className={`hover:text-green cursor-pointer ${
                      path === `/client/${user?.id}/`
                        ? "text-green"
                        : "text-slate-600"
                    }`}
                  >
                    USER
                  </Link>
                </li>
              )}
              <li className="">
                <Link
                  href="/contact"
                  className={`hover:text-green cursor-pointer ${
                    path === "" ? "text-green" : "text-slate-600"
                  }`}
                >
                  CONTACT
                </Link>
              </li>
            </ul>

            <div className="hidden lg:w-2/6 lg:flex items-center justify-end gap-3">
              {mode == "passenger" && (
                <Link
                  href={"/booking"}
                  className="bg-green py-3 px-6 rounded-md font-semibold text-sm"
                >
                  <button>BOOK NOW</button>
                </Link>
              )}

              {user?.driver && user?.passenger && (
                <button
                  className="text-green hover:text-white hover:bg-green py-3 px-6 rounded-md font-semibold text-sm border border-green"
                  onClick={switchProfile}
                >
                  Switch To {mode == "driver" ? "Passenger" : "Driver"}
                </button>
              )}

              <RenderDriverButton />
              <RenderPassengerButton />
            </div>

            {/* small screen icons  */}
            <div className="lg:hidden flex" onClick={handleSmScreen}>
              {menuIcon ? (
                <Icon icon="ion:close" fontSize={36} />
              ) : (
                <Icon icon="ion:menu" fontSize={36} />
              )}
            </div>

            {/* small screen navbar content */}
            <div
              className={`${
                menuIcon ? "translate-x-0" : "translate-x-full"
              }  transform fixed top-0 right-0 w-72 lg:hidden sm:w-96 h-screen bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out z-30`}
            >
              <button
                onClick={handleSmScreen}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                {menuIcon ? (
                  <Icon icon="ion:close" fontSize={36} />
                ) : (
                  <Icon icon="ion:menu" fontSize={36} />
                )}
              </button>

              <div className="w-full mt-5 z-50 flex flex-col justify-between h-[90vh]">
                <ul className="upppercase text-md font-bold">
                  <li onClick={handleSmScreen} className="py-2  cursor-pointer">
                    <Link
                      href="/home"
                      className={`hover:text-green cursor-pointer text-md ${
                        path === "/home/" ? "text-green" : "text-slate-600"
                      }`}
                    >
                      HOME
                    </Link>
                  </li>
                  <li onClick={handleSmScreen} className="py-2  cursor-pointer">
                    <Link
                      href="/about"
                      className={`hover:text-green cursor-pointer ${
                        path === "/about/" ? "text-green" : "text-slate-600"
                      }`}
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li onClick={handleSmScreen} className="py-2  cursor-pointer">
                    <Link
                      href="/services"
                      className={`hover:text-green cursor-pointer ${
                        path === "/services/" ? "text-green" : "text-slate-600"
                      }`}
                    >
                      SERVICES
                    </Link>
                  </li>
                  {mode == "driver" && (
                    <li
                      onClick={handleSmScreen}
                      className="py-2  cursor-pointer"
                    >
                      <Link
                        href={`/driver/${user?.id}`}
                        className={`hover:text-green cursor-pointer ${
                          path === `/driver/${user?.id}/`
                            ? "text-green"
                            : "text-slate-600"
                        }`}
                      >
                        DRIVER
                      </Link>
                    </li>
                  )}
                  {mode == "passenger" && (
                    <li
                      onClick={handleSmScreen}
                      className="py-2  cursor-pointer"
                    >
                      <Link
                        href={`/client/${user?.id}`}
                        className={`hover:text-green cursor-pointer ${
                          path === `/client/${user?.id}/`
                            ? "text-green"
                            : "text-slate-600"
                        }`}
                      >
                        USER
                      </Link>
                    </li>
                  )}
                  <li onClick={handleSmScreen} className="py-2  cursor-pointer">
                    <Link
                      href="/contact"
                      className={`hover:text-green cursor-pointer ${
                        path === "/contact/" ? "text-green" : "text-slate-600"
                      }`}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
                <div className="w-full space-y-3">
                  {user?.driver && user?.passenger && (
                    <button
                      className="text-green hover:text-white hover:bg-green block text-center w-full py-3 px-6 rounded-md font-semibold text-sm border border-green"
                      onClick={switchProfile}
                    >
                      Switch To {mode == "driver" ? "Passenger" : "Driver"}
                    </button>
                  )}

                  {mode == "passenger" && (
                    <Link href={"/booking"}>
                      <button className="bg-green block text-center w-full py-3 px-6 rounded-md font-semibold text-sm">
                        BOOK NOW
                      </button>
                    </Link>
                  )}

                  <RenderDriverButton />
                  <RenderPassengerButton />

                </div>
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
