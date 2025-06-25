import React, { useState, useEffect, useMemo } from "react"
import {
    Container,
    Typography,
    Paper,
    Box,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Alert,
    Card,
    CardContent,
    Divider,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Link } from "react-router-dom"
import useRulesEngine from "../../hooks/useRulesEngine"

const SourceRegistry = () => {
    const { rulesData, loading, error } = useRulesEngine()
    const [sourceMap, setSourceMap] = useState(new Map())
    const [uncategorizedRules, setUncategorizedRules] = useState([])

    // Build source map from all JSON files
    useEffect(() => {
        if (!rulesData || loading || error) return

        const buildSourceMap = () => {
            const map = new Map()
            const allReferenceIds = new Set()
            const sourcedRules = new Set()

            // Collect all reference IDs from rules-database.json
            if (rulesData.database?.referenceIds) {
                Object.keys(rulesData.database.referenceIds).forEach(
                    (refId) => {
                        allReferenceIds.add(refId)
                    }
                )
            }

            // Scan all category files for %Source annotations
            Object.keys(rulesData.database?.categories || {}).forEach(
                (categoryKey) => {
                    const categoryData = rulesData[categoryKey]
                    if (!categoryData) return

                    const mainData = Object.values(categoryData)[0]
                    if (!mainData?.sections) return

                    const scanSections = (sections, parentPath = "") => {
                        sections.forEach((section) => {
                            const sectionPath = `${categoryKey}/${section.id}`

                            if (section["%Source"]) {
                                section["%Source"].forEach((ruleName) => {
                                    if (!map.has(ruleName)) {
                                        map.set(ruleName, [])
                                    }
                                    map.get(ruleName).push({
                                        category: categoryKey,
                                        categoryTitle:
                                            rulesData.database.categories[
                                                categoryKey
                                            ]?.title,
                                        sectionId: section.id,
                                        sectionTitle: section.title,
                                        sectionPath,
                                        description: section.description || "",
                                        path: `/${categoryKey}#${section.id}`,
                                    })
                                    sourcedRules.add(ruleName)
                                })
                            }

                            // Recursively scan subsections
                            if (section.subsections) {
                                scanSections(section.subsections, sectionPath)
                            }
                        })
                    }

                    scanSections(mainData.sections)
                }
            )

            // Find uncategorized rules (exist in referenceIds but no %Source)
            const uncategorized = Array.from(allReferenceIds).filter(
                (refId) => !sourcedRules.has(refId)
            )

            setSourceMap(map)
            setUncategorizedRules(uncategorized)
        }

        buildSourceMap()
    }, [rulesData, loading, error])

    // Group sources by category for better organization
    const sourcesByCategory = useMemo(() => {
        const categoryGroups = new Map()

        sourceMap.forEach((sources, ruleName) => {
            sources.forEach((source) => {
                if (!categoryGroups.has(source.category)) {
                    categoryGroups.set(source.category, new Map())
                }
                if (!categoryGroups.get(source.category).has(ruleName)) {
                    categoryGroups.get(source.category).set(ruleName, [])
                }
                categoryGroups.get(source.category).get(ruleName).push(source)
            })
        })

        return categoryGroups
    }, [sourceMap])

    if (loading) return <Container>Loading source registry...</Container>
    if (error) return <Alert severity='error'>Error: {error}</Alert>

    return (
        <Container maxWidth='lg' sx={{ py: 4 }}>
            <Typography variant='h3' component='h1' gutterBottom>
                Rules Source Registry
            </Typography>

            <Typography variant='body1' sx={{ mb: 4 }}>
                This registry shows which sections of the website are the
                authoritative source for each rule. The %Source system defines
                where rules are officially defined, and @RuleName tags should
                link back to these sources.
            </Typography>

            {/* Summary Statistics */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant='h5' gutterBottom>
                    Summary
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Chip
                        label={`${sourceMap.size} Rules with Sources`}
                        color='primary'
                        variant='outlined'
                    />
                    <Chip
                        label={`${uncategorizedRules.length} Uncategorized Rules`}
                        color='warning'
                        variant='outlined'
                    />
                    <Chip
                        label={`${sourcesByCategory.size} Categories`}
                        color='info'
                        variant='outlined'
                    />
                </Box>
            </Paper>

            {/* Sources by Category */}
            <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
                Sources by Category
            </Typography>

            {Array.from(sourcesByCategory.entries()).map(
                ([category, rulesMap]) => (
                    <Accordion key={category} sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6'>
                                {rulesData.database?.categories?.[category]
                                    ?.title || category}
                            </Typography>
                            <Chip
                                label={`${rulesMap.size} rules`}
                                size='small'
                                sx={{ ml: 2 }}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {Array.from(rulesMap.entries()).map(
                                    ([ruleName, sources]) => (
                                        <ListItem
                                            key={ruleName}
                                            sx={{
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    width: "100%",
                                                }}
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {ruleName}
                                                </Typography>
                                                <Chip
                                                    label={`${
                                                        sources.length
                                                    } source${
                                                        sources.length > 1
                                                            ? "s"
                                                            : ""
                                                    }`}
                                                    size='small'
                                                />
                                            </Box>
                                            {sources.map((source, index) => (
                                                <Card
                                                    key={index}
                                                    variant='outlined'
                                                    sx={{ mt: 1, ml: 2 }}
                                                >
                                                    <CardContent
                                                        sx={{
                                                            py: 1,
                                                            "&:last-child": {
                                                                pb: 1,
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            variant='body2'
                                                            color='primary'
                                                        >
                                                            <Link
                                                                to={source.path}
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "inherit",
                                                                }}
                                                            >
                                                                {
                                                                    source.sectionTitle
                                                                }
                                                            </Link>
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                        >
                                                            {source.description}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                )
            )}

            {/* Uncategorized Rules */}
            {uncategorizedRules.length > 0 && (
                <>
                    <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
                        Uncategorized Rules
                    </Typography>
                    <Alert severity='warning' sx={{ mb: 2 }}>
                        These rules exist in the reference database but don't
                        have %Source annotations yet. They should be
                        systematically categorized by adding %Source arrays to
                        the appropriate JSON sections.
                    </Alert>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {uncategorizedRules.map((ruleName) => {
                                const refData =
                                    rulesData.database?.referenceIds?.[ruleName]
                                return (
                                    <Chip
                                        key={ruleName}
                                        label={ruleName}
                                        variant='outlined'
                                        color='warning'
                                        title={
                                            refData?.description ||
                                            "No description available"
                                        }
                                    />
                                )
                            })}
                        </Box>
                    </Paper>
                </>
            )}

            {/* Instructions */}
            <Paper sx={{ p: 3, mt: 4, bgcolor: "action.hover" }}>
                <Typography variant='h5' gutterBottom>
                    How to Use This System
                </Typography>
                <Typography variant='body2' component='div'>
                    <strong>%Source Annotations:</strong>
                    <ul>
                        <li>
                            Add "%Source": ["@RuleName1", "@RuleName2"] to JSON
                            sections that define rules
                        </li>
                        <li>
                            This creates the authoritative source mapping for
                            those rules
                        </li>
                        <li>
                            @RuleName tags in content will automatically link to
                            these sources
                        </li>
                    </ul>
                    <strong>Systematic Categorization:</strong>
                    <ul>
                        <li>Review the "Uncategorized Rules" list above</li>
                        <li>
                            Add appropriate %Source annotations to the relevant
                            JSON sections
                        </li>
                        <li>
                            Ensure all @RuleName references point to their
                            defining sources
                        </li>
                        <li>
                            Maintain consistency across the entire rule system
                        </li>
                    </ul>
                </Typography>
            </Paper>
        </Container>
    )
}

export default SourceRegistry
