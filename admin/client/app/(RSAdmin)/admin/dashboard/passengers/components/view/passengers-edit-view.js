"use client";

import PropTypes from "prop-types";
// @mui
import Container from "@mui/material/Container";
// components
//
import PassengersNewEditForm from "../passengers-new-edit-form";
import { useEffect, useState } from "react";
import { useSettingsContext } from "@/app/(RSAdmin)/admin/common/settings";
import CustomBreadcrumbs from "@/app/(RSAdmin)/admin/common/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";

// ----------------------------------------------------------------------

export default function PassengerEditView({ id }) {
  const [currentPassenger, setCurrentPassenger] = useState({});
  const [loading, setLoading] = useState(true);
  const settings = useSettingsContext();

  const fetch = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(endpoints.passengers.byId(id))
      if (status === 200) {
        setCurrentPassenger(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : "lg"}>
          <CustomBreadcrumbs
            heading="Edit"
            links={[
              {
                name: "Dashboard",
                href: paths.dashboard.root,
              },
              {
                name: "Passenger",
                href: paths.dashboard.passengers.root,
              },
              { name: currentPassenger?.userInfo?.firstName },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <PassengersNewEditForm currentPassenger={currentPassenger} />
        </Container>
      )}
    </>
  );
}

PassengerEditView.propTypes = {
  id: PropTypes.string,
};
