import { styled } from '@mui/material/styles';
import { Box, TableRow, Paper } from '@mui/material';

export const TableToolbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing(2),
    },
}));

export const TableActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
    },
}));

export const FilterSummary = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

export const EditFormContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const ModifiedRow = styled(TableRow)(() => ({
    backgroundColor: 'rgba(255, 235, 59, 0.08)',
}));

export const NewRow = styled(TableRow)(() => ({
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
}));

export const DeletedRow = styled(TableRow)(() => ({
    backgroundColor: 'rgba(244, 67, 54, 0.08)',
    textDecoration: 'line-through',
}));

export const TableContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
}));