"use client";

import { useState, useCallback, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import Iconify from "@/app/(RSAdmin)/admin/common/iconify";
import { useSettingsContext } from "@/app/(RSAdmin)/admin/common/settings";
import CustomBreadcrumbs from "@/app/(RSAdmin)/admin/common/custom-breadcrumbs";
import DriverInfo from "../drivers-info";
import DriverCars from "../drivers-cars";
import DriverProfileCover from "../drivers-profile-cover";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";

const TABS = [
  {
    value: "profile",
    label: "Profile",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "cars",
    label: "Cars",
    icon: <Iconify icon="fa6-solid:car" width={24} />,
  },
];

export default function DriverProfileView({ id }) {
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(endpoints.drivers.byId(id));
      if (status === 200) {
        const res = await axios.get(
          endpoints.documents.doc(data?.profileImage)
        );
        if (res.status === 200) {
          data.profileImage = res.data;
        }

        setDriver(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const settings = useSettingsContext();

  const [searchCars, setSearchCars] = useState("");

  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchCars = useCallback((event) => {
    setSearchCars(event.target.value);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container maxWidth={settings.themeStretch ? false : "lg"}>
            <CustomBreadcrumbs
              heading="Driver details"
              links={[
                { name: "Dashboard", href: paths.dashboard.root },
                { name: "Driver", href: paths.dashboard.user.root },
                {
                  name: driver?.userInfo.name,
                },
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
              <DriverProfileCover
                role={driver?.userInfo.email}
                name={driver?.userInfo.name}
                avatarUrl={driver?.profileImage}
              />

              <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                sx={{
                  width: 1,
                  bottom: 0,
                  zIndex: 9,
                  position: "absolute",
                  bgcolor: "background.paper",
                  [`& .${tabsClasses.flexContainer}`]: {
                    pr: { md: 3 },
                    justifyContent: {
                      xs: "center",
                      md: "center",
                    },
                  },
                }}
              >
                {TABS.map((tab) => (
                  <Tab
                    key={tab.value}
                    value={tab.value}
                    icon={tab.icon}
                    label={tab.label}
                  />
                ))}
              </Tabs>
            </Card>

            {currentTab === "profile" && <DriverInfo info={driver} />}

            {currentTab === "cars" && (
              <DriverCars
                cars={driver?.car}
                searchCars={searchCars}
                onSearchCars={handleSearchCars}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
}
