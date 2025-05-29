import React, { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import "./Container.css"

function Container({ children }) {
    const { isDarkTheme } = useContext(ThemeContext)
    return (
        <div className={`container ${!isDarkTheme ? "light-theme" : ""}`}>
            {children}
        </div>
    )
}

export default Container
