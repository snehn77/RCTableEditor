import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

const ReviewChanges = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Review Changes
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="body1">
                    Side-by-side comparison will be implemented here.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button variant="outlined">Back to Editor</Button>
                    <Button variant="contained" color="primary">Submit Changes</Button>
                    <Button variant="outlined" color="error">Discard Changes</Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ReviewChanges;