'use client'
import { createContext, useState } from "react";

const SideBarContext = createContext({ mobileMenuOpen: false })

const SideBarProvider = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <SideBarContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
            {children}
        </SideBarContext.Provider>
    )
}

export { SideBarContext, SideBarProvider }