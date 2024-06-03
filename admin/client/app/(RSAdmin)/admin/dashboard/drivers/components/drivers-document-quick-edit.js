import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useSnackbar } from "@/app/(RSAdmin)/admin/common/snackbar";
import FormProvider, { RHFUpload } from "@/app/(RSAdmin)/admin/common/hook-form";
import axios from "axios";
import { endpoints } from "../../../utils/axios";

// ----------------------------------------------------------------------

export default function DocQuickEditForm({ title, currentData, open, onClose, driverId, setChangeFlag }) {
  const { enqueueSnackbar } = useSnackbar();

  const DocSchema = Yup.object().shape(
    Object.keys(currentData).reduce((schema, key) => {
      schema[key] = Yup.mixed()

      return schema;
    }, {})
  );

  const defaultValues = useMemo(() => {
    const generateDefaultValues = (data) => {
      const defaultValues = {};

      for (const key in data) {
        if (typeof data[key] === "object" && data[key] !== null) {
          defaultValues[key] = generateDefaultValues(data[key]);
        } else {
          defaultValues[key] = data[key] || "";
        }
      }

      return defaultValues;
    };

    return generateDefaultValues(currentData);
  }, [currentData]);

  const methods = useForm({
    resolver: yupResolver(DocSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleDrop = useCallback(
    (key, acceptedFile) => {
      const file = acceptedFile;

      if (file) {
        setValue(key, file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(
    (key) => {
      const filtered =
        values[key] && values[key]?.filter((file) => file !== inputFile);
      setValue(key, filtered);
    },
    [setValue, values]
  );

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    try {
      const response = await axios.put(endpoints.drivers.updateDoc(driverId), formData);
      if (response.status === 200) {
        setChangeFlag((prev)=> !prev)
        enqueueSnackbar("Update success!");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{`Update ${title}`}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: `repeat(${Object.keys(currentData)?.length}, 1fr)`,
            }}
          >
            {Object.keys(currentData).map((key, index) => (
              <RHFUpload
                key={key}
                thumbnail
                name={key}
                maxSize={3145728}
                onDrop={(acceptedFiles) => handleDrop(key, acceptedFiles[0])}
                onRemove={() => handleRemoveFile(key)}
                onUpload={() => console.info("ON UPLOAD")}
              />
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

DocQuickEditForm.propTypes = {
  title: PropTypes.string,
  currentData: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
