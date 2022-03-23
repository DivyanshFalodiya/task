import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
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

  // States
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("asc");

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
    // return JSON.parse(localStorage.getItem("users") || "[]");
    let temp = [];
    for (let i = 0; i < 53; i++) {
      temp.push({
        fname: "Divyansh",
        lname: "Falodiya",
        email: "divyanshfofficial@gmail.com",
        dob: "2001-02-25",
        about:
          "Let this paragraph be a reminder for me to do something about my life that is worth the time. Keep striving for the best out there. Learn and hustle every day.",
        timestamp: Date.now(),
      });
    }
    return temp;
  };

  // Effect
  useEffect(() => {
    fetchUsers().then((res) => setUsers(res));
  }, []);

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
        <Table
          sx={{
            marginTop: theme.spacing(5),
          }}
        >
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
            {users.map((u, index) => (
              <TableRow key={index}>
                {labels.map((l, lindex) => (
                  <CustomTC key={lindex} sx={{ verticalAlign: "top" }}>
                    {l.field !== "timestamp"
                      ? u[l.field]
                      : formatDate(u[l.field])}
                  </CustomTC>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default View;
