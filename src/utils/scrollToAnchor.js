/**
 * Utility function to scroll to an anchor element with proper offset
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Additional offset from the top (default: 80px for header)
 */
export const scrollToAnchor = (elementId, offset = 80) => {
    const element = document.getElementById(elementId)
    if (element) {
        const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        })
    }
}

/**
 * Hook to handle automatic scrolling to anchor from URL hash
 * @param {boolean} dataLoaded - Whether the page data has finished loading
 * @param {string} hash - The current URL hash
 */
export const useScrollToAnchor = (dataLoaded, hash) => {
    const scrollToHash = () => {
        if (dataLoaded && hash) {
            // Wait a bit for the DOM to be fully rendered
            const timer = setTimeout(() => {
                const elementId = hash.substring(1) // Remove the '#'
                scrollToAnchor(elementId)
            }, 100)

            return () => clearTimeout(timer)
        }
    }

    return scrollToHash
}
