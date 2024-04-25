"use client";

import PropTypes from "prop-types";
// @mui
import Container from "@mui/material/Container";
// components
//
import DriversNewEditForm from "../drivers-new-edit-form";
import { useEffect, useState } from "react";
import { useSettingsContext } from "@/app/(RSAdmin)/admin/common/settings";
import CustomBreadcrumbs from "@/app/(RSAdmin)/admin/common/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";

// ----------------------------------------------------------------------

export default function DriversEditView({ id }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const settings = useSettingsContext();

  const fetch = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(endpoints.drivers.byId(id));
      if (status === 200) {
        setCurrentUser(data);
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
                name: "Driver",
                href: paths.dashboard.drivers.root,
              },
              { name: currentUser?.userInfo?.firstName },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <DriversNewEditForm currentUser={currentUser} />
        </Container>
      )}
    </>
  );
}

DriversEditView.propTypes = {
  id: PropTypes.string,
};
