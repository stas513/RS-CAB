"use client";

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { useSettingsContext } from "@/app/(RSAdmin)/admin/common/settings";
import CarDetailsToolbar from "../car-details-toolbar";
import CarDetailsInfo from "../car-details-info";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Iconify from "@/app/(RSAdmin)/admin/common/iconify/iconify";
import CarDocQuickEditForm from '../car-document-quick-edit'
import { useBoolean } from "@/app/(RSAdmin)/admin/hooks/use-boolean";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";


export default function CarDetailsView({ driverId, id }) {
  const [currentCar, setCurrentCar] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingDoc, setLoadingDoc] = useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [documents, setDocuments] = useState({});
  const [paperDoc, setPaperDoc] = useState({});
  const [forEdit, setForEdit] = useState({});
  const [changeFlag, setChangeFlag] = useState(true)
  const [titleForModal, setTitleForModal] = useState("");
  const [carImage, setCarImage] = useState('')

  const quickEdit = useBoolean();

  const fetchDoc = async () => {
    setLoadingDoc(true);
    try {
      const carImage = currentCar.carImage ? await axios.get(endpoints.documents.doc(currentCar.carImage)) : null
      setCarImage(carImage)
      for (const key in paperDoc) {
        const res = await axios.get(endpoints.documents.doc(paperDoc[key]))
        if (res.status === 200) {
          setDocuments((prev) => ({
            ...prev,
            [key]: res.data,
          }));
          setLoadingDoc(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingDoc(false);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetch = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(endpoints.cars.byId(driverId, id))
      if (status === 200) {
        setCurrentCar(data);
        setPaperDoc({
          motDoc: data?.carDocument?.motDoc,
          insurenceDoc: data?.carDocument?.insurenceDoc,
          pcoVehicleLicenceDoc: data?.carDocument?.pcoVehicleLicenceDoc,
          vehicleLogBookDoc: data?.carDocument?.vehicleLogBookDoc,
          otherDoc: data?.carDocument?.otherDoc,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [changeFlag]);
  useEffect(() => {
    fetchDoc();
  }, [paperDoc, changeFlag]);
  const settings = useSettingsContext();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : "lg"}>
          <CarDetailsToolbar
            backLink={paths.dashboard.drivers.details(currentCar?.driverId)}
            car={currentCar}
            setCurrentCar={setCurrentCar}
          />

          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <CarDetailsInfo carDetail={currentCar} />
            </Grid>

            <Grid xs={12} md={8}>
              <Stack spacing={3} direction={{ xs: "column", md: "column" }}>
                <Card>
                  {
                    carImage ?
                      (<Image
                        src={carImage}
                        alt="front"
                        objectFit="content"
                        layout="responsive"
                        width={400}
                        height={300}
                      />) : (<Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Not Image Available
                      </Typography>)
                  }
                </Card>
                {loadingDoc ? <LoadingScreen /> :
                  <Card sx={{ bgcolor: "background.neutral" }}>
                    <CardHeader
                      title="Car's Documents"
                      action={
                        <IconButton>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      }
                    />

                    <Stack spacing={1} sx={{ p: 3 }}>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            MOT Document
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack sx={{ py: 1 }}>
                            <Stack
                              flexGrow={1}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                              mb={2}
                            >
                              <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<Iconify icon="solar:pen-bold" />}
                                onClick={() => {
                                  setForEdit({
                                    motDoc: documents?.motDoc,
                                  });
                                  setTitleForModal("MOT Document");
                                  quickEdit.onTrue();
                                }}
                              >
                                Edit
                              </Button>
                            </Stack>
                            <Grid container spacing={2}>
                              <Grid
                                sm={12}
                                md={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  src={documents?.motDoc}
                                  alt="front"
                                  objectFit="content"
                                  layout="responsive"
                                  width={400}
                                  height={300}
                                />
                              </Grid>
                            </Grid>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Insurence Document
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack sx={{ py: 1 }}>
                            <Stack
                              flexGrow={1}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                              mb={2}
                            >
                              <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<Iconify icon="solar:pen-bold" />}
                                onClick={() => {
                                  setForEdit({
                                    insurenceDoc: documents?.insurenceDoc,
                                  });
                                  setTitleForModal("Insurence Document");
                                  quickEdit.onTrue();
                                }}
                              >
                                Edit
                              </Button>
                            </Stack>
                            <Grid container spacing={2}>
                              <Grid
                                sm={12}
                                md={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  src={documents?.insurenceDoc}
                                  alt="front"
                                  objectFit="content"
                                  layout="responsive"
                                  width={400}
                                  height={300}
                                />
                              </Grid>
                            </Grid>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            PCO Licence Document
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack sx={{ py: 1 }}>
                            <Stack
                              flexGrow={1}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                              mb={2}
                            >
                              <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<Iconify icon="solar:pen-bold" />}
                                onClick={() => {
                                  setForEdit({
                                    pcoVehicleLicenceDoc: documents?.pcoVehicleLicenceDoc,
                                  });
                                  setTitleForModal("PCO Licence Document");
                                  quickEdit.onTrue();
                                }}
                              >
                                Edit
                              </Button>
                            </Stack>
                            <Grid container spacing={2}>
                              <Grid
                                sm={12}
                                md={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  src={documents?.pcoVehicleLicenceDoc}
                                  alt="front"
                                  objectFit="content"
                                  layout="responsive"
                                  width={400}
                                  height={300}
                                />
                              </Grid>
                            </Grid>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel4"}
                        onChange={handleChange("panel4")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Log Book Document
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack sx={{ py: 1 }}>
                            <Stack
                              flexGrow={1}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                              mb={2}
                            >
                              <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<Iconify icon="solar:pen-bold" />}
                                onClick={() => {
                                  setForEdit({
                                    vehicleLogBookDoc: documents?.vehicleLogBookDoc,
                                  });
                                  setTitleForModal("Log Book Document");
                                  quickEdit.onTrue();
                                }}
                              >
                                Edit
                              </Button>
                            </Stack>
                            <Grid container spacing={2}>
                              <Grid
                                sm={12}
                                md={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  src={documents?.vehicleLogBookDoc}
                                  alt="front"
                                  objectFit="content"
                                  layout="responsive"
                                  width={400}
                                  height={300}
                                />
                              </Grid>
                            </Grid>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel5"}
                        onChange={handleChange("panel5")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Other Document
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack sx={{ py: 1 }}>
                            <Stack
                              flexGrow={1}
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                              mb={2}
                            >
                              <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<Iconify icon="solar:pen-bold" />}
                                onClick={() => {
                                  setForEdit({
                                    otherDoc: documents?.otherDoc,
                                  });
                                  setTitleForModal("Other Document");
                                  quickEdit.onTrue();
                                }}
                              >
                                Edit
                              </Button>
                            </Stack>
                            <Grid container spacing={2}>
                              <Grid
                                sm={12}
                                md={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  src={documents?.otherDoc}
                                  alt="front"
                                  objectFit="content"
                                  layout="responsive"
                                  width={400}
                                  height={300}
                                />
                              </Grid>
                            </Grid>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    </Stack>
                  </Card>
                }
              </Stack>
            </Grid>
          </Grid>
          <CarDocQuickEditForm
            title={titleForModal}
            currentData={forEdit}
            open={quickEdit.value}
            onClose={quickEdit.onFalse}
            carId={currentCar?.id}
            setChangeFlag={setChangeFlag}
          />
        </Container>
      )}
    </>
  );
}

CarDetailsView.propTypes = {
  id: PropTypes.string,
};
