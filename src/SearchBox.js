import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, MenuItem } from "@mui/material";
// Custom styles for the SearchBox component
const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  searchField: {
    flex: "1 1 auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
}));
// SearchBox component definition
const SearchBox = ({ handleFilters }) => {
  const classes = useStyles();
  // State to manage filter values
  const [filters, setFilters] = useState({
    role: "",
    employees: "",
    experience: "",
    remote: "",
    minSalary: "",
    companyName: "",
  });
  // Handler function for input changes
  const handleChange = (name) => (event) => {
    setFilters({ ...filters, [name]: event.target.value });
  };
  // Handler function for applying filters
  const handleSubmit = () => {
    handleFilters(filters);
  };

  return (
    <div className={classes.searchBar}>
      {/* Select input for job roles */}
      <TextField
        className={classes.searchField}
        select
        label="Roles"
        variant="outlined"
        value={filters.role}
        onChange={handleChange("role")}
      >
        {[
          "Backend",
          "Frontend",
          "Fullstack",
          "IOS",
          "Flutter",
          "React Native",
          "Tech Lead",
        ].map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      {/* Select input for number of employees */}
      <TextField
        className={classes.searchField}
        select
        label="Number of Employees"
        variant="outlined"
        value={filters.employees}
        onChange={handleChange("employees")}
      >
        {["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+"].map(
          (range) => (
            <MenuItem key={range} value={range}>
              {range}
            </MenuItem>
          )
        )}
      </TextField>
      {/* Select input for experience */}
      <TextField
        className={classes.searchField}
        select
        label="Experience"
        variant="outlined"
        value={filters.experience}
        onChange={handleChange("experience")}
      >
        {[...Array(10).keys()].map((exp) => (
          <MenuItem key={exp + 1} value={exp + 1}>
            {exp + 1}
          </MenuItem>
        ))}
      </TextField>
      {/* Select input for remote options */}
      <TextField
        className={classes.searchField}
        select
        label="Remote"
        variant="outlined"
        value={filters.remote}
        onChange={handleChange("remote")}
      >
        {["Remote", "Hybrid", "In-office"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {/* Select input for minimum base pay salary */}
      <TextField
        className={classes.searchField}
        select
        label="Minimum Base Pay Salary"
        variant="outlined"
        value={filters.minSalary}
        onChange={handleChange("minSalary")}
      >
        {[
          "0",
          "10LPA",
          "20LPA",
          "30LPA",
          "40LPA",
          "50LPA",
          "60LPA",
          "70LPA",
        ].map((salary) => (
          <MenuItem key={salary} value={salary}>
            {salary}
          </MenuItem>
        ))}
      </TextField>
      {/* Text input for searching company name */}
      <TextField
        className={classes.searchField}
        label="Search Company Name"
        variant="outlined"
        value={filters.companyName}
        onChange={handleChange("companyName")}
      />
      {/* Button to apply filters */}
      <button onClick={handleSubmit}>Apply Filters</button>
    </div>
  );
};

export default SearchBox;
