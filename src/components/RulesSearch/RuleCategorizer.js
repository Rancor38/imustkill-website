import React, { useState } from "react"
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Alert,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import useRulesEngine from "../../hooks/useRulesEngine"

const RuleCategorizer = () => {
    const { rulesData, getSourceMap, loading, error } = useRulesEngine()
    const [analysisResults, setAnalysisResults] = useState(null)

    // Analysis function to scan all content for potential @RuleName usage
    const analyzeContent = () => {
        if (!rulesData.database) return

        const results = {
            missingRuleReferences: [],
            inconsistentUsage: [],
            potentialNewRules: [],
            categoryAnalysis: new Map(),
        }

        const sourceMap = getSourceMap()
        const allReferenceIds = Object.keys(
            rulesData.database.referenceIds || {}
        )
        const ruleNamePattern = /@(\w+)/g

        // Scan each category's content
        Object.keys(rulesData.database.categories || {}).forEach(
            (categoryKey) => {
                const categoryData = rulesData[categoryKey]
                if (!categoryData) return

                const mainData = Object.values(categoryData)[0]
                if (!mainData?.sections) return

                const categoryResults = {
                    existingRuleRefs: new Set(),
                    missingRuleRefs: new Set(),
                    inconsistencies: [],
                    textContent: [],
                }

                const scanTextForRules = (text, sectionTitle, sectionId) => {
                    if (typeof text !== "string") return

                    // Find all @RuleName patterns
                    const matches = [...text.matchAll(ruleNamePattern)]
                    matches.forEach((match) => {
                        const ruleName = `@${match[1]}`
                        categoryResults.existingRuleRefs.add(ruleName)

                        // Check if this rule exists in reference database
                        if (!allReferenceIds.includes(ruleName)) {
                            categoryResults.missingRuleRefs.add(ruleName)
                            results.potentialNewRules.push({
                                ruleName,
                                category: categoryKey,
                                section: sectionTitle,
                                sectionId,
                                context: text.substring(
                                    Math.max(0, match.index - 50),
                                    match.index + 50
                                ),
                            })
                        }
                    })

                    // Store text content for further analysis
                    categoryResults.textContent.push({
                        text,
                        sectionTitle,
                        sectionId,
                    })
                }

                const scanSections = (sections) => {
                    sections.forEach((section) => {
                        // Scan section description
                        if (section.description) {
                            scanTextForRules(
                                section.description,
                                section.title,
                                section.id
                            )
                        }

                        // Scan subsections
                        if (section.subsections) {
                            section.subsections.forEach((subsection) => {
                                if (subsection.description) {
                                    scanTextForRules(
                                        subsection.description,
                                        subsection.title,
                                        subsection.id
                                    )
                                }
                            })
                            scanSections(section.subsections)
                        }

                        // Scan actions
                        if (section.actions) {
                            section.actions.forEach((action) => {
                                if (action.description) {
                                    scanTextForRules(
                                        action.description,
                                        action.name,
                                        `${section.id}-${action.name}`
                                    )
                                }
                            })
                        }

                        // Scan other content types
                        if (section.types) {
                            section.types.forEach((type) => {
                                if (type.description) {
                                    scanTextForRules(
                                        type.description,
                                        type.name,
                                        `${section.id}-${type.name}`
                                    )
                                }
                            })
                        }

                        if (section.conditions) {
                            section.conditions.forEach((condition) => {
                                if (condition.description) {
                                    scanTextForRules(
                                        condition.description,
                                        condition.name,
                                        `${section.id}-${condition.name}`
                                    )
                                }
                            })
                        }
                    })
                }

                scanSections(mainData.sections)
                results.categoryAnalysis.set(categoryKey, categoryResults)
            }
        )

        // Find rules that should be referenced but aren't
        allReferenceIds.forEach((ruleId) => {
            const sourceSections = sourceMap.get(ruleId) || []
            let foundReferences = 0

            results.categoryAnalysis.forEach((categoryResults, categoryKey) => {
                if (categoryResults.existingRuleRefs.has(ruleId)) {
                    foundReferences++
                }
            })

            // If a rule has sources but no references elsewhere, it might need more linking
            if (sourceSections.length > 0 && foundReferences === 0) {
                results.missingRuleReferences.push({
                    ruleId,
                    sources: sourceSections,
                    suggestion:
                        "This rule is defined but not referenced elsewhere",
                })
            }
        })

        setAnalysisResults(results)
    }

    // Generate systematic categorization recommendations
    const generateRecommendations = () => {
        if (!analysisResults) return []

        const recommendations = []

        // Recommend @RuleName additions
        analysisResults.categoryAnalysis.forEach(
            (categoryResults, categoryKey) => {
                categoryResults.textContent.forEach(
                    ({ text, sectionTitle, sectionId }) => {
                        // Look for common game terms that might need @RuleName tags
                        const gameTerms = [
                            "body",
                            "agility",
                            "focus",
                            "fate",
                            "attack",
                            "dodge",
                            "brace",
                            "damage",
                            "advantage",
                            "disadvantage",
                            "insight",
                            "power",
                            "cast",
                            "gather",
                            "hit points",
                            "death",
                            "rest",
                        ]

                        gameTerms.forEach((term) => {
                            const regex = new RegExp(`\\b${term}\\b`, "gi")
                            const matches = text.match(regex)
                            if (
                                matches &&
                                !text.includes(
                                    `@${
                                        term.charAt(0).toUpperCase() +
                                        term.slice(1)
                                    }`
                                )
                            ) {
                                recommendations.push({
                                    type: "add-rule-tag",
                                    category: categoryKey,
                                    section: sectionTitle,
                                    term,
                                    suggestion: `Consider adding @${
                                        term.charAt(0).toUpperCase() +
                                        term.slice(1)
                                    } tag`,
                                    context: text,
                                })
                            }
                        })
                    }
                )
            }
        )

        return recommendations.slice(0, 50) // Limit to first 50 recommendations
    }

    if (loading) return <Container>Loading categorizer...</Container>
    if (error) return <Alert severity='error'>Error: {error}</Alert>

    return (
        <Container maxWidth='lg' sx={{ py: 4 }}>
            <Typography variant='h3' component='h1' gutterBottom>
                Rule Categorization System
            </Typography>

            <Typography variant='body1' sx={{ mb: 4 }}>
                This tool systematically analyzes your content to identify where
                @RuleName tags should be added and helps ensure consistent rule
                categorization across your website.
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Button
                    variant='contained'
                    onClick={analyzeContent}
                    disabled={loading}
                >
                    Analyze Content for Rule References
                </Button>
            </Box>

            {analysisResults && (
                <>
                    {/* Summary */}
                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Typography variant='h5' gutterBottom>
                            Analysis Summary
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            <Chip
                                label={`${analysisResults.potentialNewRules.length} Potential New Rules`}
                                color='warning'
                                variant='outlined'
                            />
                            <Chip
                                label={`${analysisResults.missingRuleReferences.length} Under-referenced Rules`}
                                color='info'
                                variant='outlined'
                            />
                            <Chip
                                label={`${analysisResults.categoryAnalysis.size} Categories Analyzed`}
                                color='success'
                                variant='outlined'
                            />
                        </Box>
                    </Paper>

                    {/* Potential New Rules */}
                    {analysisResults.potentialNewRules.length > 0 && (
                        <Accordion sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='h6'>
                                    Potential New Rules (
                                    {analysisResults.potentialNewRules.length})
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Alert severity='info' sx={{ mb: 2 }}>
                                    These @RuleName references were found in
                                    content but don't exist in the reference
                                    database. Consider adding them to
                                    rules-database.json.
                                </Alert>
                                <List>
                                    {analysisResults.potentialNewRules.map(
                                        (item, index) => (
                                            <ListItem key={index}>
                                                <Card
                                                    variant='outlined'
                                                    sx={{ width: "100%" }}
                                                >
                                                    <CardContent>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                mb: 1,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant='h6'
                                                                color='primary'
                                                            >
                                                                {item.ruleName}
                                                            </Typography>
                                                            <Chip
                                                                label={
                                                                    item.category
                                                                }
                                                                size='small'
                                                            />
                                                        </Box>
                                                        <Typography
                                                            variant='body2'
                                                            color='text.secondary'
                                                            gutterBottom
                                                        >
                                                            Found in:{" "}
                                                            {item.section}
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            sx={{
                                                                fontFamily:
                                                                    "monospace",
                                                            }}
                                                        >
                                                            Context: "...
                                                            {item.context}..."
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )}

                    {/* Category Analysis */}
                    <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6'>
                                Category Analysis
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {Array.from(
                                analysisResults.categoryAnalysis.entries()
                            ).map(([category, results]) => (
                                <Card
                                    key={category}
                                    variant='outlined'
                                    sx={{ mb: 2 }}
                                >
                                    <CardContent>
                                        <Typography variant='h6' gutterBottom>
                                            {rulesData.database?.categories?.[
                                                category
                                            ]?.title || category}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 1,
                                                flexWrap: "wrap",
                                                mb: 2,
                                            }}
                                        >
                                            <Chip
                                                label={`${results.existingRuleRefs.size} Rule References`}
                                                size='small'
                                                color='success'
                                            />
                                            <Chip
                                                label={`${results.missingRuleRefs.size} Missing Rules`}
                                                size='small'
                                                color='warning'
                                            />
                                        </Box>

                                        {results.existingRuleRefs.size > 0 && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography
                                                    variant='subtitle2'
                                                    gutterBottom
                                                >
                                                    Current Rule References:
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {Array.from(
                                                        results.existingRuleRefs
                                                    ).map((ruleRef) => (
                                                        <Chip
                                                            key={ruleRef}
                                                            label={ruleRef}
                                                            size='small'
                                                            variant='outlined'
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    {/* Recommendations */}
                    <Paper sx={{ p: 3, mt: 4 }}>
                        <Typography variant='h5' gutterBottom>
                            Systematization Recommendations
                        </Typography>
                        <Button
                            variant='outlined'
                            onClick={() => {
                                const recs = generateRecommendations()
                                console.log("Generated recommendations:", recs)
                                alert(
                                    `Generated ${recs.length} recommendations. Check console for details.`
                                )
                            }}
                        >
                            Generate Recommendations
                        </Button>
                        <Typography variant='body2' sx={{ mt: 2 }}>
                            This will analyze your content and suggest where
                            @RuleName tags should be added for consistent
                            categorization across your site.
                        </Typography>
                    </Paper>
                </>
            )}
        </Container>
    )
}

export default RuleCategorizer
