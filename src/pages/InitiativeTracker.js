import React, { useState, useCallback, useEffect } from 'react';
import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon,
    Close as CloseIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HomeButton from '../components/HomeButton';

// Individual combatant card component
const CombatantCard = ({ combatant, onUpdate, onDelete, isActive }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: combatant.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getBorderColor = (type) => {
        switch (type) {
            case 'Monster':
                return '#f44336'; // Red
            case 'Player Character':
                return '#4caf50'; // Green
            case 'NPC':
                return '#ff9800'; // Orange/Yellow
            case 'Environment':
                return '#9c27b0'; // Purple
            default:
                return '#757575'; // Gray
        }
    };

    const getImageSource = (type) => {
        switch (type) {
            case 'Monster':
                return '/monster.png';
            case 'Player Character':
                return '/player.png';
            case 'NPC':
                return '/player.png';
            case 'Environment':
                return '/environment.png';
            default:
                return '/player.png';
        }
    };

    const handleStatusChange = (status, checked) => {
        const newStatuses = checked
            ? [...combatant.statuses, status]
            : combatant.statuses.filter(s => s !== status);
        
        onUpdate(combatant.id, { statuses: newStatuses });
    };

    const handleDeadChange = (checked) => {
        onUpdate(combatant.id, { isDead: checked });
    };

    const handleNameChange = (newName) => {
        onUpdate(combatant.id, { name: newName });
    };

    const cardOpacity = combatant.isDead ? 0.5 : 1;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            sx={{
                minWidth: 200,
                maxWidth: 250,
                margin: 1,
                opacity: cardOpacity,
                border: `3px solid ${getBorderColor(combatant.type)}`,
                borderRadius: 2,
                position: 'relative',
                transition: 'all 0.3s ease-in-out',
                cursor: isDragging ? 'grabbing' : 'grab',
                boxShadow: isActive ? '0 8px 24px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                pointerEvents: 'auto', // Allow interaction for all cards in carousel
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                },
            }}
        >
            <CardContent sx={{ padding: 2 }}>
                {/* Main character image */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginBottom: 2,
                    marginTop: 3, // Space for buttons
                }}>
                    <img
                        src={getImageSource(combatant.type)}
                        alt={combatant.type}
                        style={{
                            width: 48,
                            height: 48,
                            objectFit: 'contain',
                            opacity: combatant.isDead ? 0.3 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                </Box>

                {/* Drag handle */}
                <Box
                    {...attributes}
                    {...listeners}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        cursor: 'grab',
                        '&:active': { cursor: 'grabbing' },
                    }}
                >
                    <DragIcon sx={{ color: 'grey.500' }} />
                </Box>

                {/* Delete button */}
                <IconButton
                    onClick={() => onDelete(combatant.id)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        padding: 0.5,
                        color: 'error.main',
                    }}
                    size="small"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>

                {/* Name input */}
                <TextField
                    value={combatant.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Combatant Name"
                    variant="outlined"
                    size="small"
                    sx={{ 
                        width: '100%', 
                        marginBottom: 1,
                        '& .MuiOutlinedInput-root': {
                            fontSize: '0.9rem',
                        },
                    }}
                />

                {/* Type chip with image */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <img
                        src={getImageSource(combatant.type)}
                        alt={combatant.type}
                        style={{
                            width: 24,
                            height: 24,
                            objectFit: 'contain',
                        }}
                    />
                    <Chip
                        label={combatant.type}
                        size="small"
                        sx={{
                            backgroundColor: getBorderColor(combatant.type),
                            color: 'white',
                            fontSize: '0.75rem',
                            flex: 1,
                        }}
                    />
                </Box>

                {/* Dead checkbox */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={combatant.isDead}
                            onChange={(e) => handleDeadChange(e.target.checked)}
                            size="small"
                        />
                    }
                    label="Dead"
                    sx={{
                        width: '100%',
                        marginBottom: 1,
                        '& .MuiFormControlLabel-label': {
                            fontSize: '0.8rem',
                        },
                    }}
                />

                {/* Status checkboxes */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {['Frightened', 'Unconscious', 'Diseased'].map((status) => (
                        <FormControlLabel
                            key={status}
                            control={
                                <Checkbox
                                    checked={combatant.statuses.includes(status)}
                                    onChange={(e) => handleStatusChange(status, e.target.checked)}
                                    size="small"
                                />
                            }
                            label={status}
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontSize: '0.75rem',
                                },
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

// Main Initiative Tracker page component
const InitiativeTrackerPage = () => {
    const [combatants, setCombatants] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newCombatant, setNewCombatant] = useState({
        name: '',
        type: 'Player Character',
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Add keyboard event listener for '+' key to open add dialog
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === '+' && !addDialogOpen) {
                setAddDialogOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [addDialogOpen]);

    // Get combatants in turn order
    const getCombatantsInTurnOrder = useCallback(() => {
        const monsters = combatants.filter(c => c.type === 'Monster');
        const npcs = combatants.filter(c => c.type === 'NPC');
        const environment = combatants.filter(c => c.type === 'Environment');
        const players = combatants.filter(c => c.type === 'Player Character');
        
        return [...monsters, ...npcs, ...environment, ...players];
    }, [combatants]);

    // Add new combatant
    const addCombatant = () => {
        if (!newCombatant.name.trim()) return;
        
        const newId = Date.now().toString();
        const combatant = {
            id: newId,
            name: newCombatant.name,
            type: newCombatant.type,
            statuses: [],
            isDead: false,
        };
        
        setCombatants(prev => [...prev, combatant]);
        setNewCombatant({ name: '', type: newCombatant.type }); // Keep the same type, clear name
        // Don't close dialog to allow quick adding
    };

    // Update combatant
    const updateCombatant = (id, updates) => {
        setCombatants(prev => 
            prev.map(combatant => 
                combatant.id === id ? { ...combatant, ...updates } : combatant
            )
        );
    };

    // Delete combatant
    const deleteCombatant = (id) => {
        setCombatants(prev => prev.filter(combatant => combatant.id !== id));
        // Reset turn if we're past the new length
        const orderedCombatants = getCombatantsInTurnOrder();
        if (currentTurn >= orderedCombatants.length) {
            setCurrentTurn(0);
        }
    };

    // Handle drag end for reordering combatants
    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (!over || active.id === over.id) return;
        
        const orderedList = getCombatantsInTurnOrder();
        const activeIndex = orderedList.findIndex(c => c.id === active.id);
        const overIndex = orderedList.findIndex(c => c.id === over.id);
        
        if (activeIndex === -1 || overIndex === -1) return;
        
        const reorderedList = arrayMove(orderedList, activeIndex, overIndex);
        
        // Update the combatants state to reflect the new order
        setCombatants(reorderedList);
        
        // Adjust current turn if necessary
        const newCurrentIndex = reorderedList.findIndex(c => c.id === orderedList[currentTurn]?.id);
        if (newCurrentIndex !== -1) {
            setCurrentTurn(newCurrentIndex);
        }
    };

    const orderedCombatants = getCombatantsInTurnOrder();

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: { xs: "10px", sm: "20px", md: 3 },
                    marginBottom: "100px",
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        marginBottom: 4,
                        marginTop: { xs: 2, sm: 4 },
                    }}
                >
                    <Typography
                        variant='h3'
                        component='h1'
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            textShadow: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "none"
                                    : "0px 1px 2px rgba(0,0,0,0.1)",
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                            marginBottom: 2,
                        }}
                    >
                        Initiative Tracker
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            opacity: 0.8,
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Track combat initiative with drag-and-drop support following the official turn order
                    </Typography>
                </Box>

                <Box sx={{ padding: 2 }}>
                    {/* Add combatant button */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setAddDialogOpen(true)}
                        sx={{ marginBottom: 2 }}
                    >
                        Add Combatant (Press + key)
                    </Button>

                    {/* Initiative order display */}
                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Turn Order (following Combat Mechanics)
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label="1. Monsters" color="error" />
                            <Typography>→</Typography>
                            <Chip label="2. NPCs" sx={{ backgroundColor: '#ff9800', color: 'white' }} />
                            <Typography>→</Typography>
                            <Chip label="3. Environment" sx={{ backgroundColor: '#9c27b0', color: 'white' }} />
                            <Typography>→</Typography>
                            <Chip label="4. Players" color="success" />
                            <Typography>→</Typography>
                            <Chip label="Repeat" variant="outlined" />
                        </Box>
                    </Paper>

                    {/* Combat tracker carousel */}
                    {combatants.length > 0 && (
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Initiative Carousel (Current turn in front)
                            </Typography>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: '100vh',
                                        width: '100vw',
                                        marginLeft: '-50vw',
                                        left: '50%',
                                        border: '2px solid',
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#444' : '#ddd',
                                        borderRadius: 2,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1a1a1a' : '#f9f9f9',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        perspective: '1200px',
                                    }}
                                >
                                    <SortableContext
                                        items={orderedCombatants.map(c => c.id)}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        {orderedCombatants.map((combatant, index) => {
                                            const totalCombatants = orderedCombatants.length;
                                            const isActive = index === currentTurn;
                                            
                                            // Calculate position in carousel
                                            let relativePosition = index - currentTurn;
                                            if (relativePosition < -totalCombatants / 2) {
                                                relativePosition += totalCombatants;
                                            } else if (relativePosition > totalCombatants / 2) {
                                                relativePosition -= totalCombatants;
                                            }
                                            
                                            // Calculate carousel positioning
                                            const angle = (relativePosition / totalCombatants) * 360;
                                            const radius = Math.min(400, Math.max(250, totalCombatants * 50));
                                            const x = Math.sin((angle * Math.PI) / 180) * radius;
                                            const z = Math.cos((angle * Math.PI) / 180) * radius;
                                            
                                            // Scale and opacity based on position
                                            const scale = Math.max(0.6, 1 - Math.abs(relativePosition) * 0.1);
                                            const opacity = combatant.isDead ? 0.3 : Math.max(0.4, 1 - Math.abs(relativePosition) * 0.15);
                                            const zIndex = isActive ? 100 : 50 - Math.abs(relativePosition);
                                            
                                            return (
                                                <Box
                                                    key={combatant.id}
                                                    sx={{
                                                        position: 'absolute',
                                                        transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                                                        transformStyle: 'preserve-3d',
                                                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        opacity: opacity,
                                                        zIndex: zIndex,
                                                        pointerEvents: isActive ? 'auto' : 'none',
                                                    }}
                                                >
                                                    <CombatantCard
                                                        combatant={combatant}
                                                        onUpdate={updateCombatant}
                                                        onDelete={deleteCombatant}
                                                        isActive={isActive}
                                                    />
                                                </Box>
                                            );
                                        })}
                                    </SortableContext>
                                    
                                    {/* Navigation dots */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 20,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            display: 'flex',
                                            gap: 1,
                                            zIndex: 200,
                                        }}
                                    >
                                        {orderedCombatants.map((combatant, index) => (
                                            <Box
                                                key={`dot-${combatant.id}`}
                                                onClick={() => setCurrentTurn(index)}
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    backgroundColor: index === currentTurn ? '#4caf50' : 'rgba(255,255,255,0.3)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    border: `2px solid ${(() => {
                                                        switch (combatant.type) {
                                                            case 'Monster': return '#f44336';
                                                            case 'Player Character': return '#4caf50';
                                                            case 'NPC': return '#ff9800';
                                                            case 'Environment': return '#9c27b0';
                                                            default: return '#757575';
                                                        }
                                                    })()}`,
                                                    '&:hover': {
                                                        transform: 'scale(1.2)',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    
                                    {/* Turn indicator */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 20,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                            padding: '8px 16px',
                                            borderRadius: 2,
                                            zIndex: 200,
                                        }}
                                    >
                                        <Typography variant="body1" fontWeight="bold">
                                            Current Turn: {orderedCombatants[currentTurn]?.name || 'No one'}
                                        </Typography>
                                    </Box>

                                    {/* Navigation arrows */}
                                    <IconButton
                                        onClick={() => {
                                            const prevIndex = currentTurn === 0 ? orderedCombatants.length - 1 : currentTurn - 1;
                                            setCurrentTurn(prevIndex);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            left: 20,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            color: 'white',
                                            zIndex: 200,
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.7)',
                                            },
                                        }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            const nextIndex = currentTurn === orderedCombatants.length - 1 ? 0 : currentTurn + 1;
                                            setCurrentTurn(nextIndex);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            right: 20,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            color: 'white',
                                            zIndex: 200,
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.7)',
                                            },
                                        }}
                                    >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Box>
                            </DndContext>
                        </Box>
                    )}

                    {/* Add combatant dialog */}
                    <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Add New Combatant
                            <IconButton
                                onClick={() => setAddDialogOpen(false)}
                                sx={{ color: 'grey.500' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={newCombatant.name}
                                onChange={(e) => setNewCombatant(prev => ({ ...prev, name: e.target.value }))}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        addCombatant();
                                    }
                                }}
                                sx={{ marginBottom: 2 }}
                            />
                            <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={newCombatant.type}
                                    label="Type"
                                    onChange={(e) => setNewCombatant(prev => ({ ...prev, type: e.target.value }))}
                                >
                                    <MenuItem value="Player Character">Player Character</MenuItem>
                                    <MenuItem value="NPC">NPC</MenuItem>
                                    <MenuItem value="Monster">Monster</MenuItem>
                                    <MenuItem value="Environment">Environment</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAddDialogOpen(false)}>Close</Button>
                            <Button onClick={addCombatant} variant="contained">Add & Continue</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Container>

            <HomeButton />
        </>
    );
};

export default InitiativeTrackerPage;