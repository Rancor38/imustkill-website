import { useState, useEffect, useMemo } from "react"

// Hook for managing all rules data and search functionality
export const useRulesEngine = () => {
    const [rulesData, setRulesData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Load all rules data on mount
    useEffect(() => {
        const loadRulesData = async () => {
            try {
                setLoading(true)

                // Load the main rules database first
                const rulesDbResponse = await fetch("/rules-database.json")
                const rulesDb = await rulesDbResponse.json()

                // Load all referenced files
                const dataPromises = Object.entries(
                    rulesDb.rulesDatabase.categories
                ).map(async ([key, category]) => {
                    const response = await fetch(`/${category.file}`)
                    const data = await response.json()
                    return [key, data]
                })

                const loadedData = await Promise.all(dataPromises)
                const rulesData = {
                    database: rulesDb.rulesDatabase,
                    ...Object.fromEntries(loadedData),
                }

                setRulesData(rulesData)
                setError(null)
            } catch (err) {
                console.error("Error loading rules data:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadRulesData()
    }, [])

    // Create searchable content from all rules data
    const searchableContent = useMemo(() => {
        if (!rulesData.database) return []

        const content = []

        // Add quick reference content
        if (rulesData.database.quickReference) {
            Object.entries(rulesData.database.quickReference).forEach(
                ([category, items]) => {
                    items.forEach((item) => {
                        content.push({
                            type: "quick-reference",
                            category: category,
                            title: item.term || item.stat || item.type,
                            description:
                                item.description ||
                                item.uses?.join(", ") ||
                                item.effective_against,
                            keywords: item.keywords || [],
                            path: "/quick-reference",
                            section: item.term || item.stat || item.type,
                        })
                    })
                }
            )
        }

        // Add content from each rules category
        Object.entries(rulesData.database.categories).forEach(
            ([categoryKey, categoryInfo]) => {
                const categoryData = rulesData[categoryKey]
                if (!categoryData) return

                const mainData = Object.values(categoryData)[0] // Get the main object (characterCreation, combatMechanics, etc.)
                if (!mainData?.sections) return

                mainData.sections.forEach((section) => {
                    // Add main section
                    content.push({
                        type: "rule-section",
                        category: categoryKey,
                        title: section.title,
                        description: section.description || "",
                        keywords: section.keywords || [],
                        path: `/${categoryKey}`,
                        section: section.title,
                        id: section.id,
                    })

                    // Add subsections
                    if (section.subsections) {
                        section.subsections.forEach((subsection) => {
                            content.push({
                                type: "rule-subsection",
                                category: categoryKey,
                                title: subsection.title,
                                description: subsection.description || "",
                                keywords: subsection.keywords || [],
                                path: `/${categoryKey}`,
                                section: subsection.title,
                                id: subsection.id,
                            })
                        })
                    }

                    // Add actions (for combat mechanics)
                    if (section.actions) {
                        section.actions.forEach((action) => {
                            content.push({
                                type: "combat-action",
                                category: categoryKey,
                                title: action.name,
                                description: action.description,
                                keywords: action.keywords || [],
                                path: `/${categoryKey}`,
                                section: action.name,
                                id: action.name
                                    .toLowerCase()
                                    .replace(/\s+/g, "-"),
                            })
                        })
                    }

                    // Add damage types
                    if (section.types) {
                        section.types.forEach((type) => {
                            content.push({
                                type: "damage-type",
                                category: categoryKey,
                                title: type.name,
                                description: type.description,
                                keywords: type.keywords || [],
                                path: `/${categoryKey}`,
                                section: type.name,
                                examples: type.examples || [],
                            })
                        })
                    }

                    // Add conditions/statuses
                    if (section.conditions) {
                        section.conditions.forEach((condition) => {
                            content.push({
                                type: "status-condition",
                                category: categoryKey,
                                title: condition.name,
                                description: condition.description,
                                keywords: condition.keywords || [],
                                path: `/${categoryKey}`,
                                section: condition.name,
                            })
                        })
                    }

                    // Add equipment
                    if (section.equipment) {
                        section.equipment.forEach((item) => {
                            content.push({
                                type: "equipment-rule",
                                category: categoryKey,
                                title: item.name,
                                description: item.effect,
                                keywords: item.keywords || [],
                                path: `/${categoryKey}`,
                                section: item.name,
                            })
                        })
                    }

                    // Add phases (for running the game)
                    if (section.phases) {
                        section.phases.forEach((phase) => {
                            content.push({
                                type: "hunt-phase",
                                category: categoryKey,
                                title: phase.name,
                                description: phase.description,
                                keywords: [
                                    ...(section.keywords || []),
                                    phase.name.toLowerCase(),
                                ],
                                path: `/${categoryKey}`,
                                section: phase.name,
                            })
                        })
                    }
                })
            }
        )

        return content
    }, [rulesData])

    // Search function
    const search = (query) => {
        if (!query.trim()) return []

        const searchTerms = query.toLowerCase().trim().split(/\s+/)
        const results = []

        searchableContent.forEach((item) => {
            const searchText = `${item.title} ${
                item.description
            } ${item.keywords.join(" ")}`.toLowerCase()

            // Check if all search terms are present
            const matchesAllTerms = searchTerms.every((term) =>
                searchText.includes(term)
            )

            if (matchesAllTerms) {
                // Calculate relevance score
                let score = 0

                // Title matches get highest score
                if (item.title.toLowerCase().includes(query.toLowerCase())) {
                    score += 10
                }

                // Keyword matches get medium score
                const keywordMatches = item.keywords.filter((keyword) =>
                    keyword.toLowerCase().includes(query.toLowerCase())
                ).length
                score += keywordMatches * 5

                // Description matches get lower score
                if (
                    item.description.toLowerCase().includes(query.toLowerCase())
                ) {
                    score += 2
                }

                results.push({ ...item, relevanceScore: score })
            }
        })

        // Sort by relevance score, then alphabetically
        return results
            .sort((a, b) => {
                if (b.relevanceScore !== a.relevanceScore) {
                    return b.relevanceScore - a.relevanceScore
                }
                return a.title.localeCompare(b.title)
            })
            .slice(0, 20) // Limit to top 20 results
    }

    // Get specific rule data
    const getRule = (category, sectionId) => {
        const categoryData = rulesData[category]
        if (!categoryData) return null

        const mainData = Object.values(categoryData)[0]
        if (!mainData?.sections) return null

        return mainData.sections.find((section) => section.id === sectionId)
    }

    // Get all rules for a category
    const getCategoryRules = (category) => {
        const categoryData = rulesData[category]
        if (!categoryData) return null

        return Object.values(categoryData)[0]
    }

    // Get keyword suggestions for search
    const getKeywordSuggestions = (partialQuery) => {
        if (!partialQuery || partialQuery.length < 2) return []

        const suggestions = new Set()
        const query = partialQuery.toLowerCase()

        searchableContent.forEach((item) => {
            // Check title
            if (item.title.toLowerCase().includes(query)) {
                suggestions.add(item.title)
            }

            // Check keywords
            item.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(query)) {
                    suggestions.add(keyword)
                }
            })
        })

        return Array.from(suggestions).slice(0, 10)
    }

    // Get source information for rules
    const getSourceMap = () => {
        if (!rulesData.database) return new Map()

        const sourceMap = new Map()

        Object.keys(rulesData.database.categories || {}).forEach(
            (categoryKey) => {
                const categoryData = rulesData[categoryKey]
                if (!categoryData) return

                const mainData = Object.values(categoryData)[0]
                if (!mainData?.sections) return

                const scanSections = (sections) => {
                    sections.forEach((section) => {
                        if (section["%Source"]) {
                            section["%Source"].forEach((ruleName) => {
                                if (!sourceMap.has(ruleName)) {
                                    sourceMap.set(ruleName, [])
                                }
                                sourceMap.get(ruleName).push({
                                    category: categoryKey,
                                    categoryTitle:
                                        rulesData.database.categories[
                                            categoryKey
                                        ]?.title,
                                    sectionId: section.id,
                                    sectionTitle: section.title,
                                    description: section.description || "",
                                    path: `/${categoryKey}#${section.id}`,
                                })
                            })
                        }

                        // Recursively scan subsections
                        if (section.subsections) {
                            scanSections(section.subsections)
                        }
                    })
                }

                scanSections(mainData.sections)
            }
        )

        return sourceMap
    }

    // Get uncategorized rules (exist in referenceIds but no %Source)
    const getUncategorizedRules = () => {
        if (!rulesData.database) return []

        const sourceMap = getSourceMap()
        const allReferenceIds = Object.keys(
            rulesData.database.referenceIds || {}
        )
        const sourcedRules = new Set(sourceMap.keys())

        return allReferenceIds.filter((refId) => !sourcedRules.has(refId))
    }

    return {
        searchableContent,
        search,
        getRule,
        getCategoryRules,
        getSourceMap,
        getUncategorizedRules,
        rulesData,
        loading,
        error,
    }
}

// Export the hook as default
export default useRulesEngine
