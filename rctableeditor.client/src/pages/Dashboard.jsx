/* eslint-disable no-constant-binary-expression */
import React from 'react';
import {
    Typography, Button, Box, Paper, Grid,
    Card, CardContent, CardActions, Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Upload as UploadIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to RC Table Editor
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Use this tool to edit, review, and approve updates to tabular data.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/filters')}
                        size="large"
                    >
                        Start New Editing Session
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        onClick={() => navigate('/import')}
                        size="large"
                    >
                        Import Session
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Recent Activity
                </Typography>

                <Grid container spacing={3}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} md={6} lg={4} key={item}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {new Date().toLocaleDateString()}
                                        </Typography>
                                        <Chip
                                            label={item === 1 ? "Approved" : item === 2 ? "Pending" : "Rejected"}
                                            color={item === 1 ? "success" : item === 2 ? "warning" : "error"}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="h6" gutterBottom>
                                        Process: 1274
                                    </Typography>
                                    <Typography variant="body2">
                                        Layers: BKTCN, V0RFC
                                    </Typography>
                                    <Typography variant="body2">
                                        Changes: 3 added, 2 modified, 1 removed
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={<VisibilityIcon />}
                                        onClick={() => navigate('/history')}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Empty state for when there's no activity */}
                {false && (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            No recent activity found. Start a new editing session to get started.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </>
    );
};

export default Dashboard;