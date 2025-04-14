import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';

const Dashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                RC Table Editor
            </Typography>

            <Typography variant="body1" paragraph>
                Welcome to the RC Table Editor application. Use this tool to edit, review, and approve updates to tabular data.
            </Typography>

            <Box sx={{ my: 4, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">
                    Start New Editing Session
                </Button>
                <Button variant="outlined" color="primary">
                    Import Session
                </Button>
            </Box>

            <Typography variant="h5" sx={{ mb: 2 }}>
                Recent Activity
            </Typography>

            <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Date</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle2">Process</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle2">Status</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2">Actions</Typography>
                    </Grid>

                    {/* Sample entry - this would be dynamically populated */}
                    <Grid item xs={2}>
                        <Typography variant="body2">2025-04-14</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2">1274</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: 'success.main' }}>Approved</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button size="small">View Details</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Dashboard;