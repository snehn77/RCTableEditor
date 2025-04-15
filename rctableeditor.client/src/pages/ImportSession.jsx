import React from 'react';
import { Container, Typography, Paper, Box, Button, TextField } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';

const ImportSession = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Import Session
            </Typography>

            <Paper sx={{ p: 4, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body1" paragraph textAlign="center">
                    Select a previously exported Excel file to continue a saved editing session.
                </Typography>

                <Box sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    p: 5,
                    width: '100%',
                    textAlign: 'center',
                    mb: 3
                }}>
                    <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" gutterBottom>
                        Drag and drop a file here, or click to browse
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Supported formats: .xlsx, .xls
                    </Typography>
                    <input
                        type="file"
                        hidden
                        accept=".xlsx,.xls"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            sx={{ mt: 2 }}
                        >
                            Browse Files
                        </Button>
                    </label>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" color="primary" disabled>
                        Import Session
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ImportSession;