'use client'
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import { useBoolean } from "@/app/(RSAdmin)/admin/hooks/use-boolean";
import Label from "@/app/(RSAdmin)/admin/common/label";
import Iconify from "@/app/(RSAdmin)/admin/common/iconify";
import CustomPopover, { usePopover } from "@/app/(RSAdmin)/admin/common/custom-popover";
import { ConfirmDialog } from "@/app/(RSAdmin)/admin/common/custom-dialog";
import DriversQuickEditForm from "./drivers-quick-edit-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../utils/axios";

export default function DriversTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
  setChangeFlag,
}) {

  const [loading, setLoading] = useState(true)

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  useEffect(() => {
    setLoading(true)
    const fetchImage = async()=> {
      try {
        if(row?.profileImage){
          const res = await axios.get(endpoints.documents.doc(row?.profileImage))
          if (res.status === 200) {
            row.profileImage = res.data
            setLoading(false)
          }
        }
        
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchImage()
  }, [])
  
  

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={row?.userInfo?.name}
            src={loading ? '' : row?.profileImage}
            sx={{ mr: 2 }}
          />

          <ListItemText
            primary={row?.userInfo?.name}
            secondary={row?.userInfo?.email}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {row?.userInfo?.phoneNumber}
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {row?.userInfo?.email}
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row?.status === "ACTIVE" && "success") ||
              (row?.status === "PENDING" && "warning") ||
              (row?.status === "SUSPEND" && "error") ||
              "default"
            }
          >
            {row?.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton
              color={quickEdit.value ? "inherit" : "default"}
              onClick={quickEdit.onTrue}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton
            color={popover.open ? "inherit" : "default"}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <DriversQuickEditForm
        currentUser={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        setChangeFlag={setChangeFlag}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 200 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete user {row.firstName} {row.lastName}
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

DriversTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
