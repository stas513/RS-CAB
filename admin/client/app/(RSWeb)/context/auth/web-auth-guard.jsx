"use client";

import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";
import { useAuthContext } from "../hooks";
import { usePathname, useRouter } from "next/navigation";

const driverBlockRoutes = ["/booking", "/client"];
const passengerBlockRoutes = ["/driver"];
const publicBlockRoutes = [
  "/booking",
  "/driver",
  "/auth/register/driver",
  "/auth/register/passenger",
  '/client'
];

const authBlockRoutes = [
  "/auth/login",
  "/auth/register/user/driver",
  "/auth/register/user/passenger"
]
// ----------------------------------------------------------------------

export default function WebAuthGuard({ children }) {
  const pathname = usePathname();

  const { user } = useAuthContext();
  const [checked, setChecked] = useState(true);
  const { replace, push } = useRouter()

  const check = useCallback(() => {
    if (user) {
      for (let i in authBlockRoutes) {
        if (pathname.startsWith(authBlockRoutes[i])) {
          setChecked(false);
        }
        else if (user?.mode == "passenger") {
          for (let i = 0; i < passengerBlockRoutes.length; ++i) {
            if (pathname.startsWith(passengerBlockRoutes[i])) {
              setChecked(false);
            }
          }
        }
        else if (user?.mode == "driver") {
          for (let i = 0; i < driverBlockRoutes.length; ++i) {
            if (pathname.startsWith(passengerBlockRoutes[i])) {
              setChecked(false);
            }
          }
        }
        else {
          setChecked(false);
        }
      }
    } else {
      for (let i = 0; i < publicBlockRoutes.length; ++i) {
        if (pathname.startsWith(publicBlockRoutes[i])) {
          setChecked(false);
        }
      }
    }


  }, []);

  useEffect(() => {
    check();
  }, [pathname]);

  const handleBack = () => {
    replace('/home')
    setChecked(true)
  }

  if (!checked) {
    return <p className="font-poppins " >You Don't have permit to access this route  <button className="font-poppins text-blue " onClick={handleBack}> Go Home</button></p>;
  }

  return children;
}
WebAuthGuard.propTypes = {
  children: PropTypes.node,
};
