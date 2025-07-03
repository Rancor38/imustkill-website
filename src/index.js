import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import AppWrapper from "./AppWrapper" // Import AppWrapper
import reportWebVitals from "./reportWebVitals"

// IMMEDIATE ResizeObserver error suppression - must happen before any other code
;(() => {
    const originalError = window.console.error
    window.console.error = (...args) => {
        const firstArg = args[0]
        if (
            typeof firstArg === "string" &&
            (firstArg.includes(
                "ResizeObserver loop completed with undelivered notifications"
            ) ||
                firstArg.includes("ResizeObserver loop limit exceeded") ||
                firstArg.includes("ResizeObserver"))
        ) {
            return
        }
        originalError.apply(window.console, args)
    }
})()

// Comprehensive ResizeObserver error suppression
const originalError = console.error
const originalWarn = console.warn

// Suppress ResizeObserver errors in console.error
console.error = (...args) => {
    const message = args[0]
    if (
        message &&
        typeof message === "string" &&
        (message.includes(
            "ResizeObserver loop completed with undelivered notifications"
        ) ||
            message.includes("ResizeObserver loop limit exceeded") ||
            message.includes("ResizeObserver"))
    ) {
        return // Suppress these specific errors
    }
    originalError(...args)
}

// Suppress ResizeObserver warnings in console.warn
console.warn = (...args) => {
    const message = args[0]
    if (
        message &&
        typeof message === "string" &&
        (message.includes(
            "ResizeObserver loop completed with undelivered notifications"
        ) ||
            message.includes("ResizeObserver loop limit exceeded") ||
            message.includes("ResizeObserver"))
    ) {
        return // Suppress these specific warnings
    }
    originalWarn(...args)
}

// Handle window-level errors with more aggressive suppression
window.addEventListener(
    "error",
    (e) => {
        if (
            e.message &&
            (e.message.includes(
                "ResizeObserver loop completed with undelivered notifications"
            ) ||
                e.message.includes("ResizeObserver loop limit exceeded") ||
                e.message.includes("ResizeObserver"))
        ) {
            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation()
            }
            e.preventDefault()
            return false
        }
    },
    true
) // Use capture phase

// Handle unhandled promise rejections that might contain ResizeObserver errors
window.addEventListener("unhandledrejection", (e) => {
    if (
        e.reason &&
        e.reason.message &&
        (e.reason.message.includes(
            "ResizeObserver loop completed with undelivered notifications"
        ) ||
            e.reason.message.includes("ResizeObserver loop limit exceeded") ||
            e.reason.message.includes("ResizeObserver"))
    ) {
        e.preventDefault()
        return false
    }
})

// Additional global error handler
window.onerror = function (message, source, lineno, colno, error) {
    if (
        message &&
        typeof message === "string" &&
        (message.includes(
            "ResizeObserver loop completed with undelivered notifications"
        ) ||
            message.includes("ResizeObserver loop limit exceeded") ||
            message.includes("ResizeObserver"))
    ) {
        return true // Prevent default handling
    }
    return false
}

// Override React's error logging for ResizeObserver errors
const originalReactError =
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.onCommitFiberRoot
if (originalReactError) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function (
        ...args
    ) {
        try {
            return originalReactError.apply(this, args)
        } catch (e) {
            if (e.message && e.message.includes("ResizeObserver")) {
                return // Suppress ResizeObserver errors in React DevTools
            }
            throw e
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Router>
        <AppWrapper /> {/* Use AppWrapper instead of App */}
    </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
