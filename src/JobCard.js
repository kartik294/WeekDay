import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  // Styles for the card component
  card: {
    border: "1px solid #000",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  // Styles for the card content
  cardContent: {
    overflow: "hidden",
  },
  // Styles for the card header section
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  // Styles for the expand button
  expandButton: {
    marginLeft: "auto",
  },
  // Styles for the company logo
  logo: {
    width: "80px",
    height: "auto",
    marginRight: "8px",
  },
  // Styles for the about us content section
  aboutUsContent: {
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
  },
  // Styles for the about company section
  aboutCompany: {
    fontWeight: 600,
  },
  // Styles for the view job container
  viewJobContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  // Styles for the easy apply button
  easyApplyButton: {
    backgroundColor: "rgb(85, 239, 196)", // Set background color to green
    color: "#fff", // Set text color to white
    "&:hover": {
      backgroundColor: "#4caf50", // Darken color on hover
    },
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: theme.spacing(2),
    color: "#fff", // Change text color to white
    backgroundColor: "rgba(0, 0, 255, 0.5)", // Set background color to blue with transparency
    padding: theme.spacing(1), // Add some padding for spacing
    borderRadius: theme.spacing(1), // Add border radius for rounded corners
  },
  avatar: {
    border: "2px solid #fff",
  },
  referralText: {
    color: "#fff", // Change text color to white
  },
}));

const JobCard = ({ job }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  // Function to handle expand/collapse button click
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Format job role for display
  const displayRole = job.jobRole
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  // Display minimum experience required, default to 2 years if not provided
  const displayExp = job.minExp || "2";
  // Display salary range or default to 10LPA if not provided
  const displaySalary =
    job.minJdSalary === null
      ? "10LPA"
      : `₹${job.minJdSalary} - ₹${job.maxJdSalary} LPA`;
  // Function to handle view job button click
  const handleViewJobClick = () => {
    window.location.href = "https://www.weekday.works/";
  };
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography
          variant="body1"
          className="MuiTypography-root MuiTypography-body1 css-9spv16"
        >
          ⏳ Posted 15 days ago
        </Typography>
        <div className={classes.cardHeader}>
          <Typography variant="h6" component="div">
            <img src={job.logoUrl} alt="logo" className={classes.logo} />
            {job.companyName}
          </Typography>
        </div>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {displayRole}
        </Typography>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          {job.location}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          gutterBottom
          className={classes.aboutCompany}
        >
          About Company:
        </Typography>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          About Us:
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.aboutUsContent}
        >
          {job.jobDetailsFromCompany}
        </Typography>

        <div className={classes.viewJobContainer}>
          <Button
            variant="contained"
            className={classes.easyApplyButton}
            onClick={handleViewJobClick}
          >
            View Job
          </Button>
        </div>
        <p className="MuiTypography-root MuiTypography-body2 card-salary css-361mbm">
          Estimated Salary: {displaySalary} ✅
          <br />
        </p>
        <div style={{ display: expanded ? "block" : "none" }}>
          {/* Additional job details */}
          <Typography variant="body1" color="textPrimary" gutterBottom>
            Min Exp: {displayExp} years
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
            className={classes.easyApplyButton}
          >
            ⚡ Easy Apply
          </Button>
          <div className={classes.avatarContainer}>
            <Avatar
              alt="Remy Sharp"
              src="/images/img1.jpeg"
              className={classes.avatar}
            />
            <Avatar
              alt="Travis Howard"
              src="/images/img2.jpeg"
              className={classes.avatar}
            />
            <Typography variant="body2" className={classes.referralText}>
              Unlock Refferal asks
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={classes.expandButton}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
