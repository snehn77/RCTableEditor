import React from 'react';
import {
    Typography, Button, Table, TableBody, TableCell,
    TableHead, TableRow, Box
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Check as CheckIcon,
    Clear as ClearIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ComparisonContainer,
    ComparisonPanel,
    PanelTitle,
    SummaryContainer,
    ActionContainer,
    GreenText,
    YellowText,
    RedText
} from './styles';

const ReviewChanges = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { changedRows = [] } = location.state || {};

    // In a real app, these would be fetched based on changedRows
    const changes = {
        additions: 1,
        modifications: 2,
        deletions: 1
    };

    const handleSubmit = () => {
        navigate('/submit');
    };

    const handleBackToEditor = () => {
        navigate(-1);
    };

    const handleDiscard = () => {
        if (window.confirm('Are you sure you want to discard all changes?')) {
            navigate('/table-editor');
        }
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Review Changes
            </Typography>

            <SummaryContainer>
                <Typography variant="h6" gutterBottom>
                    Change Summary
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Typography variant="body1">
                        <GreenText component="span">Added: {changes.additions}</GreenText>
                    </Typography>
                    <Typography variant="body1">
                        <YellowText component="span">Modified: {changes.modifications}</YellowText>
                    </Typography>
                    <Typography variant="body1">
                        <RedText component="span">Deleted: {changes.deletions}</RedText>
                    </Typography>
                </Box>
            </SummaryContainer>

            <ComparisonContainer>
                <ComparisonPanel>
                    <PanelTitle>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Original Data
                        </Typography>
                    </PanelTitle>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Layer</TableCell>
                                <TableCell>Defect</TableCell>
                                <TableCell>Operation</TableCell>
                                <TableCell>Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>BKTCN</TableCell>
                                <TableCell>BLOCKED_TCN</TableCell>
                                <TableCell>128853/198166</TableCell>
                                <TableCell>CLASS</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>BKTCN</TableCell>
                                <TableCell>BLOCKED_TCN</TableCell>
                                <TableCell>136850</TableCell>
                                <TableCell>CLASS</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>V0RFC</TableCell>
                                <TableCell>ILD_HOLE_TEAROUT</TableCell>
                                <TableCell>146551/154716</TableCell>
                                <TableCell>CLASS</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ComparisonPanel>

                <ComparisonPanel>
                    <PanelTitle>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Modified Data
                        </Typography>
                    </PanelTitle>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Layer</TableCell>
                                <TableCell>Defect</TableCell>
                                <TableCell>Operation</TableCell>
                                <TableCell>Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>BKTCN</TableCell>
                                <TableCell>BLOCKED_TCN</TableCell>
                                <TableCell>128853/198166</TableCell>
                                <TableCell>CLASS</TableCell>
                            </TableRow>
                            <TableRow sx={{ backgroundColor: 'rgba(255, 235, 59, 0.1)' }}>
                                <TableCell>BKTCN</TableCell>
                                <TableCell>MODIFIED</TableCell>
                                <TableCell>136850</TableCell>
                                <TableCell>CLASS</TableCell>
                            </TableRow>
                            <TableRow sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                                <TableCell>BKTCN</TableCell>
                                <TableCell>NEW_TYPE</TableCell>
                                <TableCell>137895</TableCell>
                                <TableCell>CLASS</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ComparisonPanel>
            </ComparisonContainer>

            <ActionContainer>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackToEditor}
                >
                    Back to Editor
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckIcon />}
                    onClick={handleSubmit}
                >
                    Submit Changes
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ClearIcon />}
                    onClick={handleDiscard}
                >
                    Discard Changes
                </Button>
            </ActionContainer>
        </>
    );
};

export default ReviewChanges;