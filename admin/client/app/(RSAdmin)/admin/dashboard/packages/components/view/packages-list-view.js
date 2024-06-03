"use client";

import isEqual from "lodash/isEqual";
import { useState, useCallback, useEffect } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { useRouter } from "@/app/(RSAdmin)/admin/routes/hook";
import { useBoolean } from "@/app/(RSAdmin)/admin/hooks//use-boolean";
import Iconify from "@/app/(RSAdmin)/admin/common/iconify";
import Scrollbar from "@/app/(RSAdmin)/admin/common/scrollbar";
import { ConfirmDialog } from "@/app/(RSAdmin)/admin/common/custom-dialog";
import { useSettingsContext } from "@/app/(RSAdmin)/admin/common/settings";
import CustomBreadcrumbs from "@/app/(RSAdmin)/admin/common/custom-breadcrumbs";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "@/app/(RSAdmin)/admin/common/table";
import { LoadingScreen } from "@/app/(RSAdmin)/admin/common/loading-screen";
import { useSnackbar } from "@/app/(RSAdmin)/admin/common/snackbar";
import PassengersTableToolbar from "../packages-table-toolbar";
import PassengersTableFiltersResult from "../packages-table-filters-result";
import PassengersTableRow from "../packages-table-row";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";
import { packages } from "@/_mock/_packages";
import PackagesTableToolbar from "../packages-table-toolbar";
import PackagesTableFiltersResult from "../packages-table-filters-result";
import PackagesTableRow from "../packages-table-row";

// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "pricePerMilage", label: "Price Per Milage", width: 150 },
  { id: "serviceFee", label: "Service Fee", width: 150 },
  { id: "drivingProMin", label: "Driving Pro Min", width: 150 },
  { id: "waitingProMin", label: "Waiting Pro Min", width: 150 },
  { id: "", width: 88 },
];

const defaultFilters = {
  search: "",
  role: [],
};

// ----------------------------------------------------------------------

export default function PackagesListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState(packages);
  const [changeFlag, setChangeFlag] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log(tableData)

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.packages.details(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        setLoading(true);
        // const deleteRow = tableData.filter((row) => row.id !== id);
        const { status } = await axios.delete(endpoints.packages.delete(id));

        if (status === 200) {
          enqueueSnackbar('Delete Sucessfully');

          setChangeFlag((prev) => !prev)
        }

      } catch (error) {
        setLoading(false);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      setLoading(true);
      router.push(paths.dashboard.packages.edit(id));
      setLoading(false);
    },
    [router]
  );


  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // const fetch = async () => {
  //   setLoading(true);
  //   const { data, status } = await axios.get(endpoints.packages);
  //   if (status === 200) {
  //     setTableData(data);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetch();
  // }, [changeFlag]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container maxWidth={settings.themeStretch ? false : "lg"}>
            <CustomBreadcrumbs
              heading="Packages List"
              links={[
                { name: "Dashboard", href: paths.dashboard.root },
                { name: "Packages", href: paths.dashboard.packages.root },
                { name: "List" },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />

            <Card>

              <PackagesTableToolbar
                filters={filters}
                onFilters={handleFilters}
              />

              {canReset && (
                <PackagesTableFiltersResult
                  filters={filters}
                  onFilters={handleFilters}
                  //
                  onResetFilters={handleResetFilters}
                  //
                  results={dataFiltered.length}
                  sx={{ p: 2.5, pt: 0 }}
                />
              )}

              <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <TableSelectedAction
                  dense={table.dense}
                  numSelected={table.selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  action={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={confirm.onTrue}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  }
                />

                <Scrollbar>
                  <Table
                    size={table.dense ? "small" : "medium"}
                    sx={{ minWidth: 960 }}
                  >
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          tableData.map((row) => row.id)
                        )
                      }
                    />

                    <TableBody>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <PackagesTableRow
                            key={row.id}
                            row={row}
                            deleteConfirm={confirm}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                            setChangeFlag={setChangeFlag}
                          />
                        ))}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(
                          table.page,
                          table.rowsPerPage,
                          tableData.length
                        )}
                      />

                      <TableNoData notFound={notFound} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={dataFiltered.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
                //
                dense={table.dense}
                onChangeDense={table.onChangeDense}
              />
            </Card>
          </Container>

          <ConfirmDialog
            open={confirm.value}
            onClose={confirm.onFalse}
            title="Delete"
            content={
              <>
                Are you sure want to delete{" "}
                <strong> {table.selected.length} </strong> items?
              </>
            }
            action={
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteRows();
                  confirm.onFalse();
                }}
              >
                Delete
              </Button>
            }
          />
        </>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { search } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (search) {
    inputData = inputData?.filter((packages) => {
      console.log(packages)
      return (
        packages.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        packages.description.toLowerCase().indexOf(search.toLowerCase()) !== -1 
      );
    });
  }


  if (status) {
    inputData = inputData.filter((user) => status.includes(user.status));
  }

  return inputData;
}
