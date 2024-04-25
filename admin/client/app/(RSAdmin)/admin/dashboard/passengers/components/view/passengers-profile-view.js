"use client";

import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { useSettingsContext } from "@/app/(RSAdmin)/admin/common/settings";
import CustomBreadcrumbs from "@/app/(RSAdmin)/admin/common/custom-breadcrumbs";
import PassengerProfileCover from "../passengers-profile-cover";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";

export default function PassengerProfileView({ id }) {
  const [passenger, setPassenger] = useState({});
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const { data, status } = await axios.get(endpoints.passengers.byId(id))
    if (status === 200) {
      setPassenger(data);
      setLoading(false);

    };
  }

  useEffect(() => {
    fetch();
  }, []);

  const settings = useSettingsContext();
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container maxWidth={settings.themeStretch ? false : "lg"}>
            <CustomBreadcrumbs
              heading="Passenger details"
              links={[
                { name: "Dashboard", href: paths.dashboard.root },
                { name: "Passenger", href: paths.dashboard.passengers.root },
                { name: "Profile" },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />

            <Card
              sx={{
                mb: 3,
                height: { xs: 230, md: 170 },
              }}
            >
              <PassengerProfileCover
                role={passenger?.userInfo.email}
                avatarUrl={passenger?.profileImage}
                name={passenger?.userInfo.name}
                phoneNumber={`${passenger?.userInfo.phoneNumber}`}
                ratings={passenger?.ratings}
              />
            </Card>

          </Container>
        </>
      )}
    </>
  );
}
