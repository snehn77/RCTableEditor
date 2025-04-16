import { styled } from '@mui/material/styles';
import { Box, AppBar, Drawer } from '@mui/material';

// Constants
export const DRAWER_WIDTH = 240;

// Root container
export const LayoutRoot = styled(Box)(() => ({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    width: '100%'
}));

// Styled components
export const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100%',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    marginLeft: 0,
    //[theme.breakpoints.up('sm')]: {
    //    marginLeft: DRAWER_WIDTH, // Only apply margin on larger screens
    //},
    position: 'relative',
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
    },
    zIndex: theme.zIndex.drawer + 1,
}));

export const MobileDrawer = styled(Drawer)(() => ({
    display: { xs: 'block', sm: 'none' },
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: DRAWER_WIDTH,
    },
}));

export const DesktopDrawer = styled(Drawer)(() => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    display: { xs: 'none', sm: 'block' },
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        position: 'fixed',
        height: '100%',
        boxSizing: 'border-box',
    },
}));

export const ToolbarSpacer = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar // This creates space equal to toolbar height
}));