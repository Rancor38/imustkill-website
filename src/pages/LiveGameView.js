import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import {
    Box,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Chip,
} from "@mui/material"
import {
    subscribeToInitiativeSession,
    getInitiativeSession,
} from "../utils/supabaseClient"
import "../components/InitiativeTracker.css" // Import the same styles used in the tracker

// This component is the view-only version of the Initiative Tracker
// It displays the current state of a shared initiative tracker session
// but doesn't allow interaction with it
const LiveGameView = () => {
    const { sessionId } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sessionData, setSessionData] = useState(null)
    const [subscription, setSubscription] = useState(null)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [isUpdating, setIsUpdating] = useState(false) // For showing update animation
    const trackerRef = useRef(null) // Reference for the carousel element

    // Load initial session data and subscribe to updates
    useEffect(() => {
        const loadSession = async () => {
            try {
                setLoading(true)
                // Get initial data
                const data = await getInitiativeSession(sessionId)
                if (!data) throw new Error("Session not found")

                console.log("Session data received:", data)

                // Check which property contains our state data
                if (data.combat_state) {
                    setSessionData(data.combat_state)
                    setCurrentTurn(data.combat_state.currentTurn || 0)
                } else if (data.data) {
                    // Fallback to 'data' if that's what the database is using
                    setSessionData(data.data)
                    setCurrentTurn(data.data.currentTurn || 0)
                } else {
                    throw new Error("Session data structure is invalid")
                }

                // Subscribe to real-time updates
                const subscription = subscribeToInitiativeSession(
                    sessionId,
                    (updatedData) => {
                        // Show brief update indicator
                        setIsUpdating(true)
                        setSessionData(updatedData)
                        setCurrentTurn(updatedData.currentTurn || 0)

                        // After a short delay, hide update indicator
                        setTimeout(() => setIsUpdating(false), 600)
                    }
                )

                setSubscription(subscription)
                setLoading(false)
            } catch (err) {
                console.error("Error loading session:", err)
                setError(err.message)
                setLoading(false)
            }
        }

        if (sessionId) {
            loadSession()
        }

        // Clean up subscription
        return () => {
            if (subscription) {
                subscription.unsubscribe()
            }
        }
        // We deliberately exclude subscription from deps as it's created within this hook
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId])

    // Effect to center the carousel and handle scrolling
    useEffect(() => {
        if (!sessionData || !trackerRef.current) return

        // Center the carousel vertically when it loads
        const scrollToCenter = () => {
            if (trackerRef.current) {
                const rect = trackerRef.current.getBoundingClientRect()
                const viewportHeight = window.innerHeight
                const scrollY =
                    rect.top + rect.height / 2 - viewportHeight / 2 + window.scrollY
                window.scrollTo({ top: scrollY, behavior: "smooth" })
            }
        }

        scrollToCenter()

        // Re-center if window is resized
        window.addEventListener("resize", scrollToCenter)

        return () => {
            window.removeEventListener("resize", scrollToCenter)
        }
    }, [sessionData])

    // Early return states
    if (loading) {
        return (
            <Container
                sx={{ display: "flex", justifyContent: "center", py: 4 }}
            >
                <CircularProgress />
            </Container>
        )
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='error'>
                    Error loading shared initiative tracker: {error}
                </Alert>
            </Container>
        )
    }

    if (
        !sessionData ||
        !sessionData.combatants ||
        sessionData.combatants.length === 0
    ) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='info'>
                    This shared initiative tracker session has no combatants or
                    has expired.
                </Alert>
            </Container>
        )
    }

    // Render the view-only initiative tracker

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                color: (theme) =>
                    theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                padding: { xs: "10px", sm: "20px", md: 3 },
                marginBottom: "100px",
                position: "relative",
            }}
        >
            {/* Update indicator */}
            {isUpdating && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 16,
                        right: 16,
                        padding: "8px 16px",
                        backgroundColor: "primary.main",
                        color: "white",
                        borderRadius: 2,
                        zIndex: 1000,
                        boxShadow: 3,
                        animation: "fadeInOut 0.6s ease",
                        "@keyframes fadeInOut": {
                            "0%": { opacity: 0 },
                            "20%": { opacity: 1 },
                            "80%": { opacity: 1 },
                            "100%": { opacity: 0 },
                        },
                    }}
                >
                    <Typography
                        variant='body2'
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <CircularProgress size={16} color='inherit' />
                        Updating...
                    </Typography>
                </Box>
            )}

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
                    Live Initiative Tracker
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
                    View-only mode - Updates in real time
                </Typography>

                <Paper
                    sx={{
                        padding: 2,
                        marginBottom: 2,
                        marginTop: 3,
                        maxWidth: "500px",
                        margin: "0 auto",
                    }}
                >
                    <Typography variant='body1' align='center'>
                        Session ID: <strong>{sessionId}</strong>
                    </Typography>
                </Paper>
            </Box>

            {/* Combat tracker carousel */}
            {sessionData.combatants && sessionData.combatants.length > 0 && (
                <Box sx={{ padding: 2 }}>
                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Turn Order
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            {/* Turn order display */}
                            {sessionData.combatants.map((combatant, index) => (
                                <Box
                                    key={combatant.id}
                                    sx={{
                                        backgroundColor:
                                            currentTurn === index
                                                ? "#4caf50"
                                                : "#e0e0e0",
                                        color:
                                            currentTurn === index
                                                ? "white"
                                                : "black",
                                        padding: "4px 12px",
                                        borderRadius: "16px",
                                        margin: "4px",
                                        border: "1px solid #ccc",
                                        fontWeight:
                                            currentTurn === index
                                                ? "bold"
                                                : "normal",
                                    }}
                                >
                                    {combatant.name}
                                </Box>
                            ))}
                        </Box>
                    </Paper>

                    {/* Carousel view similar to InitiativeTrackerPage */}
                    <Box sx={{ marginBottom: 3 }} ref={trackerRef}>
                        <Typography variant='h6' gutterBottom>
                            Initiative Tracker (View Only)
                        </Typography>
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
                                overflow: "visible",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                perspective: "2000px",
                            }}
                        >
                            {sessionData.combatants.map((combatant, index) => {
                                const totalCombatants = sessionData.combatants.length;
                                const isActive = index === currentTurn;

                                // Calculate relative position - correct the offset here
                                let relativePosition = index - currentTurn;

                                // Handle wrap-around for circular navigation
                                if (relativePosition < -Math.floor(totalCombatants / 2)) {
                                    relativePosition += totalCombatants;
                                } else if (relativePosition > Math.floor(totalCombatants / 2)) {
                                    relativePosition -= totalCombatants;
                                }

                                // Calculate carousel positioning
                                const angle = (relativePosition / totalCombatants) * 360;
                                const baseRadius = Math.max(350, totalCombatants * 50);
                                const maxRadius = Math.min(600, totalCombatants * 120);
                                const radius = Math.min(maxRadius, baseRadius);
                                const x = Math.sin((angle * Math.PI) / 180) * radius;
                                const z = Math.cos((angle * Math.PI) / 180) * radius;

                                // Scale and opacity based on position
                                const scale = Math.max(0.5, 1 - Math.abs(relativePosition) * 0.08);

                                // Set z-index based on position
                                const zIndex = isActive ? 100 : 50 - Math.abs(relativePosition);

                                return (
                                    <Box
                                        key={combatant.id}
                                        sx={{
                                            position: "absolute",
                                            transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                                            transformStyle: "preserve-3d",
                                            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                            zIndex: zIndex,
                                        }}
                                    >
                                        {/* Combatant Card */}
                                        <Card
                                            className={isActive ? "active-card" : ""}
                                            sx={{
                                                width: {
                                                    xs: "250px",
                                                    sm: "300px",
                                                },
                                                minHeight: {
                                                    xs: "300px",
                                                    sm: "400px",
                                                },
                                                borderRadius: 2,
                                                boxShadow: isActive ? 8 : 3,
                                                backgroundColor: (theme) =>
                                                    isActive
                                                        ? theme.palette.mode === "dark"
                                                            ? "#2e7d32"
                                                            : "#81c784"
                                                        : theme.palette.background.paper,
                                                transform: isActive ? "scale(1.05)" : "scale(1)",
                                                transition: "transform 0.3s ease",
                                                opacity: combatant.isDead ? 0.6 : 1,
                                                position: "relative",
                                            }}
                                        >
                                            <CardContent>
                                                <Box sx={{ textAlign: "center", mb: 2 }}>
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            textDecoration: combatant.isDead
                                                                ? "line-through"
                                                                : "none",
                                                        }}
                                                    >
                                                        {combatant.name}
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        {combatant.type}
                                                    </Typography>
                                                </Box>

                                                {/* Status effects */}
                                                {combatant.statuses && combatant.statuses.length > 0 && (
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                                            Status Effects:
                                                        </Typography>
                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                            {combatant.statuses.map((status, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    label={status}
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{ margin: 0.5 }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                )}

                                                {/* Notes */}
                                                {combatant.notes && (
                                                    <Box sx={{ mt: 2 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                                            Notes:
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                                                            {combatant.notes}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {/* Dead indicator */}
                                                {combatant.isDead && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: 15,
                                                            right: 15,
                                                            color: "error.main",
                                                            fontWeight: "bold",
                                                            border: "2px solid",
                                                            borderColor: "error.main",
                                                            borderRadius: 1,
                                                            padding: "2px 8px",
                                                            transform: "rotate(15deg)",
                                                        }}
                                                    >
                                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                                            DEAD
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Box>
                                );
                            })}

                            {/* Navigation dots */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    gap: 1,
                                }}
                            >
                                {sessionData.combatants.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                currentTurn === index
                                                    ? "#4caf50"
                                                    : "#bdbdbd",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Current turn summary */}
                    <Paper sx={{ padding: 3, marginTop: 2 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Current Turn Summary
                        </Typography>
                        <Typography variant="body1">
                            <strong>{sessionData.combatants[currentTurn]?.name || "Unknown"}</strong> is currently active
                            {sessionData.combatants[currentTurn]?.isDead ? " (DEAD)" : ""}
                        </Typography>
                    </Paper>
                </Box>
            )}
        </Container>
    )
}

export default LiveGameView
