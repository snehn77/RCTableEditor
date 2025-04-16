// src/pages/FilterSelection/index.jsx - Enhanced version
import React, { useState, useEffect } from 'react';
import {
    Typography, Button, FormControl, InputLabel,
    Select, MenuItem, OutlinedInput, Chip,
    Alert, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFilters, queryTableData } from '../../services/api';
import {
    FilterContainer, FormContainer, FilterActionsContainer, ChipContainer
} from './styles';

const FilterSelection = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        processes: [],
        layers: [],
        operations: []
    });
    const [selectedProcess, setSelectedProcess] = useState('');
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [selectedOperations, setSelectedOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const data = await getFilters();
                setFilters({
                    processes: data?.processes || [],
                    layers: data?.layers || [],
                    operations: data?.operations || [],
                });
            } catch (error) {
                console.error("Failed to fetch filters:", error);
                setError("Failed to load filter options. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    const handleProcessChange = (event) => {
        setSelectedProcess(event.target.value);
    };

    const handleLayerChange = (event) => {
        setSelectedLayers(event.target.value);
    };

    const handleOperationChange = (event) => {
        setSelectedOperations(event.target.value);
    };

    const handleLoadData = async () => {
        // Form validation
        if (!selectedProcess) {
            setError("Please select a process");
            return;
        }

        if (selectedLayers.length === 0) {
            setError("Please select at least one layer");
            return;
        }

        setError(null);
        setLoadingData(true);

        try {
            // Create query parameters
            const queryParams = {
                sessionId: 'temp-session-id', // We'll implement proper session management later
                processId: selectedProcess,
                layerIds: selectedLayers,
                operationIds: selectedOperations.length > 0 ? selectedOperations : null,
                page: 1,
                pageSize: 50
            };

            // Query the data
            const response = await queryTableData(queryParams);

            // Navigate to table editor with the data and parameters
            navigate('/table-editor', {
                state: {
                    tableData: response,
                    filterParams: queryParams
                }
            });
        } catch (error) {
            console.error("Failed to load table data:", error);
            setError("Failed to load data. Please check your selections and try again.");
            setLoadingData(false);
        }
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Select Filters
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <FilterContainer>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <FormContainer>
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
                                        {process.processCode || process.name}
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
                                    <ChipContainer>
                                        {selected.map((value) => {
                                            const layer = filters.layers?.find(l => l.layerId === value);
                                            return (
                                                <Chip key={value} label={layer?.layerCode || value} />
                                            );
                                        })}
                                    </ChipContainer>
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
                                    <ChipContainer>
                                        {selected.map((value) => {
                                            const operation = filters.operations?.find(o => o.operationId === value);
                                            return (
                                                <Chip key={value} label={operation?.operationCode || value} />
                                            );
                                        })}
                                    </ChipContainer>
                                )}
                            >
                                {filters.operations?.map((operation) => (
                                    <MenuItem key={operation.operationId} value={operation.operationId}>
                                        {operation.operationCode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FilterActionsContainer>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLoadData}
                                disabled={loadingData}
                            >
                                {loadingData ? <CircularProgress size={24} /> : 'Load Data'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/')}
                                disabled={loadingData}
                            >
                                Cancel
                            </Button>
                        </FilterActionsContainer>
                    </FormContainer>
                )}
            </FilterContainer>
        </>
    );
};

export default FilterSelection;