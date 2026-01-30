import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  ClickAwayListener,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./BookRecommenderNavbar.css";

const BookRecommenderNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        className="navbar-glass"
      >
        <Toolbar className="navbar-toolbar">
          {/* Brand */}
          <Typography variant="h6" className="navbar-logo">
            BookFinder
          </Typography>

          {/* Right Actions */}
          <Box className="navbar-actions">
            {/* Home */}
            <Button
              component={Link}
              to="/home"
              startIcon={<HomeIcon />}
              className="nav-btn"
            >
              Home
            </Button>

            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box className="dropdown-wrapper">
                <Button
                  startIcon={<LibraryBooksIcon />}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  }
                  className="nav-btn"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  Books
                </Button>

                {open && (
                  <Paper className="dropdown-menu">
                    <Button
                      component={Link}
                      to="/newbook"
                      startIcon={<AddIcon />}
                      className="dropdown-item"
                      fullWidth
                      onClick={() => setOpen(false)}
                    >
                      Add Book
                    </Button>

                    <Button
                      component={Link}
                      to="/viewbook"
                      startIcon={<MenuBookIcon />}
                      className="dropdown-item"
                      fullWidth
                      onClick={() => setOpen(false)}
                    >
                      View Books
                    </Button>
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer so content is not hidden under fixed navbar */}
      <Toolbar />
    </>
  );
};

export default BookRecommenderNavbar;
