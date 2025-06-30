import React from "react"
import { Box } from "@mui/material"
import { motion } from "framer-motion"

const InsightToken = ({ id, isFlipped, onFlip, size = 80 }) => {
    const handleClick = () => {
        onFlip(id)
    }

    return (
        <Box
            sx={{
                perspective: "1000px",
                width: size,
                height: size,
                margin: 1,
            }}
        >
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    cursor: "pointer",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={handleClick}
            >
                {/* Front side */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "2px solid #ffffff"
                                : "2px solid #000000",
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 4px 8px rgba(0, 0, 0, 0.5)"
                                : "0 4px 8px rgba(0, 0, 0, 0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "0 6px 12px rgba(0, 0, 0, 0.7)"
                                    : "0 6px 12px rgba(0, 0, 0, 0.35)",
                        },
                    }}
                >
                    <img
                        src='/insight_token_front.png'
                        alt='Insight Token Front'
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                {/* Back side */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "2px solid #ffffff"
                                : "2px solid #000000",
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 4px 8px rgba(0, 0, 0, 0.5)"
                                : "0 4px 8px rgba(0, 0, 0, 0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "rotateY(180deg) scale(1.05)",
                            boxShadow: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "0 6px 12px rgba(0, 0, 0, 0.7)"
                                    : "0 6px 12px rgba(0, 0, 0, 0.35)",
                        },
                    }}
                >
                    <img
                        src='/insight_token_back.png'
                        alt='Insight Token Back'
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </motion.div>
        </Box>
    )
}

export default InsightToken
