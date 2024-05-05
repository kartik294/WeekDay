/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import JobCard from "./JobCard";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBox from "./SearchBox";
import { debounce } from "lodash";

const JobList = () => {
  // State variables for managing jobs and loading state
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({});
  // Effect to fetch jobs when offset changes
  useEffect(() => {
    const fetchJobs = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      try {
        // Fetching job data
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const data = await response.json();

        console.log("API Response:", data);
        // Updating jobs and filteredJobs based on API response
        if (data && data.jdList && Array.isArray(data.jdList)) {
          // If filters are applied, set only filteredJobs
          if (Object.keys(filters).length > 0) {
            applyFilters(filters, data.jdList);
          } else {
            // If no filters, set jobs and filteredJobs
            setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
            setFilteredJobs((prevJobs) => [...prevJobs, ...data.jdList]);
          }
          setLoading(false);
        } else {
          console.error("Invalid API response format");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, [offset]); // Only re-fetch jobs when offset changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Function to handle scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setOffset((prevOffset) => prevOffset + 10);
  };
  // Debounced function to handle filter changes
  const handleFiltersChange = debounce((filters) => {
    setFilters(filters);
    applyFilters(filters, jobs);
  }, 300);
  // Function to apply filters to jobs
  const applyFilters = (filters) => {
    // Clear filteredJobs before applying filters
    setFilteredJobs([]);

    const filtered = jobs.filter((job) => {
      let matchesFilter = true;

      // Filter by role
      if (
        filters.role &&
        job.jobRole.toLowerCase() !== filters.role.toLowerCase()
      ) {
        matchesFilter = false;
      }

      // Filter by number of employees
      if (filters.employees) {
        const [minEmployees, maxEmployees] = filters.employees
          .split("-")
          .map(Number);
        const jobEmployees = parseInt(job.employees, 10);
        if (jobEmployees < minEmployees || jobEmployees > maxEmployees) {
          matchesFilter = false;
        }
      }

      // Filter by experience
      if (
        filters.experience &&
        parseInt(job.minExp, 10) !== parseInt(filters.experience, 10)
      ) {
        matchesFilter = false;
      }

      // Filter by remote option
      if (filters.remote && job.remote !== filters.remote) {
        matchesFilter = false;
      }

      // Filter by minimum base pay salary
      if (
        filters.minSalary &&
        parseInt(job.minJdSalary, 10) < parseInt(filters.minSalary, 10)
      ) {
        matchesFilter = false;
      }

      // Filter by company name (case-insensitive)
      if (
        filters.companyName &&
        !job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      ) {
        matchesFilter = false;
      }

      return matchesFilter;
    });

    // Update filteredJobs with the filtered array
    setFilteredJobs(filtered);
  };
  console.log(filteredJobs.map((job) => job.id));
  // Function to handle view job click
  const handleViewJobClick = () => {
    window.location.href = "https://www.weekday.works/";
  };

  return (
    <div>
      <SearchBox handleFilters={handleFiltersChange} />

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {filteredJobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${job.jdUid}-${index}`}>
            <JobCard job={job} onViewJobClick={handleViewJobClick} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default JobList;
