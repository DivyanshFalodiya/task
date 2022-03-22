import { Cancel, Check, ViewAgenda } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 10000px ${theme.palette.background.paper} inset`,
    },
  },
}));

// Create Page
const Create = () => {
  const theme = useTheme();
  const classes = useStyles();

  // States
  const [data, setData] = useState({
    fname: { value: "", dirty: false, valid: false },
    lname: { value: "", dirty: false, valid: false },
    dob: { value: "", dirty: false, valid: false },
    email: { value: "", dirty: false, valid: false },
    about: { value: "", dirty: false, valid: false },
  });

  // Helper
  const dataMapping = [
    { field: "fname", label: "First Name", type: "text" },
    { field: "lname", label: "Last Name", type: "text" },
    { field: "email", label: "Email", type: "email" },
    { field: "dob", label: "Date of Birth", type: "date" },
    { field: "about", label: "About", type: "text" },
  ];
  const getAge = (date) => {
    var age = Math.floor(
      (new Date() - new Date(date)) / 1000 / 60 / 60 / 24 / 365
    );
    console.log(age);
    return age;
  };

  // Validity Check
  const checkValidity = (field, val) => {
    // About field
    if (field === "about" && val.length > 0) return true;

    // Name fields
    if (
      (field === "fname" || field === "lname") &&
      val.length > 0 &&
      val.match(/^[A-Za-z]+$/)
    )
      return true;

    // Email field
    if (
      field === "email" &&
      val.length > 0 &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
    )
      return true;

    // DOB Field
    if (field === "dob" && getAge(val) >= 18) return true;
    return false;
  };

  // Handle Change
  const handleChange = (e) => {
    setData((prev) => {
      let value = e.target.value.trim();
      return {
        ...prev,
        [e.target.name]: {
          value: value,
          dirty: true,
          valid: checkValidity(e.target.name, value),
        },
      };
    });
  };

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        color={theme.palette.text.primary}
      >
        Create User
      </Typography>
      <Box
        sx={{
          marginTop: theme.spacing(2),
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          autoComplete="chrome-off"
          style={{
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {dataMapping.map((d, index) => (
            <FormControl
              key={index}
              sx={{ margin: theme.spacing(2), width: "100%" }}
            >
              <TextField
                name={d.field}
                label={d.label}
                variant="filled"
                value={data[d.field].value}
                onChange={handleChange}
                multiline={d.field === "about"}
                rows={5}
                type={d.type}
                InputLabelProps={{ shrink: true }}
                required
                inputProps={{
                  className: classes.input,
                }}
                sx={{ backgroundColor: theme.palette.background.paper }}
                InputProps={{
                  endAdornment: data[d.field].dirty ? (
                    data[d.field].valid ? (
                      <Check
                        sx={{ background: "green", borderRadius: "50%" }}
                      />
                    ) : (
                      <Cancel sx={{ background: "red", borderRadius: "50%" }} />
                    )
                  ) : null,
                }}
              />
            </FormControl>
          ))}
          <Button
            variant="contained"
            sx={{ margin: theme.spacing(2), width: "100%" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Create;
