import React, { useState, useEffect } from 'react';
import {
    Typography, Button,
    FormControl, InputLabel, Select, MenuItem,
    OutlinedInput, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFilters } from '../../services/api';
import {
    FilterContainer,
    FormContainer,
    FilterActionsContainer,
    ChipContainer
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

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const data = await getFilters();
                console.log('Filters response:', data);
                setFilters({
                    processes: data?.processes || [],
                    layers: data?.layers || [],
                    operations: data?.operations || [],
                });
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

        const filterParams = {
            sessionId: 'test-session-id', // This should come from your session management
            processId: selectedProcess,
            layerIds: selectedLayers,
            operationIds: selectedOperations.length > 0 ? selectedOperations : null
        };

        // Navigate to table editor with filter parameters
        navigate('/table-editor', { state: { filterParams } });
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Select Filters
            </Typography>

            <FilterContainer>
                {loading ? (
                    <Typography>Loading filters...</Typography>
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
                            >
                                Load Data
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/')}
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