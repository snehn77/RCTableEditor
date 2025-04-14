import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Box,
    FormControl, InputLabel, Select, MenuItem,
    Paper, OutlinedInput, Chip
} from '@mui/material';
import { getFilters } from '../services/api';

const FilterSelection = () => {
    const [filters, setFilters] = useState({
        processes: [],
        layers: [],
        operations: []
    });
    const [selectedProcess, setSelectedProcess] = useState('');
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [selectedOperations, setSelectedOperations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const data = await getFilters();
                setFilters(data);
            } catch (error) {
                console.error("Failed to fetch filters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    const handleProcessChange = (event) => {
        setSelectedProcess(event.target.value);
        // In a real app, this might filter the available layers and operations
    };

    const handleLayerChange = (event) => {
        const { value } = event.target;
        setSelectedLayers(value);
    };

    const handleOperationChange = (event) => {
        const { value } = event.target;
        setSelectedOperations(value);
    };

    const handleLoadData = () => {
        if (!selectedProcess || selectedLayers.length === 0) {
            alert('Please select a process and at least one layer');
            return;
        }

        console.log('Loading data with filters:', {
            process: selectedProcess,
            layers: selectedLayers,
            operations: selectedOperations
        });

        // In a real app, this would navigate to the table editor with these filters
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Select Filters
            </Typography>

            <Paper sx={{ p: 3, mt: 3 }}>
                {loading ? (
                    <Typography>Loading filters...</Typography>
                ) : (
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <FormControl required fullWidth>
                            <InputLabel id="process-label">Process</InputLabel>
                            <Select
                                labelId="process-label"
                                value={selectedProcess}
                                onChange={handleProcessChange}
                                label="Process"
                            >
                                <MenuItem value="">
                                    <em>Select a process</em>
                                </MenuItem>
                                {filters.processes?.map((process) => (
                                    <MenuItem key={process.processId} value={process.processId}>
                                        {process.processCode} - {process.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl required fullWidth>
                            <InputLabel id="layer-label">Layers</InputLabel>
                            <Select
                                labelId="layer-label"
                                multiple
                                value={selectedLayers}
                                onChange={handleLayerChange}
                                input={<OutlinedInput label="Layers" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const layer = filters.layers?.find(l => l.layerId === value);
                                            return (
                                                <Chip key={value} label={layer?.layerCode || value} />
                                            );
                                        })}
                                    </Box>
                                )}
                            >
                                {filters.layers?.map((layer) => (
                                    <MenuItem key={layer.layerId} value={layer.layerId}>
                                        {layer.layerCode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="operation-label">Operations (Optional)</InputLabel>
                            <Select
                                labelId="operation-label"
                                multiple
                                value={selectedOperations}
                                onChange={handleOperationChange}
                                input={<OutlinedInput label="Operations (Optional)" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const operation = filters.operations?.find(o => o.operationId === value);
                                            return (
                                                <Chip key={value} label={operation?.operationCode || value} />
                                            );
                                        })}
                                    </Box>
                                )}
                            >
                                {filters.operations?.map((operation) => (
                                    <MenuItem key={operation.operationId} value={operation.operationId}>
                                        {operation.operationCode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLoadData}
                            >
                                Load Data
                            </Button>
                            <Button variant="outlined">
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default FilterSelection;