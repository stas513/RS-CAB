"use client";

import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import { fNumber } from "@/app/(RSAdmin)/admin/utils/format-number";
import Iconify from "@/app/(RSAdmin)/admin/common/iconify";
import DriverWidget from "./driver-widget";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { bgGradient } from "@/app/(RSAdmin)/admin/theme/css";
import { fDate } from "@/app/(RSAdmin)/admin/utils/format-time";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import { useBoolean } from "@/app/(RSAdmin)/admin/hooks/use-boolean";
import DocQuickEditForm from "./drivers-document-quick-edit";
import { endpoints } from "../../../utils/axios";
import axios from "axios";

export default function DriverInfo({ info }) {
  const fileRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [documents, setDocuments] = useState({});
  const [forEdit, setForEdit] = useState({});
  const [titleForModal, setTitleForModal] = useState("");
  const [changeFlag, setChangeFlag] = useState(true)
  const [loading, setLoading] = useState(true);

  const paperDoc = {
    accProfDoc: info?.document?.accProfDoc,
    licenceDocFront: info?.document?.licenceDocFront,
    licenceDocBack: info?.document?.licenceDocBack,
    pcoBadgeDocFront: info?.document?.pcoBadgeDocFront,
    pcoBadgeDocBack: info?.document?.pcoBadgeDocBack,
    pcoPaperDoc: info?.document?.pcoPaperDoc,
    passportDocFront: info?.document?.passportDocFront,
    passportDocBack: info?.document?.passportDocBack,
    addressProfDoc: info?.document?.addressProfDoc,
  };

  const fetch = async () => {
    setLoading(true);
    try {
      for (const key in paperDoc) {
        const res = await axios.get(endpoints.documents.doc(paperDoc[key]))
        if (res.status === 200) {
          setDocuments((prev) => ({
            ...prev,
            [key]: res.data,
          }));
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [changeFlag]);

  const theme = useTheme();
  const quickEdit = useBoolean();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const jobStatus = (
    <Card sx={{ py: 3, textAlign: "center", typography: "h4" }}>
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderStyle: "dashed" }}
          />
        }
      >
        <Stack width={1}>
          {fNumber(info?.totalJobComplete)}
          <Box
            component="span"
            sx={{ color: "text.secondary", typography: "body2" }}
          >
            Total jobs complete
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(info?.totalJobs || 300)}
          <Box
            component="span"
            sx={{ color: "text.secondary", typography: "body2" }}
          >
            Total Jobs
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="Bio" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: "body2" }}>{info?.bio}</Box>
        <Box sx={{ typography: "body2" }}>{`Hobby: ${info?.hobby}`}</Box>
      </Stack>
    </Card>
  );

  const doc = (
    <Card>
      <CardHeader title="Legal information" />
      <Stack spacing={1.5} sx={{ p: 3, typography: "body2" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Sort code
          </Box>
          {info?.document?.sortCode}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Bank name
          </Box>
          {info?.document?.bankName}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Licence number
          </Box>
          {info?.document?.licenceNumber}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Licence expiry date
          </Box>
          {fDate(info?.document?.licenceExpiryDate)}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            PCO badge number
          </Box>
          {info?.document?.pcoBadgeNumber}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            PCO badge expiry date
          </Box>
          {fDate(info?.document?.pcoBadgeExpiryDate)}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Work permit code
          </Box>
          {info?.document?.workPermitCode}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Passport expiry date
          </Box>
          {fDate(info?.document?.passportExpiryDate)}
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {jobStatus}

          {renderAbout}

          {doc}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <DriverWidget
                title="Current balance"
                total={info?.currentBalance}
                sx={{
                  ...bgGradient({
                    direction: "135deg",
                    startColor: alpha(theme.palette["primary"].light, 0.2),
                    endColor: alpha(theme.palette["primary"].main, 0.2),
                  }),
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <DriverWidget
                title="Deposite Amount"
                total={info?.depositeAmount}
                sx={{
                  ...bgGradient({
                    direction: "135deg",
                    startColor: alpha(theme.palette["success"].light, 0.2),
                    endColor: alpha(theme.palette["success"].main, 0.2),
                  }),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              {loading ? (
                <LoadingScreen />
              ) : (
                <Card sx={{ bgcolor: "background.neutral" }}>
                  <CardHeader
                    title="Documents"
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
                          Account proof
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
                                  accProfDoc: documents?.accProfDoc,
                                });
                                setTitleForModal("Account proof");
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
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.accProfDoc}
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
                          Licence
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
                                  licenceDocFront: documents?.licenceDocFront,
                                  licenceDocBack: documents?.licenceDocBack,
                                });
                                setTitleForModal("Licence");
                                quickEdit.onTrue();
                              }}
                            >
                              Edit
                            </Button>
                          </Stack>
                          <Grid container spacing={2}>
                            <Grid
                              sm={12}
                              md={6}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.licenceDocFront}
                                alt="front"
                                objectFit="content"
                                layout="responsive"
                                width={400}
                                height={300}
                              />
                            </Grid>
                            <Grid
                              sm={12}
                              md={6}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.licenceDocBack}
                                alt="back"
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
                          PCO badge
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
                                  pcoBadgeDocFront: documents?.pcoBadgeDocFront,
                                  pcoBadgeDocBack: documents?.pcoBadgeDocBack,
                                });
                                setTitleForModal("PCO badge");
                                quickEdit.onTrue();
                              }}
                            >
                              Edit
                            </Button>
                          </Stack>
                          <Grid container spacing={2}>
                            <Grid
                              sm={12}
                              md={6}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.pcoBadgeDocFront}
                                alt="front"
                                objectFit="content"
                                layout="responsive"
                                width={400}
                                height={300}
                              />
                            </Grid>
                            <Grid
                              sm={12}
                              md={6}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.pcoBadgeDocBack}
                                alt="back"
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
                          PCO paper
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
                                  pcoPaperDoc: documents?.pcoPaperDoc,
                                });
                                setTitleForModal("PCO paper");
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
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.pcoPaperDoc}
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
                          Passport
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
                                  passportDocFront: documents?.passportDocFront,
                                  passportDocBack: documents?.passportDocBack,
                                });
                                setTitleForModal("Passport");
                                quickEdit.onTrue();
                              }}
                            >
                              Edit
                            </Button>
                          </Stack>
                          <Grid container spacing={2}>
                            <Grid
                              sm={12}
                              md={6}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.passportDocFront}
                                alt="front"
                                objectFit="content"
                                layout="responsive"
                                width={400}
                                height={300}
                              />
                            </Grid>
                            <Grid
                              sm={12}
                              md={6}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.passportDocBack}
                                alt="back"
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
                      expanded={expanded === "panel6"}
                      onChange={handleChange("panel6")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Address proof
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
                                  addressProfDoc: documents?.addressProfDoc,
                                });
                                setTitleForModal("Address proof");
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
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Image
                                src={documents.addressProfDoc}
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
              )}
            </Grid>
            <DocQuickEditForm
              title={titleForModal}
              currentData={forEdit}
              open={quickEdit.value}
              onClose={quickEdit.onFalse}
              driverId={info?.id}
              setChangeFlag={setChangeFlag}
            />
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}

DriverInfo.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
