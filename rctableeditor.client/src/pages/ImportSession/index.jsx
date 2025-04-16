import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import {
    Upload as UploadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
    ImportContainer,
    DropZone,
    ActionButtons
} from './styles';

const ImportSession = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleImport = () => {
        // In a real app, you would process the file here
        console.log('Importing file:', file);
        // Then navigate to the table editor
        navigate('/table-editor');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Import Session
            </Typography>

            <ImportContainer>
                <Typography variant="body1" paragraph textAlign="center">
                    Select a previously exported Excel file to continue a saved editing session.
                </Typography>

                <DropZone onClick={() => document.getElementById('file-upload').click()}>
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
                        onChange={handleFileChange}
                    />
                </DropZone>

                {file && (
                    <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                        Selected file: {file.name}
                    </Typography>
                )}

                <ActionButtons>
                    <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!file}
                        onClick={handleImport}
                    >
                        Import Session
                    </Button>
                </ActionButtons>
            </ImportContainer>
        </>
    );
};

export default ImportSession;