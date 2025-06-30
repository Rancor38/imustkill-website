import React, { useState, useRef } from "react"
import {
    Container,
    Box,
    Typography,
    TextField,
    Grid,
    Paper,
    Button,
    Alert,
    Snackbar,
} from "@mui/material"
import { Upload, Save, RestartAlt } from "@mui/icons-material"
import { saveAs } from "file-saver"

const DigitalCharacterSheet = () => {
    // Character data state matching the original sheet
    const [characterData, setCharacterData] = useState({
        // Basic Info
        characterName: "",

        // Core Stats
        body: "",
        agility: "",
        focus: "",
        fate: "",
        bodyAtkChecked: false,
        agilityAtkChecked: false,
        focusAtkChecked: false,

        // Action Rolls
        brace: "",
        dodge: "",
        castSpell: "",
        dying: "",

        // Equipment
        shield: false,
        armor: false,

        // Health
        maxHP: "",
        currentHP: "",

        // Notes
        notes: "",
    })

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success")
    const fileInputRef = useRef(null)
    const characterSheetRef = useRef(null)

    const handleInputChange = (field) => (event) => {
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        setCharacterData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const showAlert = (message, severity = "success") => {
        setAlertMessage(message)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    const saveToCharacterFile = () => {
        try {
            const dataStr = JSON.stringify(characterData, null, 2)
            const dataBlob = new Blob([dataStr], { type: "application/json" })
            const fileName = characterData.characterName
                ? `${characterData.characterName
                      .replace(/[^a-z0-9]/gi, "_")
                      .toLowerCase()}.character`
                : "character_sheet.character"
            saveAs(dataBlob, fileName)
            showAlert("Character sheet saved successfully!")
        } catch (error) {
            showAlert("Error saving character sheet", "error")
        }
    }

    const loadFromCharacterFile = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const loadedData = JSON.parse(e.target.result)
                    setCharacterData({ ...characterData, ...loadedData })
                    showAlert("Character sheet loaded successfully!")
                } catch (error) {
                    showAlert("Error loading character sheet", "error")
                }
            }
            reader.readAsText(file)
        }
        // Reset the file input
        event.target.value = null
    }

    const resetSheet = () => {
        setCharacterData({
            characterName: "",
            body: "",
            agility: "",
            focus: "",
            fate: "",
            bodyAtkChecked: false,
            agilityAtkChecked: false,
            focusAtkChecked: false,
            brace: "",
            dodge: "",
            castSpell: "",
            dying: "",
            shield: false,
            armor: false,
            maxHP: "",
            currentHP: "",
            notes: "",
        })
        showAlert("Character sheet reset successfully!")
    }

    return (
        <Container
            maxWidth='md'
            sx={{
                py: 2,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                    variant='h3'
                    component='h1'
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                        mb: 1,
                        fontFamily:
                            '"Cinzel", "Libre Baskerville", "Crimson Text", serif',
                    }}
                >
                    Digital Character Sheet
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        opacity: 0.8,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        maxWidth: "600px",
                        margin: "0 auto",
                        fontFamily: '"Cinzel", "Libre Baskerville", serif',
                    }}
                >
                    Create, edit, and manage your I Must Kill character
                </Typography>
            </Box>

            {/* Action Buttons */}
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    gap: 1.5,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Button
                    variant='contained'
                    startIcon={<Save />}
                    onClick={saveToCharacterFile}
                    sx={{
                        bgcolor: "#8B0000",
                        "&:hover": { bgcolor: "#660000" },
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontFamily: '"Cinzel", serif',
                    }}
                >
                    Save Character
                </Button>
                <Button
                    variant='contained'
                    startIcon={<Upload />}
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                        bgcolor: "#8B0000",
                        "&:hover": { bgcolor: "#660000" },
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontFamily: '"Cinzel", serif',
                    }}
                >
                    Load Character
                </Button>
                <Button
                    variant='outlined'
                    startIcon={<RestartAlt />}
                    onClick={resetSheet}
                    sx={{
                        borderColor: "#8B0000",
                        color: "#8B0000",
                        "&:hover": { borderColor: "#660000", color: "#660000" },
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontFamily: '"Cinzel", serif',
                    }}
                >
                    Reset
                </Button>
                <input
                    type='file'
                    ref={fileInputRef}
                    onChange={loadFromCharacterFile}
                    accept='.character,.json'
                    style={{ display: "none" }}
                />
            </Box>

            {/* Character Sheet - PDF-faithful layout */}
            <Paper
                id='character-sheet-container'
                ref={characterSheetRef}
                sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    p: 3,
                    border: "2px solid #000000",
                    borderRadius: "16px",
                    fontFamily:
                        '"Cinzel", "Libre Baskerville", "Crimson Text", serif',
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        borderBottom: "2px solid #000",
                        pb: 2,
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "24px",
                            color: "#000000",
                            letterSpacing: "2px",
                            fontFamily: '"Cinzel Decorative", "Cinzel", serif',
                        }}
                    >
                        My Name Is...
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TextField
                            value={characterData.characterName}
                            onChange={handleInputChange("characterName")}
                            variant='standard'
                            placeholder='Character Name'
                            sx={{
                                mt: 2,
                                width: "300px",
                                "& .MuiInput-underline:before": {
                                    borderBottomStyle: "dotted",
                                    borderBottomWidth: "2px",
                                    borderBottomColor: "#000000",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                    {
                                        borderBottomColor: "#333333",
                                    },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "#000000",
                                },
                                "& .MuiInputBase-input": {
                                    color: "#000000",
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    fontFamily: '"Cinzel", serif',
                                    padding: "4px 0",
                                },
                            }}
                        />
                        <Typography
                            sx={{
                                mt: 2,
                                ml: 2,
                                fontWeight: "bold",
                                fontSize: "18px",
                                fontFamily: '"Cinzel", serif',
                            }}
                        >
                            and
                        </Typography>
                    </Box>
                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "28px",
                            color: "#8B0000",
                            mt: 2,
                            letterSpacing: "3px",
                            fontFamily: '"Cinzel Decorative", "Cinzel", serif',
                        }}
                    >
                        I MUST KILL
                    </Typography>
                </Box>

                {/* Core Stats Grid */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                        { label: "BODY", field: "body" },
                        { label: "AGILITY", field: "agility" },
                        { label: "FOCUS", field: "focus" },
                        { label: "FATE", field: "fate" },
                    ].map(({ label, field }) => (
                        <Grid item xs={6} sm={3} key={field}>
                            <Box
                                sx={{
                                    border: "2px solid #000000",
                                    p: 1.5,
                                    textAlign: "center",
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "12px",
                                }}
                            >
                                <Box sx={{ position: "relative" }}>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 1,
                                            color: "#000000",
                                            fontSize: "12px",
                                            fontFamily: '"Cinzel", serif',
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                    {(field === "body" ||
                                        field === "agility" ||
                                        field === "focus") && (
                                        <Box
                                            onClick={() => {
                                                // Toggle an 'atkChecked' property for this stat
                                                setCharacterData((prev) => ({
                                                    ...prev,
                                                    [`${field}AtkChecked`]:
                                                        !prev[
                                                            `${field}AtkChecked`
                                                        ],
                                                }))
                                            }}
                                            sx={{
                                                position: "absolute",
                                                top: "-14px",
                                                right: "-14px",
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                border: "1px dotted #000",
                                                backgroundColor: "#f9f9f9",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                fontFamily: '"Cinzel", serif',
                                                cursor: "pointer",
                                                overflow: "visible",
                                                zIndex: 5,
                                            }}
                                        >
                                            {characterData[
                                                `${field}AtkChecked`
                                            ] ? (
                                                <>
                                                    <Box
                                                        sx={{
                                                            position:
                                                                "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius: "50%",
                                                            backgroundColor:
                                                                "#8B0000",
                                                            zIndex: 10,
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            zIndex: 15,
                                                            color: "#ffffff",
                                                        }}
                                                    >
                                                        atk
                                                    </span>
                                                </>
                                            ) : (
                                                "atk"
                                            )}
                                        </Box>
                                    )}
                                </Box>
                                <TextField
                                    value={characterData[field]}
                                    onChange={handleInputChange(field)}
                                    variant='standard'
                                    size='small'
                                    sx={{
                                        width: "50px",
                                        "& .MuiInput-underline:before": {
                                            borderBottomStyle: "dotted",
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "#000000",
                                        },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                            {
                                                borderBottomColor: "#333333",
                                            },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor: "#000000",
                                        },
                                        "& .MuiInputBase-input": {
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            fontFamily: '"Cinzel", serif',
                                            padding: "4px 0",
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Action Rolls */}
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                        {[
                            { label: "BRACE" },
                            { label: "DODGE" },
                            { label: "CAST SPELL" },
                            { label: "DYING" },
                        ].map(({ label }) => (
                            <Grid item xs={6} sm={3} key={label}>
                                <Box
                                    sx={{
                                        border: "2px solid #000000",
                                        p: 2,
                                        textAlign: "center",
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "12px",
                                        minHeight: "60px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#000000",
                                            fontSize: "12px",
                                            fontFamily: '"Cinzel", serif',
                                            textAlign: "center",
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Equipment and Health */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    {/* Equipment */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                border: "2px solid #000000",
                                p: 2,
                                backgroundColor: "#f9f9f9",
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: "bold",
                                    mb: 2,
                                    textAlign: "center",
                                    color: "#000000",
                                    fontSize: "14px",
                                    fontFamily: '"Cinzel", serif',
                                }}
                            >
                                EQUIPMENT
                            </Typography>

                            {/* Shield Y/N */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#000000",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                        fontFamily: '"Cinzel", serif',
                                        mr: 2,
                                    }}
                                >
                                    SHIELD?
                                </Typography>
                                <Button
                                    variant={
                                        characterData.shield === true
                                            ? "outlined"
                                            : "contained"
                                    }
                                    size='small'
                                    onClick={() =>
                                        setCharacterData((prev) => ({
                                            ...prev,
                                            shield: true,
                                        }))
                                    }
                                    sx={{
                                        minWidth: "30px",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        mr: 1,
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        bgcolor:
                                            characterData.shield === true
                                                ? "transparent"
                                                : "#8B0000",
                                        color:
                                            characterData.shield === true
                                                ? "#000000"
                                                : "#ffffff",
                                        borderColor: "#000000",
                                        "&:hover": {
                                            bgcolor:
                                                characterData.shield === true
                                                    ? "#f0f0f0"
                                                    : "#660000",
                                        },
                                    }}
                                >
                                    Y
                                </Button>
                                <Button
                                    variant={
                                        characterData.shield === false
                                            ? "outlined"
                                            : "contained"
                                    }
                                    size='small'
                                    onClick={() =>
                                        setCharacterData((prev) => ({
                                            ...prev,
                                            shield: false,
                                        }))
                                    }
                                    sx={{
                                        minWidth: "30px",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        bgcolor:
                                            characterData.shield === false
                                                ? "transparent"
                                                : "#8B0000",
                                        color:
                                            characterData.shield === false
                                                ? "#000000"
                                                : "#ffffff",
                                        borderColor: "#000000",
                                        "&:hover": {
                                            bgcolor:
                                                characterData.shield === false
                                                    ? "#f0f0f0"
                                                    : "#660000",
                                        },
                                    }}
                                >
                                    N
                                </Button>
                            </Box>

                            {/* Armor Y/N */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    sx={{
                                        color: "#000000",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                        fontFamily: '"Cinzel", serif',
                                        mr: 2,
                                    }}
                                >
                                    ARMOR?
                                </Typography>
                                <Button
                                    variant={
                                        characterData.armor === true
                                            ? "outlined"
                                            : "contained"
                                    }
                                    size='small'
                                    onClick={() =>
                                        setCharacterData((prev) => ({
                                            ...prev,
                                            armor: true,
                                        }))
                                    }
                                    sx={{
                                        minWidth: "30px",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        mr: 1,
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        bgcolor:
                                            characterData.armor === true
                                                ? "transparent"
                                                : "#8B0000",
                                        color:
                                            characterData.armor === true
                                                ? "#000000"
                                                : "#ffffff",
                                        borderColor: "#000000",
                                        "&:hover": {
                                            bgcolor:
                                                characterData.armor === true
                                                    ? "#f0f0f0"
                                                    : "#660000",
                                        },
                                    }}
                                >
                                    Y
                                </Button>
                                <Button
                                    variant={
                                        characterData.armor === false
                                            ? "outlined"
                                            : "contained"
                                    }
                                    size='small'
                                    onClick={() =>
                                        setCharacterData((prev) => ({
                                            ...prev,
                                            armor: false,
                                        }))
                                    }
                                    sx={{
                                        minWidth: "30px",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        bgcolor:
                                            characterData.armor === false
                                                ? "transparent"
                                                : "#8B0000",
                                        color:
                                            characterData.armor === false
                                                ? "#000000"
                                                : "#ffffff",
                                        borderColor: "#000000",
                                        "&:hover": {
                                            bgcolor:
                                                characterData.armor === false
                                                    ? "#f0f0f0"
                                                    : "#660000",
                                        },
                                    }}
                                >
                                    N
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Health */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                border: "2px solid #000000",
                                p: 2,
                                backgroundColor: "#f9f9f9",
                                borderRadius: "12px",
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: "bold",
                                    mb: 2,
                                    textAlign: "center",
                                    color: "#000000",
                                    fontSize: "14px",
                                    fontFamily: '"Cinzel", serif',
                                }}
                            >
                                HEALTH
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#000000",
                                        fontWeight: "bold",
                                        mr: 1,
                                        fontSize: "11px",
                                        fontFamily: '"Cinzel", serif',
                                    }}
                                >
                                    MAX HP:
                                </Typography>
                                <TextField
                                    value={characterData.maxHP}
                                    onChange={handleInputChange("maxHP")}
                                    variant='standard'
                                    size='small'
                                    sx={{
                                        width: "70px",
                                        "& .MuiInput-underline:before": {
                                            borderBottomStyle: "dotted",
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "#000000",
                                        },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                            {
                                                borderBottomColor: "#333333",
                                            },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor: "#000000",
                                        },
                                        "& .MuiInputBase-input": {
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            fontFamily: '"Cinzel", serif',
                                            padding: "4px 0",
                                        },
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#000000",
                                        fontWeight: "bold",
                                        mr: 1,
                                        fontSize: "11px",
                                        fontFamily: '"Cinzel", serif',
                                    }}
                                >
                                    CURRENT HP:
                                </Typography>
                                <TextField
                                    value={characterData.currentHP}
                                    onChange={handleInputChange("currentHP")}
                                    variant='standard'
                                    size='small'
                                    sx={{
                                        width: "70px",
                                        "& .MuiInput-underline:before": {
                                            borderBottomStyle: "dotted",
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "#000000",
                                        },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                            {
                                                borderBottomColor: "#333333",
                                            },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor: "#000000",
                                        },
                                        "& .MuiInputBase-input": {
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            fontFamily: '"Cinzel", serif',
                                            padding: "4px 0",
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Notes Section */}
                <Box
                    sx={{
                        border: "2px solid #000000",
                        p: 2,
                        backgroundColor: "#f9f9f9",
                        borderRadius: "12px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            textAlign: "center",
                            color: "#000000",
                            fontSize: "14px",
                            fontFamily: '"Cinzel", serif',
                        }}
                    >
                        NOTES
                    </Typography>
                    <TextField
                        value={characterData.notes}
                        onChange={handleInputChange("notes")}
                        variant='outlined'
                        multiline
                        fullWidth
                        placeholder='Character notes, backstory, equipment details, spells, etc...'
                        sx={{
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                height: "100%",
                                "& fieldset": {
                                    borderColor: "#000000",
                                    borderWidth: "2px",
                                    borderRadius: "8px",
                                },
                                "&:hover fieldset": { borderColor: "#333333" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#000000",
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: "#000000",
                                fontSize: "12px",
                                fontFamily: '"Libre Baskerville", serif',
                            },
                            "& .MuiInputBase-root": {
                                height: "100%",
                                alignItems: "flex-start",
                            },
                        }}
                    />
                </Box>
            </Paper>

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
    )
}

export default DigitalCharacterSheet
