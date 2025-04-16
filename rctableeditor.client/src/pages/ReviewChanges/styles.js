import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const ComparisonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(3),
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

export const ComparisonPanel = styled(Paper)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(2),
    overflow: 'auto',
}));

export const PanelTitle = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
}));

export const SummaryContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

export const ActionContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

export const GreenText = styled(Box)(({ theme }) => ({
    color: theme.palette.success.main,
}));

export const YellowText = styled(Box)(({ theme }) => ({
    color: theme.palette.warning.main,
}));

export const RedText = styled(Box)(({ theme }) => ({
    color: theme.palette.error.main,
}));