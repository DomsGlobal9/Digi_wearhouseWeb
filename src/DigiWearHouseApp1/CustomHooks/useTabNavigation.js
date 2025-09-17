
// hooks/useTabNavigation.js
import { useState } from 'react';

 export const useTabNavigation = (tabs, initialTab = null) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id);

  const goToNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
    return currentIndex > 0;
  };

  const isFirstTab = tabs.findIndex(tab => tab.id === activeTab) === 0;
  const isLastTab = tabs.findIndex(tab => tab.id === activeTab) === tabs.length - 1;

  return {
    activeTab,
    setActiveTab,
    goToNextTab,
    goToPreviousTab,
    isFirstTab,
    isLastTab
  };
};

// export default  useTabNavigation