import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableContainer,
  TablePagination,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import Back from "../Misc/Back";

// Custom Table Cell
const CustomTC = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

// View Page
const View = () => {
  const theme = useTheme();

  // Constants
  const rowOptions = [5, 10, 15, 20, 25];

  // States
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("asc");
  const [maxRows, setMaxRows] = useState(rowOptions[0]);
  const [page, setPage] = useState(0);

  // Helpers
  const labels = [
    {
      field: "fname",
      label: "First Name",
    },
    {
      field: "lname",
      label: "Last Name",
    },
    {
      field: "email",
      label: "Email",
    },
    {
      field: "about",
      label: "About",
    },
    {
      field: "dob",
      label: "Date of Birth",
    },
    {
      field: "timestamp",
      label: "Timestamp",
    },
  ];

  // Comparators
  const compareDesc = (a, b) => {
    if (a.timestamp === b.timestamp) return 0;
    if (a.timestamp > b.timestamp) return -1;
    return 1;
  };
  const compareAsc = (a, b) => {
    if (a.timestamp === b.timestamp) return 0;
    if (a.timestamp < b.timestamp) return -1;
    return 1;
  };

  // Toggle Order
  const toggleOrder = () => {
    setOrder((prev) => {
      let newOrder = prev === "asc" ? "desc" : "asc";
      let comparator = newOrder === "asc" ? compareAsc : compareDesc;
      setUsers((prevUsers) => {
        prevUsers.sort(comparator);
        return prevUsers;
      });
      return newOrder;
    });
  };

  // Date Formatting
  const formatDate = (d) => {
    let date = new Date(d);
    return date.toLocaleString("en");
  };

  // Fetch Users
  // Made async because it may end up asynchronous when working with api calls.
  const fetchUsers = async () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
    // let temp = [];
    // for (let i = 0; i < 53; i++) {
    //   temp.push({
    //     fname: "Divyansh",
    //     lname: "Falodiya",
    //     email: "divyanshfofficial@gmail.com",
    //     dob: "2001-02-25",
    //     about:
    //       "Let this paragraph be a reminder for me to do something about my life that is worth the time. Keep striving for the best out there. Learn and hustle every day.",
    //     timestamp: Date.now(),
    //   });
    // }
    // return temp;
  };

  // Effect
  useEffect(() => {
    fetchUsers().then((res) => setUsers(res));
  }, []);

  // Page Change
  const handlePageChange = (e, p) => {
    setPage(p);
  };

  // Max Row Change
  const handleMaxRowChange = (e) => {
    setMaxRows(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ position: "sticky", left: 0 }}>
        <Back />
        <Typography
          variant="h5"
          align="center"
          color={theme.palette.text.primary}
        >
          View Users
        </Typography>
      </Box>
      {users.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: theme.spacing(5) }}>
          <Typography variant="subtitle" align="center" color="error">
            No records yet.
          </Typography>
        </Box>
      ) : (
        <TableContainer
          sx={{
            marginTop: theme.spacing(5),
          }}
        >
          <Table>
            <TableHead>
              {labels.map((l, index) => (
                <CustomTC
                  key={index}
                  sx={{
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    minWidth: l.field === "about" ? 200 : "auto",
                  }}
                  sortDirection={l.field === "timestamp" ? order : false}
                >
                  {l.field === "timestamp" ? (
                    <TableSortLabel
                      active={l.field === "timestamp"}
                      direction={l.field === "timestamp" ? order : "asc"}
                      onClick={toggleOrder}
                      sx={{
                        "&.Mui-active": {
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    >
                      {l.label}
                    </TableSortLabel>
                  ) : (
                    l.label
                  )}
                </CustomTC>
              ))}
            </TableHead>
            <TableBody>
              {users
                .slice(page * maxRows, page * maxRows + maxRows)
                .map((u, index) => (
                  <TableRow key={index}>
                    {labels.map((l, lindex) => (
                      <CustomTC
                        key={lindex}
                        sx={{
                          verticalAlign: "top",
                          background: theme.palette.background.paper,
                        }}
                      >
                        {l.field !== "timestamp"
                          ? u[l.field]
                          : formatDate(u[l.field])}
                      </CustomTC>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={rowOptions}
            component={Box}
            count={users.length}
            rowsPerPage={maxRows}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleMaxRowChange}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default View;
