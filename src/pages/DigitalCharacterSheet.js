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
import { Download, Upload, Save, RestartAlt } from "@mui/icons-material"
import { PDFDocument, rgb } from "pdf-lib"
import { saveAs } from "file-saver"
import * as htmlToImage from "html-to-image"

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

    const saveToJSON = () => {
        try {
            const dataStr = JSON.stringify(characterData, null, 2)
            const dataBlob = new Blob([dataStr], { type: "application/json" })
            const fileName = characterData.characterName
                ? `${characterData.characterName
                      .replace(/[^a-z0-9]/gi, "_")
                      .toLowerCase()}.imk.json`
                : "character_sheet.imk.json"
            saveAs(dataBlob, fileName)
            showAlert("Character sheet saved successfully!")
        } catch (error) {
            showAlert("Error saving character sheet", "error")
        }
    }

    const loadFromJSON = (event) => {
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

    const exportToPDF = async () => {
        try {
            // Get the character sheet element
            const element = characterSheetRef.current
            if (!element) {
                throw new Error("Character sheet element not found")
            }

            // Show loading state
            showAlert("Generating PDF, please wait...", "info")

            // Store original styles to restore later
            const originalStyles = {
                width: element.style.width,
                minWidth: element.style.minWidth,
                maxWidth: element.style.maxWidth,
                transform: element.style.transform,
                position: element.style.position,
                left: element.style.left,
                top: element.style.top,
                zIndex: element.style.zIndex,
            }

            // Force a consistent layout for PDF generation (A4-optimized layout)
            element.style.width = "595px" // A4 width in points (210mm)
            element.style.minWidth = "595px"
            element.style.maxWidth = "595px"
            element.style.transform = "scale(1)"
            element.style.position = "relative"
            element.style.left = "auto"
            element.style.top = "auto"
            element.style.zIndex = "1000"

            // Wait for layout to settle
            await new Promise((resolve) => setTimeout(resolve, 100))

            // Generate high-quality image from the React component with A4 dimensions
            const dataUrl = await htmlToImage.toPng(element, {
                quality: 1.0,
                pixelRatio: 2, // Higher resolution for better quality
                backgroundColor: "#ffffff",
                width: 595, // A4 width in points
                height: element.scrollHeight, // Use scroll height to capture full content
                style: {
                    transform: "scale(1)",
                    transformOrigin: "top left",
                    width: "595px",
                    minWidth: "595px",
                    maxWidth: "595px",
                },
            })

            // Restore original styles
            Object.keys(originalStyles).forEach((key) => {
                if (
                    originalStyles[key] !== null &&
                    originalStyles[key] !== undefined
                ) {
                    element.style[key] = originalStyles[key]
                } else {
                    element.style.removeProperty(
                        key.replace(/([A-Z])/g, "-$1").toLowerCase()
                    )
                }
            })

            // Create PDF document with A4 dimensions
            const pdfDoc = await PDFDocument.create()
            const page = pdfDoc.addPage([595, 842]) // A4 size (210mm x 297mm)

            // Embed the image as background
            const pngImage = await pdfDoc.embedPng(dataUrl)

            // Calculate scaling to fit A4 page with margins
            const margin = 20 // Smaller margin for A4
            const availableWidth = 595 - margin * 2
            const availableHeight = 842 - margin * 2

            // Scale image to fit while maintaining aspect ratio
            const imageAspectRatio = pngImage.width / pngImage.height
            let scaledWidth = availableWidth
            let scaledHeight = scaledWidth / imageAspectRatio

            if (scaledHeight > availableHeight) {
                scaledHeight = availableHeight
                scaledWidth = scaledHeight * imageAspectRatio
            }

            // Center the image on the page
            const x = (595 - scaledWidth) / 2
            const y = 842 - margin - scaledHeight

            page.drawImage(pngImage, {
                x: x,
                y: y,
                width: scaledWidth,
                height: scaledHeight,
            })

            // Add form fields for interactivity
            const form = pdfDoc.getForm()

            // Helper function to calculate form field positions based on image scaling
            const calculatePosition = (
                relativeX,
                relativeY,
                relativeWidth,
                relativeHeight
            ) => {
                return {
                    x: x + scaledWidth * relativeX,
                    y: y + scaledHeight * (1 - relativeY - relativeHeight), // PDF y is flipped
                    width: scaledWidth * relativeWidth,
                    height: scaledHeight * relativeHeight,
                }
            }

            // --- FORM FIELD POSITIONING (OPTIMIZED) ---

            // --- FORM FIELD POSITIONING (A4-OPTIMIZED) ---
            // Character Name field - moved left and made taller
            try {
                const nameField = form.createTextField("characterName")
                nameField.setText(characterData.characterName || "")
                nameField.addToPage(page, {
                    ...calculatePosition(0.23, 0.115, 0.52, 0.035), // Moved left, made taller
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 6,
                })
            } catch (e) {
                console.warn("Could not add character name field:", e)
            }

            // Core Stats Fields - moved lower (A4 layout)
            try {
                const bodyField = form.createTextField("body")
                bodyField.setText(characterData.body || "")
                bodyField.addToPage(page, {
                    ...calculatePosition(0.085, 0.325, 0.13, 0.022), // Moved down from 0.305 to 0.325
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 6,
                })

                const agilityField = form.createTextField("agility")
                agilityField.setText(characterData.agility || "")
                agilityField.addToPage(page, {
                    ...calculatePosition(0.31, 0.325, 0.13, 0.022), // Moved down from 0.305 to 0.325
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 6,
                })

                const focusField = form.createTextField("focus")
                focusField.setText(characterData.focus || "")
                focusField.addToPage(page, {
                    ...calculatePosition(0.535, 0.325, 0.13, 0.022), // Moved down from 0.305 to 0.325
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 6,
                })

                const fateField = form.createTextField("fate")
                fateField.setText(characterData.fate || "")
                fateField.addToPage(page, {
                    ...calculatePosition(0.76, 0.325, 0.13, 0.022), // Moved down from 0.305 to 0.325
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 6,
                })
            } catch (e) {
                console.warn("Could not add stat fields:", e)
            }

            // Action Rolls are static labels - no form fields needed

            // ATK Checkboxes - positioned over the ATK bubbles in top-right corners (A4 layout)
            try {
                const bodyAtkField = form.createCheckBox("bodyAtk")
                if (characterData.bodyAtkChecked) bodyAtkField.check()
                bodyAtkField.addToPage(page, {
                    ...calculatePosition(0.19, 0.26, 0.022, 0.022), // Over BODY ATK circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })

                const agilityAtkField = form.createCheckBox("agilityAtk")
                if (characterData.agilityAtkChecked) agilityAtkField.check()
                agilityAtkField.addToPage(page, {
                    ...calculatePosition(0.415, 0.26, 0.022, 0.022), // Over AGILITY ATK circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })

                const focusAtkField = form.createCheckBox("focusAtk")
                if (characterData.focusAtkChecked) focusAtkField.check()
                focusAtkField.addToPage(page, {
                    ...calculatePosition(0.64, 0.26, 0.022, 0.022), // Over FOCUS ATK circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })
            } catch (e) {
                console.warn("Could not add ATK checkboxes:", e)
            }

            // Shield and Armor Radio Buttons - positioned over Y/N circles (A4 layout)
            try {
                const shieldGroup = form.createRadioGroup("shield")
                shieldGroup.addOptionToPage("Y", page, {
                    ...calculatePosition(0.16, 0.55, 0.022, 0.022), // Over Shield Y circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })
                shieldGroup.addOptionToPage("N", page, {
                    ...calculatePosition(0.205, 0.55, 0.022, 0.022), // Over Shield N circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })
                if (characterData.shield === true) shieldGroup.select("Y")
                else if (characterData.shield === false) shieldGroup.select("N")

                const armorGroup = form.createRadioGroup("armor")
                armorGroup.addOptionToPage("Y", page, {
                    ...calculatePosition(0.16, 0.595, 0.022, 0.022), // Over Armor Y circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })
                armorGroup.addOptionToPage("N", page, {
                    ...calculatePosition(0.205, 0.595, 0.022, 0.022), // Over Armor N circle
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                })
                if (characterData.armor === true) armorGroup.select("Y")
                else if (characterData.armor === false) armorGroup.select("N")
            } catch (e) {
                console.warn("Could not add shield/armor radio buttons:", e)
            }

            // Health Fields - positioned over the dotted underlines (A4 layout)
            try {
                const maxHPField = form.createTextField("maxHP")
                maxHPField.setText(characterData.maxHP || "")
                maxHPField.addToPage(page, {
                    ...calculatePosition(0.675, 0.55, 0.13, 0.022), // Over MAX HP dotted line
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 5, // Reduced from 8 to 5
                })

                const currentHPField = form.createTextField("currentHP")
                currentHPField.setText(characterData.currentHP || "")
                currentHPField.addToPage(page, {
                    ...calculatePosition(0.675, 0.595, 0.13, 0.022), // Over CURRENT HP dotted line
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 5, // Reduced from 8 to 5
                })
            } catch (e) {
                console.warn("Could not add health fields:", e)
            }

            // Notes Field - positioned over the large notes text area (A4 layout)
            try {
                const notesField = form.createTextField("notes")
                notesField.setText(characterData.notes || "")
                notesField.enableMultiline()
                notesField.addToPage(page, {
                    ...calculatePosition(0.085, 0.68, 0.83, 0.22), // Over notes text area
                    backgroundColor: rgb(1, 1, 1, 0),
                    borderColor: rgb(0, 0, 0, 0),
                    fontSize: 3, // Much smaller font for notes - reduced from 6 to 3
                })
            } catch (e) {
                console.warn("Could not add notes field:", e)
            }
            // --- END FORM FIELD POSITIONING (A4-OPTIMIZED) ---

            // Generate and save PDF
            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: "application/pdf" })
            const fileName = characterData.characterName
                ? `${characterData.characterName
                      .replace(/[^a-z0-9]/gi, "_")
                      .toLowerCase()}_sheet.pdf`
                : "character_sheet.pdf"
            saveAs(blob, fileName)

            showAlert("PDF exported successfully!")
        } catch (error) {
            console.error("Error exporting PDF:", error)
            showAlert("Error exporting PDF. Please try again.", "error")
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
                    onClick={saveToJSON}
                    sx={{
                        bgcolor: "#8B0000",
                        "&:hover": { bgcolor: "#660000" },
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontFamily: '"Cinzel", serif',
                    }}
                >
                    Save JSON
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
                    Load JSON
                </Button>
                <Button
                    variant='contained'
                    startIcon={<Download />}
                    onClick={exportToPDF}
                    sx={{
                        bgcolor: "#8B0000",
                        "&:hover": { bgcolor: "#660000" },
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontFamily: '"Cinzel", serif',
                    }}
                >
                    Export Fillable PDF
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
                    onChange={loadFromJSON}
                    accept='.json,.imk.json'
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
