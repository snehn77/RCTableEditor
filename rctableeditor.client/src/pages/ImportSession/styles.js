import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const ImportContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const DropZone = styled(Box)(({ theme }) => ({
    border: '2px dashed #ccc',
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(5),
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s',
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
    },
}));

export const ActionButtons = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
}));