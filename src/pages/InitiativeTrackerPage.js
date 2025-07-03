import React, { useState, useCallback, useRef, useEffect } from "react"
import "../components/InitiativeTracker.css" // Import custom styles for form interactions
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
    Alert,
    Snackbar,
} from "@mui/material"
import {
    Add as AddIcon,
    Close as CloseIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Save as SaveIcon,
    Upload as UploadIcon,
    Refresh as RefreshIcon,
    Delete as DeleteIcon,
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
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"
import HomeButton from "../components/HomeButton"

// Individual combatant card component
const CombatantCard = ({
    combatant,
    onUpdate,
    isActive,
    onMoveUp,
    onMoveDown,
    onDelete,
}) => {
    // Helper function to safely stop event propagation
    const stopAllPropagation = (e) => {
        e.stopPropagation()
        if (e.stopImmediatePropagation) {
            e.stopImmediatePropagation()
        }
        if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
            e.nativeEvent.stopImmediatePropagation()
        }
    }

    // onMoveUp now represents moving backward in initiative
    // onMoveDown now represents moving forward in initiative

    // Use a ref to access the DOM element
    const cardRef = useRef(null)

    // Disable dragging completely to prevent ResizeObserver issues
    const { setNodeRef } = useSortable({
        id: combatant.id,
        disabled: true, // Always disable dragging
    })

    // Minimal style object to prevent layout shifts
    const style = {
        opacity: 1, // Always full opacity
    }

    // Minimal effect for active cards - styling is now handled by CSS
    useEffect(() => {
        if (isActive && cardRef.current && !combatant.isDangerCard) {
            // The card now has the active-card class applied directly
            // CSS handles all the styling, so no DOM manipulation needed
        }
    }, [isActive, combatant.isDangerCard])

    // Special case for DANGER card
    if (combatant.isDangerCard) {
        return (
            <Card
                ref={setNodeRef}
                style={style}
                sx={{
                    width: {
                        xs: "calc(62.5vh * 0.67)",
                        sm: "calc(62.5vh * 0.67)",
                    }, // 5/8 screen height * (2/3 aspect ratio) for width
                    height: { xs: "62.5vh", sm: "62.5vh" }, // 5/8 screen height for height
                    margin: 1,
                    backgroundColor: "rgba(244, 67, 54, 0.9)",
                    border: "3px solid #ff0000",
                    borderRadius: 2,
                    position: "relative",
                    transition: "all 0.3s ease-in-out",
                    cursor: "default", // Always default cursor
                    boxShadow: isActive
                        ? "0 8px 24px rgba(0,0,0,0.5)"
                        : "0 2px 8px rgba(0,0,0,0.3)",
                    pointerEvents: "auto",
                    // Enhanced layout stability to prevent ResizeObserver issues
                    contain: "layout style size",
                    willChange: "background-color",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    },
                }}
            >
                <CardContent sx={{ padding: 2, color: "white" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginY: 3,
                        }}
                    >
                        <Typography variant='h4' fontWeight='bold'>
                            DANGER!
                        </Typography>
                    </Box>

                    <Typography
                        variant='body1'
                        textAlign='center'
                        sx={{ mt: 2 }}
                    >
                        Remind players they are in danger
                    </Typography>
                </CardContent>
            </Card>
        )
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
            case "DANGER":
                return "#ff0000" // Bright Red for DANGER card
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
            case "DANGER":
                return "/monster.png" // Using monster image for DANGER
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

    const cardOpacity = combatant.isDead ? 0.5 : 1

    // No duplicate useEffect here - it's been moved before the conditional return

    return (
        <Card
            ref={(node) => {
                // Save to both the sortable ref and our local ref
                setNodeRef(node)
                cardRef.current = node
            }}
            style={style}
            className={isActive ? "active-card" : undefined}
            sx={{
                width: { xs: "calc(62.5vh * 0.67)", sm: "calc(62.5vh * 0.67)" }, // 5/8 screen height * (2/3 aspect ratio) for width
                height: { xs: "62.5vh", sm: "62.5vh" }, // 5/8 screen height for height
                margin: 1,
                opacity: cardOpacity,
                border: `3px solid ${getBorderColor(combatant.type)}`,
                borderRadius: 2,
                position: "relative",
                transition: "background-color 0.3s ease-in-out", // Only transition background
                cursor: "default", // Always default cursor
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Consistent shadow
                backgroundColor: isActive
                    ? (theme) =>
                          theme.palette.mode === "dark"
                              ? "#darkgrey" // Solid gray for dark theme
                              : "#ffffff" // Solid white for light theme
                    : "background.paper",
                pointerEvents: "auto",
                // Enhanced layout stability to prevent ResizeObserver issues
                contain: "layout style size",
                willChange: "background-color",
                // Stabilize all positioning and prevent reflows
                boxSizing: "border-box",
                overflow: "hidden", // Prevent content overflow
                // Force GPU acceleration to stabilize animations
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                // Ensure form elements are interactive
                "& input, & textarea": {
                    pointerEvents: "auto !important",
                    cursor: "text !important",
                    zIndex: 300,
                    position: "relative",
                },
                "& button, & .MuiCheckbox-root": {
                    pointerEvents: "auto !important",
                    zIndex: 280,
                },
                "& .MuiCardContent-root": {
                    pointerEvents: "auto !important",
                },
                "& .MuiTextField-root": {
                    pointerEvents: "auto !important",
                    zIndex: 250,
                    position: "relative",
                },
                "&:hover": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)", // Minimal hover change
                },
            }}
        >
            {/* Delete button - positioned relative to Card, not CardContent */}
            {/* Always render a button/placeholder to maintain consistent spacing */}
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    zIndex: 1200,
                }}
            >
                {isActive ? (
                    <IconButton
                        onClick={() => onDelete(combatant.id)}
                        size='small'
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%", // Make it perfectly round
                            padding: 0,
                            backgroundColor: "rgba(244, 67, 54, 0.9)",
                            color: "white",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            "&:hover": {
                                backgroundColor: "rgba(244, 67, 54, 1)",
                                transform: "scale(1.1)",
                            },
                        }}
                        title='Delete combatant'
                    >
                        <DeleteIcon sx={{ fontSize: "0.8rem" }} />
                    </IconButton>
                ) : (
                    /* Invisible placeholder to maintain spacing */
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            backgroundColor: "transparent",
                            pointerEvents: "none",
                            opacity: 0,
                        }}
                    />
                )}
            </Box>

            {/* Move back/forward buttons - positioned relative to Card */}
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                }}
            >
                <IconButton
                    onClick={onMoveUp}
                    size='small'
                    sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%", // Make it round to match delete button
                        padding: 0,
                        backgroundColor: "rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.4)",
                            transform: "scale(1.1)",
                        },
                    }}
                    title='Move backward in initiative order'
                >
                    <ArrowBackIcon sx={{ fontSize: "0.8rem" }} />
                </IconButton>
                <IconButton
                    onClick={onMoveDown}
                    size='small'
                    sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%", // Make it round to match delete button
                        padding: 0,
                        backgroundColor: "rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.4)",
                            transform: "scale(1.1)",
                        },
                    }}
                    title='Move forward in initiative order'
                >
                    <ArrowForwardIcon sx={{ fontSize: "0.8rem" }} />
                </IconButton>
            </Box>

            <CardContent
                sx={{
                    padding: 2,
                    position: "relative", // Ensure positioning context
                    boxSizing: "border-box", // Stable box model
                    height: "100%", // Fill the card height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* Main character image */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 2,
                        marginTop: 1, // Reduced margin since no delete button
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

                {/* Name input */}
                <TextField
                    value={combatant.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder='Combatant Name'
                    variant='outlined'
                    size='small'
                    onClick={(e) => {
                        // Fully cancel any propagation
                        stopAllPropagation(e)

                        // Ensure focus isn't lost when clicking
                        const input = e.currentTarget.querySelector("input")
                        if (input) {
                            // Stop propagation on the input too
                            input.onclick = (e) => {
                                stopAllPropagation(e)
                                return true
                            }

                            // Focus with a delay to ensure it works
                            setTimeout(() => {
                                input.focus()
                                // Make sure selection is at end - check if input and value exist
                                if (input && input.value != null) {
                                    const length = input.value.length
                                    input.setSelectionRange(length, length)
                                }
                            }, 10)
                        }
                    }}
                    onMouseDown={(e) => {
                        // Absolute prevention of event bubbling
                        stopAllPropagation(e)
                        e.preventDefault() // Only for mousedown - prevents losing focus
                    }}
                    onMouseUp={(e) => {
                        stopAllPropagation(e)
                    }}
                    onFocus={(e) => {
                        stopAllPropagation(e)
                    }}
                    onTouchStart={(e) => {
                        // Handle touch events for mobile devices
                        stopAllPropagation(e)
                    }}
                    className='editable-field name-field'
                    inputProps={{
                        style: {
                            cursor: "text",
                            pointerEvents: "auto !important",
                            position: "relative",
                            zIndex: 1100,
                            userSelect: "text",
                        },
                        onClick: (e) => {
                            stopAllPropagation(e)
                        },
                        onMouseDown: (e) => {
                            stopAllPropagation(e)
                            // Allow default behavior for the input itself
                        },
                        onMouseUp: (e) => {
                            stopAllPropagation(e)
                        },
                        onFocus: (e) => {
                            e.stopPropagation()
                            // Position cursor at end instead of selecting all text
                            setTimeout(() => {
                                if (
                                    e.currentTarget &&
                                    e.currentTarget.value != null
                                ) {
                                    const length = e.currentTarget.value.length
                                    e.currentTarget.setSelectionRange(
                                        length,
                                        length
                                    )
                                }
                            }, 0)
                        },
                    }}
                    sx={{
                        width: "100%",
                        marginBottom: 1,
                        pointerEvents: "auto !important",
                        position: "relative",
                        "& .MuiOutlinedInput-root": {
                            fontSize: "0.9rem",
                            cursor: "text",
                            pointerEvents: "auto !important",
                            zIndex: 950,
                        },
                        cursor: "text",
                        zIndex: 900,
                        ...(isActive && {
                            zIndex: 1000,
                            position: "relative",
                        }),
                    }}
                />

                {/* Type chip */}
                <Box
                    sx={{
                        marginBottom: 1,
                    }}
                >
                    <Chip
                        label={combatant.type}
                        size='small'
                        sx={{
                            backgroundColor: getBorderColor(combatant.type),
                            color: "white",
                            fontSize: "0.75rem",
                            width: "100%",
                        }}
                    />
                </Box>

                {/* Dead checkbox - only for non-Environment combatants */}
                {combatant.type !== "Environment" && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={combatant.isDead}
                                onChange={(e) =>
                                    handleDeadChange(e.target.checked)
                                }
                                size='small'
                                sx={{ cursor: "pointer" }}
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
                )}

                {/* Status checkboxes - 2x2 grid for non-Environment combatants */}
                {combatant.type !== "Environment" && (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 0.25,
                            marginBottom: 1,
                        }}
                    >
                        {[
                            "Frightened",
                            "Unconscious",
                            "Diseased",
                            "Poisoned",
                        ].map((status) => (
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
                                        sx={{
                                            cursor: "pointer",
                                            padding: "2px",
                                        }}
                                    />
                                }
                                label={status}
                                sx={{
                                    margin: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "0.65rem",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* Notes field */}
                <TextField
                    value={combatant.notes || ""}
                    onChange={(e) =>
                        onUpdate(combatant.id, { notes: e.target.value })
                    }
                    placeholder='Notes...'
                    variant='outlined'
                    size='small'
                    multiline
                    rows={2}
                    onClick={(e) => {
                        // Fully cancel any propagation
                        stopAllPropagation(e)

                        // Ensure focus isn't lost when clicking
                        const textarea =
                            e.currentTarget.querySelector("textarea")
                        if (textarea) {
                            // Stop propagation on the textarea too
                            textarea.onclick = (e) => {
                                stopAllPropagation(e)
                                return true
                            }

                            // Focus with a delay to ensure it works
                            setTimeout(() => {
                                textarea.focus()
                                // Leave cursor position where clicked
                            }, 10)
                        }
                    }}
                    onMouseDown={(e) => {
                        // Absolute prevention of event bubbling
                        stopAllPropagation(e)
                        // Allow default behavior to maintain selection capabilities
                    }}
                    onMouseUp={(e) => {
                        stopAllPropagation(e)
                    }}
                    onFocus={(e) => {
                        stopAllPropagation(e)
                    }}
                    onTouchStart={(e) => {
                        // Handle touch events for mobile devices
                        stopAllPropagation(e)
                    }}
                    className='editable-field notes-field'
                    inputProps={{
                        style: {
                            cursor: "text",
                            pointerEvents: "auto !important",
                            position: "relative",
                            zIndex: 600,
                            userSelect: "text",
                        },
                        onClick: (e) => {
                            stopAllPropagation(e)
                        },
                        onMouseDown: (e) => {
                            stopAllPropagation(e)
                            // Allow default behavior for the textarea itself
                        },
                        onMouseUp: (e) => {
                            stopAllPropagation(e)
                        },
                        onFocus: (e) => {
                            stopAllPropagation(e)
                            // Keep cursor where the user clicked for textarea
                        },
                    }}
                    sx={{
                        width: "100%",
                        marginTop: 1,
                        cursor: "text",
                        pointerEvents: "auto !important",
                        position: "relative",
                        "& .MuiOutlinedInput-root": {
                            cursor: "text",
                            fontSize: "0.8rem",
                            pointerEvents: "auto !important",
                            zIndex: 950,
                        },
                        zIndex: 900,
                        ...(isActive && {
                            zIndex: 1000,
                            position: "relative",
                        }),
                    }}
                />
            </CardContent>
        </Card>
    )
}

// Main Initiative Tracker page component
const InitiativeTrackerPage = () => {
    // CRITICAL: ResizeObserver suppression must be first to catch all errors
    useEffect(() => {
        // Immediate ResizeObserver override
        const originalResizeObserver = window.ResizeObserver
        if (originalResizeObserver) {
            window.ResizeObserver = class ResizeObserverPolyfill extends (
                originalResizeObserver
            ) {
                constructor(callback) {
                    const wrappedCallback = (...args) => {
                        requestAnimationFrame(() => {
                            try {
                                callback(...args)
                            } catch (e) {
                                // Silently ignore ResizeObserver errors
                            }
                        })
                    }
                    super(wrappedCallback)
                }
            }
        }

        return () => {
            if (originalResizeObserver) {
                window.ResizeObserver = originalResizeObserver
            }
        }
    }, [])
    // Enhanced ResizeObserver error suppression - multiple layers of protection
    useEffect(() => {
        const originalError = console.error
        const originalWarn = console.warn

        // Intercept all console errors and warnings
        console.error = (...args) => {
            const message = String(args[0] || "").toLowerCase()
            if (
                message.includes("resizeobserver") ||
                message.includes("resize") ||
                message.includes("observer") ||
                message.includes("loop completed") ||
                message.includes("undelivered notifications")
            ) {
                return // Completely suppress these errors
            }
            originalError.apply(console, args)
        }

        console.warn = (...args) => {
            const message = String(args[0] || "").toLowerCase()
            if (
                message.includes("resizeobserver") ||
                message.includes("resize") ||
                message.includes("observer")
            ) {
                return // Completely suppress these warnings
            }
            originalWarn.apply(console, args)
        }

        // Global error handler for window errors
        const handleWindowError = (event) => {
            const message = String(
                event.message || event.error?.message || ""
            ).toLowerCase()
            if (
                message.includes("resizeobserver") ||
                message.includes("resize") ||
                message.includes("observer") ||
                message.includes("loop completed") ||
                message.includes("undelivered notifications")
            ) {
                event.preventDefault()
                event.stopPropagation()
                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation()
                }
                return false
            }
        }

        // Global unhandled rejection handler
        const handleUnhandledRejection = (event) => {
            const message = String(
                event.reason?.message || event.reason || ""
            ).toLowerCase()
            if (
                message.includes("resizeobserver") ||
                message.includes("resize") ||
                message.includes("observer")
            ) {
                event.preventDefault()
                return false
            }
        }

        // Override the ResizeObserver constructor to catch errors at the source
        const OriginalResizeObserver = window.ResizeObserver
        if (OriginalResizeObserver) {
            window.ResizeObserver = class extends OriginalResizeObserver {
                constructor(callback) {
                    const wrappedCallback = (entries, observer) => {
                        try {
                            callback(entries, observer)
                        } catch (error) {
                            // Silently handle ResizeObserver errors
                            return
                        }
                    }
                    super(wrappedCallback)
                }
            }
        }

        window.addEventListener("error", handleWindowError, true)
        window.addEventListener(
            "unhandledrejection",
            handleUnhandledRejection,
            true
        )

        return () => {
            console.error = originalError
            console.warn = originalWarn
            window.removeEventListener("error", handleWindowError, true)
            window.removeEventListener(
                "unhandledrejection",
                handleUnhandledRejection,
                true
            )
            if (OriginalResizeObserver) {
                window.ResizeObserver = OriginalResizeObserver
            }
        }
    }, [])

    // Add debounced resize handler to prevent ResizeObserver issues
    useEffect(() => {
        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                // Force a gentle reflow after resize completes
                if (trackerRef.current) {
                    trackerRef.current.style.transform = "translateZ(0)"
                }
            }, 250) // Debounce resize events
        }

        window.addEventListener("resize", handleResize, { passive: true })
        return () => {
            clearTimeout(resizeTimeout)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const [combatants, setCombatants] = useState([])
    const [currentTurn, setCurrentTurn] = useState(0)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [newCombatant, setNewCombatant] = useState({
        name: "",
        type: "Player Character",
    })

    // Alert state for user feedback
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success")

    // Drag and drop state for loading
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef(null)
    const trackerRef = useRef(null)

    // Completely disable drag sensors to prevent ResizeObserver issues
    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Extremely high activation distance to completely disable drag
            activationConstraint: {
                distance: 10000, // Impossibly large value makes drag impossible
                delay: 10000, // Also add delay to prevent accidental activation
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: () => null, // Disable keyboard drag coordination
        })
    )

    // Add keyboard event listener for '+' key to open add dialog
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "+" && !addDialogOpen) {
                setAddDialogOpen(true)
            }
        }

        document.addEventListener("keydown", handleKeyPress)
        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [addDialogOpen])

    // Add keyboard navigation for left/right arrow keys to navigate carousel
    useEffect(() => {
        const handleArrowNavigation = (event) => {
            // Only handle arrow keys when no input/textarea is focused and no dialog is open
            const activeElement = document.activeElement
            const isInputFocused =
                activeElement &&
                (activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.contentEditable === "true")

            if (isInputFocused || addDialogOpen) {
                return // Don't interfere with text input or dialog interaction
            }

            // Get current combatants count directly from state
            const monsters = combatants.filter((c) => c.type === "Monster")
            const npcs = combatants.filter((c) => c.type === "NPC")
            const environment = combatants.filter(
                (c) => c.type === "Environment"
            )
            const players = combatants.filter(
                (c) => c.type === "Player Character"
            )

            // Add DANGER card before players if there are any players
            const orderedList = [...monsters, ...npcs, ...environment]
            if (players.length > 0) {
                const dangerCard = {
                    id: "danger-card",
                    name: "DANGER!",
                    type: "DANGER",
                    statuses: [],
                    isDead: false,
                    notes: "Remind players they are in danger",
                    isDangerCard: true,
                }
                orderedList.push(dangerCard)
            }
            const orderedCombatants = [...orderedList, ...players]

            if (event.key === "ArrowLeft") {
                event.preventDefault()
                // Navigate to previous combatant (same logic as left arrow button)
                const prevIndex =
                    currentTurn === 0
                        ? orderedCombatants.length - 1
                        : currentTurn - 1
                setCurrentTurn(prevIndex)
            } else if (event.key === "ArrowRight") {
                event.preventDefault()
                // Navigate to next combatant (same logic as right arrow button)
                const nextIndex =
                    currentTurn === orderedCombatants.length - 1
                        ? 0
                        : currentTurn + 1
                setCurrentTurn(nextIndex)
            }
        }

        document.addEventListener("keydown", handleArrowNavigation)
        return () => {
            document.removeEventListener("keydown", handleArrowNavigation)
        }
    }, [currentTurn, addDialogOpen, combatants])

    // Get combatants in turn order
    const getCombatantsInTurnOrder = useCallback(() => {
        const monsters = combatants.filter((c) => c.type === "Monster")
        const npcs = combatants.filter((c) => c.type === "NPC")
        const environment = combatants.filter((c) => c.type === "Environment")
        const players = combatants.filter((c) => c.type === "Player Character")

        // Add a DANGER card before player characters if there are any players
        const orderedList = [...monsters, ...npcs, ...environment]

        if (players.length > 0) {
            // Add a special DANGER card that will be rendered differently
            const dangerCard = {
                id: "danger-card", // Unique ID that won't conflict
                name: "DANGER!",
                type: "DANGER", // Special type to handle differently
                statuses: [],
                isDead: false,
                notes: "Remind players they are in danger",
                isDangerCard: true, // Flag to identify this special card
            }
            orderedList.push(dangerCard)
        }

        return [...orderedList, ...players]
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
            notes: "",
        }

        setCombatants((prev) => [...prev, combatant])
        setNewCombatant({ name: "", type: newCombatant.type }) // Keep the same type, clear name
        // Don't close dialog to allow quick adding
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

    // Move combatant backward in initiative order (within their type)
    const moveCombatantUp = (id) => {
        const orderedList = getCombatantsInTurnOrder()
        const index = orderedList.findIndex((c) => c.id === id)

        if (index <= 0) return // Already at the beginning

        const combatant = orderedList[index]
        const prevCombatant = orderedList[index - 1]

        // Only allow movement within the same type
        if (combatant.type !== prevCombatant.type) return

        // Swap positions
        const newList = [...orderedList]
        newList[index] = prevCombatant
        newList[index - 1] = combatant

        // Update state
        setCombatants(newList)

        // Update current turn if needed
        if (currentTurn === index) {
            setCurrentTurn(index - 1)
        } else if (currentTurn === index - 1) {
            setCurrentTurn(index)
        }
    }

    // Move combatant forward in initiative order (within their type)
    const moveCombatantDown = (id) => {
        const orderedList = getCombatantsInTurnOrder()
        const index = orderedList.findIndex((c) => c.id === id)

        if (index === -1 || index >= orderedList.length - 1) return // Already at the end

        const combatant = orderedList[index]
        const nextCombatant = orderedList[index + 1]

        // Only allow movement within the same type
        if (combatant.type !== nextCombatant.type) return

        // Swap positions
        const newList = [...orderedList]
        newList[index] = nextCombatant
        newList[index + 1] = combatant

        // Update state
        setCombatants(newList)

        // Update current turn if needed
        if (currentTurn === index) {
            setCurrentTurn(index + 1)
        } else if (currentTurn === index + 1) {
            setCurrentTurn(index)
        }
    }

    // We've replaced drag-and-drop reordering with forward/backward arrow buttons for better control within type groups

    // Utility functions for save/load functionality
    const showAlert = (message, severity = "success") => {
        setAlertMessage(message)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    // Simple CRC32 implementation for PNG chunks
    const calculateCRC32 = (data) => {
        const crcTable = []
        for (let i = 0; i < 256; i++) {
            let c = i
            for (let j = 0; j < 8; j++) {
                c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
            }
            crcTable[i] = c
        }

        let crc = 0xffffffff
        for (let i = 0; i < data.length; i++) {
            crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8)
        }
        return (crc ^ 0xffffffff) >>> 0
    }

    // Embed combat data in PNG
    const embedCombatDataInPNG = (canvas, combatData) => {
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const reader = new FileReader()
                reader.onload = () => {
                    const arrayBuffer = reader.result
                    const uint8Array = new Uint8Array(arrayBuffer)

                    // Find the end of IDAT chunks (before IEND)
                    let insertPosition = uint8Array.length - 12 // Before IEND chunk

                    // Create custom tEXt chunk for combat data
                    const combatJSON = JSON.stringify(combatData)
                    const keyword = "Combat Data"
                    const textData = new TextEncoder().encode(
                        keyword + "\0" + combatJSON
                    )

                    // Create chunk: Length (4 bytes) + Type (4 bytes) + Data + CRC (4 bytes)
                    const chunkLength = textData.length
                    const chunkType = new TextEncoder().encode("tEXt")

                    // Calculate CRC32 for chunk type + data
                    const crc32 = calculateCRC32(
                        new Uint8Array([...chunkType, ...textData])
                    )

                    // Create the complete chunk
                    const chunk = new Uint8Array(4 + 4 + chunkLength + 4)
                    const view = new DataView(chunk.buffer)

                    // Length (big endian)
                    view.setUint32(0, chunkLength, false)
                    // Type
                    chunk.set(chunkType, 4)
                    // Data
                    chunk.set(textData, 8)
                    // CRC (big endian)
                    view.setUint32(8 + chunkLength, crc32, false)

                    // Insert the chunk before IEND
                    const newPNG = new Uint8Array(
                        uint8Array.length + chunk.length
                    )
                    newPNG.set(uint8Array.slice(0, insertPosition), 0)
                    newPNG.set(chunk, insertPosition)
                    newPNG.set(
                        uint8Array.slice(insertPosition),
                        insertPosition + chunk.length
                    )

                    const newBlob = new Blob([newPNG], { type: "image/png" })
                    resolve(newBlob)
                }
                reader.readAsArrayBuffer(blob)
            }, "image/png")
        })
    }

    // Extract combat data from PNG
    const extractCombatDataFromPNG = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                try {
                    const arrayBuffer = reader.result
                    const uint8Array = new Uint8Array(arrayBuffer)

                    // Look for tEXt chunks
                    let offset = 8 // Skip PNG signature

                    while (offset < uint8Array.length - 8) {
                        const view = new DataView(uint8Array.buffer, offset)
                        const chunkLength = view.getUint32(0, false) // big endian
                        const chunkType = new TextDecoder().decode(
                            uint8Array.slice(offset + 4, offset + 8)
                        )

                        if (chunkType === "tEXt") {
                            const chunkData = uint8Array.slice(
                                offset + 8,
                                offset + 8 + chunkLength
                            )
                            const text = new TextDecoder().decode(chunkData)
                            const nullIndex = text.indexOf("\0")

                            if (nullIndex !== -1) {
                                const keyword = text.slice(0, nullIndex)
                                const data = text.slice(nullIndex + 1)

                                if (keyword === "Combat Data") {
                                    const combatData = JSON.parse(data)
                                    resolve(combatData)
                                    return
                                }
                            }
                        }

                        if (chunkType === "IEND") break
                        offset += 8 + chunkLength + 4 // length + type + data + crc
                    }

                    resolve(null) // No combat data found
                } catch (error) {
                    reject(error)
                }
            }
            reader.readAsArrayBuffer(file)
        })
    }

    // Save combat to PNG file
    const saveCombatState = async () => {
        try {
            if (trackerRef.current && combatants.length > 0) {
                const canvas = await html2canvas(trackerRef.current, {
                    backgroundColor: "#ffffff",
                    scale: 1,
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                })

                const combatData = {
                    combatants,
                    currentTurn,
                    timestamp: new Date().toISOString(),
                }

                // Embed combat data in the PNG
                const blobWithData = await embedCombatDataInPNG(
                    canvas,
                    combatData
                )

                const fileName = `combat_tracker_${
                    new Date().toISOString().split("T")[0]
                }.combat.png`
                saveAs(blobWithData, fileName)
                showAlert("Combat saved successfully!")
            } else {
                showAlert("No combat data to save", "warning")
            }
        } catch (error) {
            console.error("Error saving combat:", error)
            showAlert("Error saving combat", "error")
        }
    }

    // Load combat from file
    const loadCombatFromFile = async (file) => {
        try {
            if (
                file.name.endsWith(".combat.png") ||
                file.name.endsWith(".png")
            ) {
                const combatData = await extractCombatDataFromPNG(file)
                if (combatData) {
                    setCombatants(combatData.combatants || [])
                    setCurrentTurn(combatData.currentTurn || 0)
                    showAlert("Combat loaded successfully!")
                } else {
                    showAlert("No combat data found in this file", "error")
                }
            } else if (file.name.endsWith(".json")) {
                // Handle legacy JSON files
                const reader = new FileReader()
                reader.onload = (e) => {
                    try {
                        const combatData = JSON.parse(e.target.result)
                        setCombatants(combatData.combatants || [])
                        setCurrentTurn(combatData.currentTurn || 0)
                        showAlert("Combat loaded successfully!")
                    } catch (error) {
                        showAlert("Error loading combat file", "error")
                    }
                }
                reader.readAsText(file)
            } else {
                showAlert("Please select a .combat.png or .json file", "error")
            }
        } catch (error) {
            console.error("Error loading combat:", error)
            showAlert("Error loading combat", "error")
        }
    }

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            loadCombatFromFile(file)
        }
        // Reset the file input
        event.target.value = null
    }

    // Reset combat
    const resetCombat = () => {
        setCombatants([])
        setCurrentTurn(0)
        showAlert("Combat reset successfully!")
    }

    // Drag and drop handlers
    const handleDragOver = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(true)
    }

    const handleDragLeave = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(false)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(false)

        const files = event.dataTransfer.files
        if (files.length > 0) {
            const file = files[0]
            if (
                file.name.endsWith(".combat.png") ||
                file.name.endsWith(".png") ||
                file.name.endsWith(".json")
            ) {
                loadCombatFromFile(file)
            } else {
                showAlert("Please drop a .combat.png or .json file", "error")
            }
        }
    }

    const orderedCombatants = getCombatantsInTurnOrder()

    return (
        <>
            <Container
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: { xs: "10px", sm: "20px", md: 3 },
                    marginBottom: "100px",
                    position: "relative",
                    // Add visual feedback for drag over
                    ...(isDragOver && {
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(76, 175, 80, 0.1)",
                            border: "3px dashed #4caf50",
                            borderRadius: "16px",
                            zIndex: 1000,
                            pointerEvents: "none",
                        },
                        "&::after": {
                            content:
                                '"Drop your combat file here (.combat.png or .json)"',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#4caf50",
                            color: "#ffffff",
                            padding: "16px 32px",
                            borderRadius: "12px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            zIndex: 1001,
                            pointerEvents: "none",
                            boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
                        },
                    }),
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
                        Track combat initiative with drag-and-drop support
                        following the official turn order
                    </Typography>
                </Box>

                <Box sx={{ padding: 2 }}>
                    {/* Combat management buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            marginBottom: 2,
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            onClick={() => setAddDialogOpen(true)}
                            sx={{
                                backgroundColor: "#4caf50",
                                "&:hover": { backgroundColor: "#45a049" },
                            }}
                        >
                            Add Combatant (Press + key)
                        </Button>

                        <Button
                            variant='contained'
                            startIcon={<SaveIcon />}
                            onClick={saveCombatState}
                            disabled={combatants.length === 0}
                            sx={{
                                backgroundColor: "#2196f3",
                                "&:hover": { backgroundColor: "#1976d2" },
                            }}
                        >
                            Save Combat
                        </Button>

                        <Button
                            variant='contained'
                            startIcon={<UploadIcon />}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                backgroundColor: "#ff9800",
                                "&:hover": { backgroundColor: "#f57c00" },
                            }}
                        >
                            Load Combat
                        </Button>

                        <Button
                            variant='outlined'
                            startIcon={<RefreshIcon />}
                            onClick={resetCombat}
                            disabled={combatants.length === 0}
                            sx={{
                                borderColor: "#f44336",
                                color: "#f44336",
                                "&:hover": {
                                    borderColor: "#d32f2f",
                                    color: "#d32f2f",
                                    backgroundColor: "rgba(244, 67, 54, 0.04)",
                                },
                            }}
                        >
                            Reset Combat
                        </Button>
                    </Box>

                    {/* Hidden file input */}
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept='.combat.png,.png,.json'
                        style={{ display: "none" }}
                    />

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
                                sx={{
                                    backgroundColor: "#ff9800",
                                    color: "white",
                                }}
                            />
                            <Typography>→</Typography>
                            <Chip
                                label='3. Environment'
                                sx={{
                                    backgroundColor: "#9c27b0",
                                    color: "white",
                                }}
                            />
                            <Typography>→</Typography>
                            <Chip label='4. Players' color='success' />
                            <Typography>→</Typography>
                            <Chip label='Repeat' variant='outlined' />
                        </Box>
                    </Paper>

                    {/* Combat tracker carousel */}
                    {combatants.length > 0 && (
                        <Box sx={{ marginBottom: 3 }} ref={trackerRef}>
                            <Typography variant='h6' gutterBottom>
                                Initiative Carousel (Use arrows to move
                                combatants within their type)
                            </Typography>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        height: "100vh",
                                        width: "100vw",
                                        marginLeft: "-50vw",
                                        left: "50%",
                                        border: "2px solid",
                                        borderColor: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#444"
                                                : "#ddd",
                                        borderRadius: 2,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#1a1a1a"
                                                : "#f9f9f9",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        perspective: "1200px",
                                    }}
                                >
                                    <SortableContext
                                        items={orderedCombatants.map(
                                            (c) => c.id
                                        )}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        {orderedCombatants.map(
                                            (combatant, index) => {
                                                const totalCombatants =
                                                    orderedCombatants.length
                                                const isActive =
                                                    index === currentTurn

                                                // Calculate relative position in the new linear layout
                                                let relativePosition =
                                                    index - currentTurn

                                                // Handle wrap-around for circular navigation
                                                if (
                                                    relativePosition <
                                                    -Math.floor(
                                                        totalCombatants / 2
                                                    )
                                                ) {
                                                    relativePosition +=
                                                        totalCombatants
                                                } else if (
                                                    relativePosition >
                                                    Math.floor(
                                                        totalCombatants / 2
                                                    )
                                                ) {
                                                    relativePosition -=
                                                        totalCombatants
                                                }

                                                // Calculate carousel positioning (returning to the circular carousel)
                                                const angle =
                                                    (relativePosition /
                                                        totalCombatants) *
                                                    360
                                                const radius = Math.min(
                                                    400,
                                                    Math.max(
                                                        250,
                                                        totalCombatants * 50
                                                    )
                                                )
                                                const x =
                                                    Math.sin(
                                                        (angle * Math.PI) / 180
                                                    ) * radius
                                                const z =
                                                    Math.cos(
                                                        (angle * Math.PI) / 180
                                                    ) * radius

                                                // Scale and opacity based on position
                                                const scale = Math.max(
                                                    0.6,
                                                    1 -
                                                        Math.abs(
                                                            relativePosition
                                                        ) *
                                                            0.1
                                                )
                                                const opacity = combatant.isDead
                                                    ? 0.3
                                                    : Math.max(
                                                          0.4,
                                                          1 -
                                                              Math.abs(
                                                                  relativePosition
                                                              ) *
                                                                  0.15
                                                      )

                                                // Set z-index based on position
                                                const zIndex = isActive
                                                    ? 100
                                                    : 50 -
                                                      Math.abs(relativePosition)

                                                return (
                                                    <Box
                                                        key={combatant.id}
                                                        sx={{
                                                            position:
                                                                "absolute",
                                                            transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                                                            transformStyle:
                                                                "preserve-3d",
                                                            transition:
                                                                "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            opacity: opacity,
                                                            zIndex: zIndex,
                                                            pointerEvents:
                                                                opacity > 0.5 ||
                                                                isActive
                                                                    ? "auto"
                                                                    : "none",
                                                            // Make sure form elements use appropriate cursors
                                                            "& .MuiIconButton-root":
                                                                {
                                                                    cursor: "pointer",
                                                                },
                                                            "& .MuiTextField-root, & input, & textarea":
                                                                {
                                                                    cursor: "text",
                                                                    pointerEvents:
                                                                        "auto",
                                                                },
                                                            "& .MuiCheckbox-root, & button":
                                                                {
                                                                    cursor: "pointer",
                                                                    pointerEvents:
                                                                        "auto",
                                                                },
                                                        }}
                                                    >
                                                        <CombatantCard
                                                            combatant={
                                                                combatant
                                                            }
                                                            onUpdate={
                                                                updateCombatant
                                                            }
                                                            onDelete={
                                                                deleteCombatant
                                                            }
                                                            isActive={isActive}
                                                            onMoveUp={() =>
                                                                moveCombatantUp(
                                                                    combatant.id
                                                                )
                                                            }
                                                            onMoveDown={() =>
                                                                moveCombatantDown(
                                                                    combatant.id
                                                                )
                                                            }
                                                        />
                                                    </Box>
                                                )
                                            }
                                        )}
                                    </SortableContext>

                                    {/* Navigation dots */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 20,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            display: "flex",
                                            gap: 1,
                                            zIndex: 200,
                                        }}
                                    >
                                        {orderedCombatants.map(
                                            (combatant, index) => (
                                                <Box
                                                    key={`dot-${combatant.id}`}
                                                    onClick={() =>
                                                        setCurrentTurn(index)
                                                    }
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: "50%",
                                                        backgroundColor:
                                                            index ===
                                                            currentTurn
                                                                ? "#4caf50"
                                                                : "rgba(255,255,255,0.3)",
                                                        cursor: "pointer",
                                                        transition:
                                                            "all 0.3s ease",
                                                        border: `2px solid ${(() => {
                                                            switch (
                                                                combatant.type
                                                            ) {
                                                                case "Monster":
                                                                    return "#f44336"
                                                                case "Player Character":
                                                                    return "#4caf50"
                                                                case "NPC":
                                                                    return "#ff9800"
                                                                case "Environment":
                                                                    return "#9c27b0"
                                                                default:
                                                                    return "#757575"
                                                            }
                                                        })()}`,
                                                        "&:hover": {
                                                            transform:
                                                                "scale(1.2)",
                                                        },
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>

                                    {/* Turn indicator */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 20,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                            color: "white",
                                            padding: "8px 16px",
                                            borderRadius: 2,
                                            zIndex: 200,
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            fontWeight='bold'
                                        >
                                            Current Turn:{" "}
                                            {orderedCombatants[currentTurn]
                                                ?.name || "No one"}
                                        </Typography>
                                    </Box>

                                    {/* Navigation arrows */}
                                    <IconButton
                                        onClick={() => {
                                            const prevIndex =
                                                currentTurn === 0
                                                    ? orderedCombatants.length -
                                                      1
                                                    : currentTurn - 1
                                            setCurrentTurn(prevIndex)
                                        }}
                                        sx={{
                                            position: "absolute",
                                            left: 20,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            color: "white",
                                            zIndex: 200,
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgba(0,0,0,0.7)",
                                            },
                                        }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            const nextIndex =
                                                currentTurn ===
                                                orderedCombatants.length - 1
                                                    ? 0
                                                    : currentTurn + 1
                                            setCurrentTurn(nextIndex)
                                        }}
                                        sx={{
                                            position: "absolute",
                                            right: 20,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            color: "white",
                                            zIndex: 200,
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgba(0,0,0,0.7)",
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
                    <Dialog
                        open={addDialogOpen}
                        onClose={() => setAddDialogOpen(false)}
                    >
                        <DialogTitle
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            Add New Combatant
                            <IconButton
                                onClick={() => setAddDialogOpen(false)}
                                sx={{ color: "grey.500" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
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
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        addCombatant()
                                    }
                                }}
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
                                    <MenuItem value='Environment'>
                                        Environment
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAddDialogOpen(false)}>
                                Close
                            </Button>
                            <Button onClick={addCombatant} variant='contained'>
                                Add & Continue
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                {/* Alert Snackbar */}
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={3000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setAlertOpen(false)}
                        severity={alertSeverity}
                        sx={{ width: "100%" }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Container>

            <HomeButton />
        </>
    )
}

export default InitiativeTrackerPage
