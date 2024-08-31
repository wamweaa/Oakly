import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import axios from 'axios';

const NavList = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavItem = styled('li')(({ theme }) => ({
  marginRight: theme.spacing(4),
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const UserIcon = styled(IconButton)({
  color: 'inherit',
  '&:hover': {
    color: '#f50057',
    transition: 'color 0.3s ease-in-out',
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ height: '64px', backgroundColor: '#8B4513', zIndex: 1300 }}>
        <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex'}}>
            <Link to="/">
              <img src="https://i.pinimg.com/236x/25/58/9c/25589c33c724f870b1984c86184798c3.jpg" alt="Oakly Logo" style={{ height: '40px' }} />
            </Link>
          </Box>
          <Typography variant="h6" noWrap sx={{ flexGrow: 45 }}>
            <h1>Oakly </h1>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavList>
              <NavItem>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
              </NavItem>
              <NavItem>
                <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
              </NavItem>
              <NavItem>
                <Link to="/product-container" style={{ textDecoration: 'none', color: 'inherit' }}>Furnitures</Link>
              </NavItem>
              <NavItem>
                <UserIcon component={Link} to="/profile">
                  <FaRegUser />
                </UserIcon>
              </NavItem>
            </NavList>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: '64px' }} />
    </>
  );
}

export default Navbar;
