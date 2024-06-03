import PropTypes from "prop-types";
import * as Yup from "yup";
import { useMemo, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { useRouter } from "@/app/(RSAdmin)/admin/routes/hook";
import { useSnackbar } from "@/app/(RSAdmin)/admin/common/snackbar";
import FormProvider, {
  RHFSelect,
  RHFAutocomplete,
} from "@/app/(RSAdmin)/admin/common/hook-form";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";

import { CircularProgress, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {
  fetchPredictions,
  fetchPlaceDetails,
} from "../../../utils/GoogleMapsApi";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { calculateTotalDistance } from "@/app/(RSWeb)/utils/GoogleMapsApi";

export default function BookingNewEditForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [dropOffValues, setDropOffValues] = useState([]);
  const [userSelected, setUserSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [packages, setPackages] = useState([]);
  const [startAddress, setStartAddress] = useState([]);
  const [destinationAddress, setDestinationAddress] = useState([]);
  const [additionalLocations, setAdditionalLocations] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  const handleAddLocation = () => {
    setDropOffValues([...dropOffValues, ""]); // Initialize with an empty string
  };

  const handleLocationInputChange = (newValue, index) => {
    const newDropOffValues = [...dropOffValues]; // Create a copy of the array
    newDropOffValues[index] = newValue ?? ""; // Modify the copy
    setDropOffValues(newDropOffValues); // Update the state with the modified copy
  };

  const handleInputChange = async (event) => {
    if (userSelected) {
      setPredictions([]); // Reset predictions array
      setUserSelected(false); // Reset userSelected state
      return;
    }
    setLoading(true);
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    try {
      const predictions = await fetchPredictions(newInputValue);
      setPredictions(predictions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePlaceSelect = async (place, identifier) => {
    setLoading(true);

    try {
      if (identifier === "stopages") {
        let response = [];
        for (let value of place) {
          const placeDetails = await fetchPlaceDetails(value);
          setLoading(false);
          response.push(placeDetails);
        }

        return response;
      } else {
        const placeDetails = await fetchPlaceDetails(place);
        setLoading(false);
        return placeDetails;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const fetch = async () => {
    setLoading(true);
    const { data, status } = await axios.get(endpoints.packages.allPackages);
    if (status === 200) {
      setPackages(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const NewUserSchema = Yup.object().shape({
    bookingDate: Yup.string().required("Date is required"),
    bookingTime: Yup.string().required("Time is required"),
    startAddress: Yup.string().required("Start Address is required"),
    destinationAddress: Yup.string().required(
      "Destination Address is required"
    ),
    package: Yup.object().required("Select any one package"),
    stopages: Yup.array(),
  });
  const defaultValues = {
    bookingDate: "", // Provide a default value here
    bookingTime: "", // Provide a default value here
    startAddress: "",
    destinationAddress: "",
    stopages: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promises = [
      handlePlaceSelect(data.startAddress, "startAddress"),
      handlePlaceSelect(data.destinationAddress, "destinationAddress"),
      handlePlaceSelect(data.stopages, "stopages"),
    ];

    // Wait for all promises to complete
    const res = await Promise.all(promises);

    data.startAddress = res[0];
    data.destinationAddress = res[1];
    data.stopages = res[2];

    let locations = {
      startAddress: data.startAddress,
      destinationAddress: data.destinationAddress,
      stopages: data.stopages,
    };

    const distance = await calculateTotalDistance(locations);
    data.totalDistance = distance.toFixed(2);
    data.totalBill = (distance * data.package.pricePerMilage).toFixed(2);
    data.package = data.package.id;

    console.log(data);
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid xs={12} md={10}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
            >
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(3, 1fr)",
                }}
              >
                <Controller
                  name="bookingDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="Booking Date"
                      value={field.value ? new Date(field.value) : null} // Convert to Date object if not null
                      onChange={(newValue) => {
                        field.onChange(newValue.toISOString()); // Convert to ISO-8601 format before setting
                      }}
                      format="dd-MM-yyyy" // ISO-8601 format
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="bookingTime"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TimePicker
                      {...field}
                      label="Booking Time"
                      onChange={(newValue) => {
                        field.onChange(newValue.toISOString().split("T")[1]);
                      }}
                      format="HH:mm:ss"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
                <RHFSelect
                  fullWidth
                  name="package"
                  label="Packages"
                  InputLabelProps={{ shrink: true }}
                  PaperPropsSx={{ textTransform: "capitalize" }}
                >
                  {packages.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <RHFAutocomplete
                  name="startAddress"
                  freeSolo
                  disableClearable
                  options={predictions.map(
                    (prediction) => prediction.description
                  )}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={selectedValue}
                      label="Pick Up Location"
                      variant="outlined"
                      onChange={handleInputChange}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading && (
                              <CircularProgress color="inherit" size={20} />
                            )}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
                <RHFAutocomplete
                  name="destinationAddress"
                  freeSolo
                  disableClearable
                  options={predictions.map(
                    (prediction) => prediction.description
                  )}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Drop Of Location"
                      variant="outlined"
                      onChange={handleInputChange}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading && (
                              <CircularProgress color="inherit" size={20} />
                            )}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                rowGap={3}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                }}
              >
                {dropOffValues.map((value, index) => (
                  <RHFAutocomplete
                    name={`stopages[${index}]`}
                    key={index}
                    freeSolo
                    disableClearable
                    options={predictions.map(
                      (prediction) => prediction.description
                    )}
                    loading={loading}
                    // onInputChange={(event, newValue) =>
                    //   handleLocationInputChange(newValue ?? "", index)
                    // }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Additional Drop Off Location ${index + 1}`}
                        variant="outlined"
                        onChange={handleInputChange}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading && (
                                <CircularProgress color="inherit" size={20} />
                              )}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                ))}
              </Box>
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton variant="contained" onClick={handleAddLocation}>
                Add Drop Off Location
              </LoadingButton>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {/* {!currentUser ? "Create Booking" : "Save Changes"} */}
                Create Booking
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BookingNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
