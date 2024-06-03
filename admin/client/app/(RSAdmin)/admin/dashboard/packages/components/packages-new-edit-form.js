"use client";

import PropTypes from "prop-types";
import * as Yup from "yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "@/app/(RSAdmin)/admin/common/snackbar";
import FormProvider, {
  RHFTextField,
} from "@/app/(RSAdmin)/admin/common/hook-form";
import axios from "axios";
import { endpoints } from "../../../utils/axios";

// ----------------------------------------------------------------------

export default function PackagesNewEditForm({ currentPackage }) {

  const { enqueueSnackbar } = useSnackbar();

  const NewPassengerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    summary: Yup.string().required("Summary is required"),

  });


  const defaultValues = useMemo(
    () => ({
      firstName: currentPackage?.userInfo?.firstName || "",
      lastName: currentPackage?.userInfo?.lastName || "",
      email: currentPackage?.userInfo?.email || "",
      phoneNumber: currentPackage?.userInfo?.phoneNumber || "",
    }),
    [currentPackage]
  );

  const methods = useForm({
    resolver: yupResolver(NewPassengerSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.put(endpoints.packages.update(currentPackage.id), formData)

      if (response.status === 200) {
        enqueueSnackbar("Update success!");
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>


        <Grid xs={12} md={12} >
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentPackage ? "Create Passenger" : "Save Passenger"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid >
      </Grid >
    </FormProvider >
  );
}

PackagesNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
