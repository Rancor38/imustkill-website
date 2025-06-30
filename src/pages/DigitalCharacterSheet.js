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
import html2canvas from "html2canvas"

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

    // Utility functions for PNG metadata embedding
    const embedCharacterDataInPNG = (canvas, characterData) => {
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const reader = new FileReader()
                reader.onload = () => {
                    const arrayBuffer = reader.result
                    const uint8Array = new Uint8Array(arrayBuffer)

                    // Find the end of IDAT chunks (before IEND)
                    let insertPosition = uint8Array.length - 12 // Before IEND chunk

                    // Create custom tEXt chunk for character data
                    const characterJSON = JSON.stringify(characterData)
                    const keyword = "Character Data"
                    const textData = new TextEncoder().encode(
                        keyword + "\0" + characterJSON
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

    const extractCharacterDataFromPNG = (file) => {
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

                                if (keyword === "Character Data") {
                                    const characterData = JSON.parse(data)
                                    resolve(characterData)
                                    return
                                }
                            }
                        }

                        if (chunkType === "IEND") break
                        offset += 8 + chunkLength + 4 // length + type + data + crc
                    }

                    resolve(null) // No character data found
                } catch (error) {
                    reject(error)
                }
            }
            reader.readAsArrayBuffer(file)
        })
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

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success")
    const [isDragOver, setIsDragOver] = useState(false)
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

    const saveToCharacterFile = async () => {
        try {
            if (characterSheetRef.current) {
                // Hide the action buttons temporarily for a cleaner screenshot
                const actionButtons = document.querySelector(
                    '[data-testid="action-buttons"]'
                )
                if (actionButtons) {
                    actionButtons.style.display = "none"
                }

                const canvas = await html2canvas(characterSheetRef.current, {
                    backgroundColor: "#ffffff",
                    scale: 2, // Higher resolution
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                    height: characterSheetRef.current.scrollHeight,
                    width: characterSheetRef.current.scrollWidth,
                })

                // Show the action buttons again
                if (actionButtons) {
                    actionButtons.style.display = "flex"
                }

                // Embed character data in the PNG
                const blobWithData = await embedCharacterDataInPNG(
                    canvas,
                    characterData
                )

                const fileName = characterData.characterName
                    ? `${characterData.characterName
                          .replace(/[^a-z0-9]/gi, "_")
                          .toLowerCase()}.character.png`
                    : "character_sheet.character.png"
                saveAs(blobWithData, fileName)
                showAlert(
                    "Character saved as .character.png with embedded data!"
                )
            }
        } catch (error) {
            console.error("Error saving character file:", error)
            showAlert("Error saving character sheet", "error")
        }
    }

    const loadFromCharacterFile = async (event) => {
        const file = event.target.files[0]
        if (file) {
            try {
                if (
                    file.name.endsWith(".character.png") ||
                    file.name.endsWith(".png")
                ) {
                    // Try to extract character data from PNG
                    const characterData = await extractCharacterDataFromPNG(
                        file
                    )
                    if (characterData) {
                        setCharacterData((prev) => ({
                            ...prev,
                            ...characterData,
                        }))
                        showAlert("Character sheet loaded from .character.png!")
                    } else {
                        showAlert(
                            "No character data found in this PNG file",
                            "error"
                        )
                    }
                } else {
                    // Handle legacy .character and .json files
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        try {
                            const loadedData = JSON.parse(e.target.result)
                            setCharacterData((prev) => ({
                                ...prev,
                                ...loadedData,
                            }))
                            showAlert("Character sheet loaded successfully!")
                        } catch (error) {
                            showAlert("Error loading character sheet", "error")
                        }
                    }
                    reader.readAsText(file)
                }
            } catch (error) {
                showAlert("Error loading character sheet", "error")
            }
        }
        // Reset the file input
        event.target.value = null
    }

    const loadCharacterFromFile = async (file) => {
        try {
            if (
                file.name.endsWith(".character.png") ||
                file.name.endsWith(".png")
            ) {
                // Try to extract character data from PNG
                const characterData = await extractCharacterDataFromPNG(file)
                if (characterData) {
                    setCharacterData((prev) => ({ ...prev, ...characterData }))
                    showAlert("Character sheet loaded from .character.png!")
                } else {
                    showAlert(
                        "No character data found in this PNG file",
                        "error"
                    )
                }
            } else {
                // Handle legacy .character and .json files
                const reader = new FileReader()
                reader.onload = (e) => {
                    try {
                        const loadedData = JSON.parse(e.target.result)
                        setCharacterData((prev) => ({ ...prev, ...loadedData }))
                        showAlert("Character sheet loaded successfully!")
                    } catch (error) {
                        showAlert("Error loading character sheet", "error")
                    }
                }
                reader.readAsText(file)
            }
        } catch (error) {
            showAlert("Error loading character sheet", "error")
        }
    }

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
            // Check if it's a character file (.character.png) or legacy formats
            if (
                file.name.endsWith(".character.png") ||
                file.name.endsWith(".png") ||
                file.name.endsWith(".character") ||
                file.name.endsWith(".json")
            ) {
                loadCharacterFromFile(file)
            } else {
                showAlert(
                    "Please drop a .character.png file (or legacy .character/.json file)",
                    "error"
                )
            }
        }
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
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
                py: 2,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
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
                        backgroundColor: "rgba(139, 0, 0, 0.1)",
                        border: "3px dashed #8B0000",
                        borderRadius: "16px",
                        zIndex: 1000,
                        pointerEvents: "none",
                    },
                    "&::after": {
                        content:
                            '"Drop your character file here (.character.png)"',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#8B0000",
                        color: "#ffffff",
                        padding: "16px 32px",
                        borderRadius: "12px",
                        fontFamily: '"Cinzel", serif',
                        fontSize: "18px",
                        fontWeight: "bold",
                        zIndex: 1001,
                        pointerEvents: "none",
                        boxShadow: "0 8px 24px rgba(139, 0, 0, 0.3)",
                    },
                }),
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
                <Typography
                    variant='body2'
                    sx={{
                        opacity: 0.6,
                        fontSize: { xs: "0.75rem", sm: "0.85rem" },
                        maxWidth: "600px",
                        margin: "8px auto 0",
                        fontFamily: '"Cinzel", serif',
                        fontStyle: "italic",
                    }}
                ></Typography>
            </Box>

            {/* Action Buttons */}
            <Box
                data-testid='action-buttons'
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
                    accept='.character.png,.png,.character,.json'
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
