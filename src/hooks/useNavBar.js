'use client'
import { useContext, useMemo, useState } from 'react'
import { SideBarContext } from '@/context/SideBarContext'

import {
    TruckIcon,
    DocumentChartBarIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'


const useNavBar = (props) => {
    const { mobileMenuOpen, setMobileMenuOpen } = useContext(SideBarContext)
    const currentNavBarOpts = useMemo(() => {
        return [
            { name: 'Ruta 1', href: '/testroute1', icon: HomeIcon},
            { name: 'Ruta 2', href: '/testroute2', icon: DocumentChartBarIcon},
            { name: 'Ruta 3', href: '/testroute3', icon: TruckIcon},

        ]
    }, [])
    return { currentNavBarOpts, mobileMenuOpen, setMobileMenuOpen }
}

export default useNavBar