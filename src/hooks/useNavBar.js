'use client'
import { useContext, useMemo, useState } from 'react'
// import { UserContext } from '@/globalContexts/UserContext/Context'
import { SideBarContext } from '@/context/SideBarContext'

import {
    CogIcon,
    DocumentChartBarIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'
import {
    ClockIcon,
    CreditCardIcon,
    ScaleIcon,
    UserGroupIcon,
    TruckIcon,
    DocumentCheckIcon,
    KeyIcon
} from '@heroicons/react/24/outline'


const useNavBar = (props) => {
    const { mobileMenuOpen, setMobileMenuOpen } = useContext(SideBarContext)
    const currentNavBarOpts = useMemo(() => {
        return [
            { name: 'Ruta 1', href: '/testroute1', icon: HomeIcon, idType: 99 },
            { name: 'Ruta 2', href: '/testroute2', icon: DocumentChartBarIcon, idType: 99 },
            { name: 'Ruta 3', href: '/testroute3', icon: TruckIcon, idType: 99 },

        ]
    }, [])
    return { currentNavBarOpts, mobileMenuOpen, setMobileMenuOpen }
}

export default useNavBar