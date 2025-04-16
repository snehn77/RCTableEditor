import React from 'react';
import {
    Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText,
    Divider, IconButton, Badge, Container
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Edit as EditIcon,
    History as HistoryIcon,
    Menu as MenuIcon,
    Notifications as NotificationIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutRoot,
    MainContent,
    StyledAppBar,
    MobileDrawer,
    DesktopDrawer,
    ToolbarSpacer
} from './styles';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Edit Data', icon: <EditIcon />, path: '/filters' },
        { text: 'History', icon: <HistoryIcon />, path: '/history' },
    ];

    const drawer = (
        <>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    RC Table Editor
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <LayoutRoot>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {menuItems.find(item => location.pathname.startsWith(item.path))?.text || 'RC Table Editor'}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="error">
                            <NotificationIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </StyledAppBar>

            <MobileDrawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
            >
                {drawer}
            </MobileDrawer>

            <DesktopDrawer
                variant="permanent"
                open
            >
                {drawer}
            </DesktopDrawer>

            <MainContent>
                <ToolbarSpacer /> {/* This replaces the Toolbar for spacing */}
                <Container maxWidth="xl">
                    {children}
                </Container>
            </MainContent>
        </LayoutRoot>
    );
};

export default Layout;