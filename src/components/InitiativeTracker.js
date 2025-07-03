import React, { useState, useCallback } from "react"
import {
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
    Divider,
} from "@mui/material"
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon,
    NavigateNext as NextIcon,
} from "@mui/icons-material"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Individual combatant card component
const CombatantCard = ({ combatant, onUpdate, onDelete, isActive }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: combatant.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    const getBorderColor = (type) => {
        switch (type) {
            case "Monster":
                return "#f44336" // Red
            case "Player Character":
                return "#4caf50" // Green
            case "NPC":
                return "#ff9800" // Orange/Yellow
            case "Environment":
                return "#9c27b0" // Purple
            default:
                return "#757575" // Gray
        }
    }

    const getImageSource = (type) => {
        switch (type) {
            case "Monster":
                return "/monster.png"
            case "Player Character":
                return "/player.png"
            case "NPC":
                return "/player.png"
            case "Environment":
                return "/environment.png"
            default:
                return "/player.png"
        }
    }

    const handleStatusChange = (status, checked) => {
        const newStatuses = checked
            ? [...combatant.statuses, status]
            : combatant.statuses.filter((s) => s !== status)

        onUpdate(combatant.id, { statuses: newStatuses })
    }

    const handleDeadChange = (checked) => {
        onUpdate(combatant.id, { isDead: checked })
    }

    const handleNameChange = (newName) => {
        onUpdate(combatant.id, { name: newName })
    }

    const cardScale = isActive ? 1.25 : 1
    const cardOpacity = combatant.isDead ? 0.5 : 1

    return (
        <Card
            ref={setNodeRef}
            style={style}
            sx={{
                minWidth: 200,
                maxWidth: 250,
                margin: 1,
                transform: `scale(${cardScale})`,
                opacity: cardOpacity,
                border: `3px solid ${getBorderColor(combatant.type)}`,
                borderRadius: 2,
                position: "relative",
                transition: "all 0.3s ease-in-out",
                cursor: isDragging ? "grabbing" : "grab",
                boxShadow: isActive
                    ? "0 8px 24px rgba(0,0,0,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
            }}
        >
            <CardContent sx={{ padding: 2 }}>
                {/* Main character image */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 2,
                        marginTop: 3, // Space for buttons
                    }}
                >
                    <img
                        src={getImageSource(combatant.type)}
                        alt={combatant.type}
                        style={{
                            width: 48,
                            height: 48,
                            objectFit: "contain",
                            opacity: combatant.isDead ? 0.3 : 1,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                </Box>

                {/* Drag handle */}
                <Box
                    {...attributes}
                    {...listeners}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        cursor: "grab",
                        "&:active": { cursor: "grabbing" },
                    }}
                >
                    <DragIcon sx={{ color: "grey.500" }} />
                </Box>

                {/* Delete button */}
                <IconButton
                    onClick={() => onDelete(combatant.id)}
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        padding: 0.5,
                        color: "error.main",
                    }}
                    size='small'
                >
                    <DeleteIcon fontSize='small' />
                </IconButton>

                {/* Name input */}
                <TextField
                    value={combatant.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder='Combatant Name'
                    variant='outlined'
                    size='small'
                    sx={{
                        width: "100%",
                        marginBottom: 1,
                        "& .MuiOutlinedInput-root": {
                            fontSize: "0.9rem",
                        },
                    }}
                />

                {/* Type chip with image */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginBottom: 1,
                    }}
                >
                    <img
                        src={getImageSource(combatant.type)}
                        alt={combatant.type}
                        style={{
                            width: 24,
                            height: 24,
                            objectFit: "contain",
                        }}
                    />
                    <Chip
                        label={combatant.type}
                        size='small'
                        sx={{
                            backgroundColor: getBorderColor(combatant.type),
                            color: "white",
                            fontSize: "0.75rem",
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
                            size='small'
                        />
                    }
                    label='Dead'
                    sx={{
                        width: "100%",
                        marginBottom: 1,
                        "& .MuiFormControlLabel-label": {
                            fontSize: "0.8rem",
                        },
                    }}
                />

                {/* Status checkboxes */}
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    {["Frightened", "Unconscious", "Diseased"].map((status) => (
                        <FormControlLabel
                            key={status}
                            control={
                                <Checkbox
                                    checked={combatant.statuses.includes(
                                        status
                                    )}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            status,
                                            e.target.checked
                                        )
                                    }
                                    size='small'
                                />
                            }
                            label={status}
                            sx={{
                                "& .MuiFormControlLabel-label": {
                                    fontSize: "0.75rem",
                                },
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

// Main Initiative Tracker component
const InitiativeTracker = () => {
    const [combatants, setCombatants] = useState([])
    const [currentTurn, setCurrentTurn] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [newCombatant, setNewCombatant] = useState({
        name: "",
        type: "Player Character",
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Get combatants in turn order
    const getCombatantsInTurnOrder = useCallback(() => {
        const monsters = combatants.filter((c) => c.type === "Monster")
        const npcs = combatants.filter((c) => c.type === "NPC")
        const environment = combatants.filter((c) => c.type === "Environment")
        const players = combatants.filter((c) => c.type === "Player Character")

        return [...monsters, ...npcs, ...environment, ...players]
    }, [combatants])

    // Add new combatant
    const addCombatant = () => {
        if (!newCombatant.name.trim()) return

        const newId = Date.now().toString()
        const combatant = {
            id: newId,
            name: newCombatant.name,
            type: newCombatant.type,
            statuses: [],
            isDead: false,
        }

        setCombatants((prev) => [...prev, combatant])
        setNewCombatant({ name: "", type: "Player Character" })
        setAddDialogOpen(false)
    }

    // Update combatant
    const updateCombatant = (id, updates) => {
        setCombatants((prev) =>
            prev.map((combatant) =>
                combatant.id === id ? { ...combatant, ...updates } : combatant
            )
        )
    }

    // Delete combatant
    const deleteCombatant = (id) => {
        setCombatants((prev) => prev.filter((combatant) => combatant.id !== id))
        // Reset turn if we're past the new length
        const orderedCombatants = getCombatantsInTurnOrder()
        if (currentTurn >= orderedCombatants.length) {
            setCurrentTurn(0)
        }
    }

    // Handle drag end for reordering within type
    const handleDragEnd = (event) => {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const activeIndex = combatants.findIndex((c) => c.id === active.id)
        const overIndex = combatants.findIndex((c) => c.id === over.id)

        const activeCombatant = combatants[activeIndex]
        const overCombatant = combatants[overIndex]

        // Only allow reordering within the same type
        if (activeCombatant.type !== overCombatant.type) return

        setCombatants((prev) => arrayMove(prev, activeIndex, overIndex))
    }

    // Next turn
    const nextTurn = () => {
        const orderedCombatants = getCombatantsInTurnOrder()
        const aliveCombatants = orderedCombatants.filter((c) => !c.isDead)

        if (aliveCombatants.length === 0) {
            setCurrentTurn(0)
            return
        }

        let nextIndex = (currentTurn + 1) % orderedCombatants.length

        // Skip dead combatants
        while (orderedCombatants[nextIndex]?.isDead) {
            nextIndex = (nextIndex + 1) % orderedCombatants.length
        }

        setCurrentTurn(nextIndex)
    }

    // Group combatants by type for display
    const getCombatantsByType = () => {
        const types = ["Monster", "NPC", "Environment", "Player Character"]
        const grouped = {}

        types.forEach((type) => {
            grouped[type] = combatants.filter((c) => c.type === type)
        })

        return grouped
    }

    const orderedCombatants = getCombatantsInTurnOrder()
    const groupedCombatants = getCombatantsByType()

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant='h4' gutterBottom>
                Initiative Tracker
            </Typography>

            {/* Add combatant button */}
            <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={() => setAddDialogOpen(true)}
                sx={{ marginBottom: 2 }}
            >
                Add Combatant
            </Button>

            {/* Initiative order display */}
            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant='h6' gutterBottom>
                    Turn Order (following Combat Mechanics)
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                    }}
                >
                    <Chip label='1. Monsters' color='error' />
                    <Typography>→</Typography>
                    <Chip
                        label='2. NPCs'
                        sx={{ backgroundColor: "#ff9800", color: "white" }}
                    />
                    <Typography>→</Typography>
                    <Chip
                        label='3. Environment'
                        sx={{ backgroundColor: "#9c27b0", color: "white" }}
                    />
                    <Typography>→</Typography>
                    <Chip label='4. Players' color='success' />
                    <Typography>→</Typography>
                    <Chip label='Repeat' variant='outlined' />
                </Box>
            </Paper>

            {/* Combat tracker */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {Object.entries(groupedCombatants).map(
                    ([type, typeCombatants]) =>
                        typeCombatants.length > 0 && (
                            <Box key={type} sx={{ marginBottom: 3 }}>
                                <Typography variant='h6' gutterBottom>
                                    {type}s
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        overflowX: "auto",
                                        padding: 1,
                                        gap: 1,
                                        minHeight: 300,
                                    }}
                                >
                                    <SortableContext
                                        items={typeCombatants.map((c) => c.id)}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        {typeCombatants.map((combatant) => {
                                            const combatantIndex =
                                                orderedCombatants.findIndex(
                                                    (c) => c.id === combatant.id
                                                )
                                            const isActive =
                                                combatantIndex === currentTurn

                                            return (
                                                <CombatantCard
                                                    key={combatant.id}
                                                    combatant={combatant}
                                                    onUpdate={updateCombatant}
                                                    onDelete={deleteCombatant}
                                                    isActive={isActive}
                                                />
                                            )
                                        })}
                                    </SortableContext>
                                </Box>
                                <Divider sx={{ marginY: 2 }} />
                            </Box>
                        )
                )}
            </DndContext>

            {/* Next turn button */}
            {orderedCombatants.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 2,
                    }}
                >
                    <Button
                        variant='contained'
                        size='large'
                        startIcon={<NextIcon />}
                        onClick={nextTurn}
                        sx={{
                            backgroundColor: "#4caf50",
                            "&:hover": { backgroundColor: "#45a049" },
                        }}
                    >
                        Next Turn
                    </Button>
                </Box>
            )}

            {/* Add combatant dialog */}
            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
            >
                <DialogTitle>Add New Combatant</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Name'
                        fullWidth
                        variant='outlined'
                        value={newCombatant.name}
                        onChange={(e) =>
                            setNewCombatant((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={newCombatant.type}
                            label='Type'
                            onChange={(e) =>
                                setNewCombatant((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                }))
                            }
                        >
                            <MenuItem value='Player Character'>
                                Player Character
                            </MenuItem>
                            <MenuItem value='NPC'>NPC</MenuItem>
                            <MenuItem value='Monster'>Monster</MenuItem>
                            <MenuItem value='Environment'>Environment</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={addCombatant} variant='contained'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default InitiativeTracker
