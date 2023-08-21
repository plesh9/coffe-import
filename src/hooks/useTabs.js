import { useState } from "react";

export const useTabs = (tabs, current=1) => {
    const [currentTab, setCurrentTab] = useState(current)

    const handleTabLClick = (e) => {
        setCurrentTab(+e.currentTarget.id)
    }

    return {handleTabLClick, currentTab}
}