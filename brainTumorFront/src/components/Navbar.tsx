import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar
    position="static"
    sx={{
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // Blue-black gradient
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    }}
  >
    <Toolbar>
      
      <Button
        component={RouterLink}
        to="/"
        sx={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          color: 'white',
          textTransform: 'none',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          '&:hover': {
            color: '#90caf9',
            backgroundColor: 'transparent',
          },
        }}
      >
        <ScienceIcon sx={{ mr: 2, color: 'white' }} />
        Brain Tumor Detection
      </Button>
      <Box>
        <Button
          component={RouterLink}
          to="/"
          sx={{
            mx: 1,
            color: 'white',
            borderBottom: location.pathname === '/' ? '2px solid #90caf9' : 'none',
            '&:hover': {
              color: '#90caf9',
            },
          }}
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to="/detection"
          sx={{
            mx: 1,
            color: 'white',
            borderBottom: location.pathname === '/detection' ? '2px solid #90caf9' : 'none',
            '&:hover': {
              color: '#90caf9',
            },
          }}
        >
          Detection
        </Button>
        <Button
          component={RouterLink}
          to="/history"
          sx={{
            mx: 1,
            color: 'white',
            borderBottom: location.pathname === '/history' ? '2px solid #90caf9' : 'none',
            '&:hover': {
              color: '#90caf9',
            },
          }}
        >
          History
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Navbar; 