import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
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
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ height: '64px', backgroundColor: '#3f51b5', zIndex: 1300 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon sx={{ '&:hover': { color: '#f50057', transition: 'color 0.3s ease-in-out' } }} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Furniture Store
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
                <Button
                  color="inherit"
                  aria-controls="furniture-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  sx={{ textTransform: 'none' }}
                >
                  Furniture
                </Button>
                <Menu
                  id="furniture-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {items.map((item) => (
                    <MenuItem
                      key={item.id}
                      onClick={handleMenuClose}
                      component={Link}
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </NavItem>
              <NavItem>
                <Link to="/materials" style={{ textDecoration: 'none', color: 'inherit' }}>Materials</Link>
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
