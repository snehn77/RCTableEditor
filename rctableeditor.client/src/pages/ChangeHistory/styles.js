import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const FilterBar = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

export const FilterControls = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

export const StatusChip = styled(Box)(({ theme, status }) => ({
    borderRadius: theme.shape.borderRadius * 4,
    padding: theme.spacing(0.5, 1.5),
    fontSize: '0.75rem',
    fontWeight: 500,
    display: 'inline-block',
    backgroundColor:
        status === 'Approved' ? theme.palette.success.light :
            status === 'Pending' ? theme.palette.warning.light :
                theme.palette.error.light,
    color:
        status === 'Approved' ? theme.palette.success.contrastText :
            status === 'Pending' ? theme.palette.warning.contrastText :
                theme.palette.error.contrastText,
}));