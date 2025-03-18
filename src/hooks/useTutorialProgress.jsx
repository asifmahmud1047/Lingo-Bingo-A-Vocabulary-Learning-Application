import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useTutorialProgress = () => {
  const { user } = useAuth();
  const [completedTutorials, setCompletedTutorials] = useState([]);
  const [inProgressTutorials, setInProgressTutorials] = useState([]);
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const storedCompleted = localStorage.getItem(`completedTutorials_${userId}`);
      const storedInProgress = localStorage.getItem(`inProgressTutorials_${userId}`);
      
      if (storedCompleted) {
        setCompletedTutorials(JSON.parse(storedCompleted));
      }
      
      if (storedInProgress) {
        setInProgressTutorials(JSON.parse(storedInProgress));
      }
    }
  }, [user]);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      localStorage.setItem(`completedTutorials_${userId}`, JSON.stringify(completedTutorials));
      localStorage.setItem(`inProgressTutorials_${userId}`, JSON.stringify(inProgressTutorials));
    }
  }, [completedTutorials, inProgressTutorials, user]);
  
  // Mark a tutorial as started/in progress
  const startTutorial = (tutorialId) => {
    if (!inProgressTutorials.includes(tutorialId)) {
      setInProgressTutorials([...inProgressTutorials, tutorialId]);
    }
  };
  
  // Mark a tutorial as completed
  const completeTutorial = (tutorialId) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials([...completedTutorials, tutorialId]);
    }
    
    // Remove from in-progress if it's there
    setInProgressTutorials(inProgressTutorials.filter(id => id !== tutorialId));
  };
  
  // Check if a tutorial is completed
  const isTutorialCompleted = (tutorialId) => {
    return completedTutorials.includes(tutorialId);
  };
  
  // Check if a tutorial is in progress
  const isTutorialInProgress = (tutorialId) => {
    return inProgressTutorials.includes(tutorialId);
  };
  
  // Get progress percentage
  const getTutorialProgressPercentage = (totalTutorials) => {
    return totalTutorials > 0 
      ? Math.round((completedTutorials.length / totalTutorials) * 100) 
      : 0;
  };
  
  return {
    completedTutorials,
    inProgressTutorials,
    startTutorial,
    completeTutorial,
    isTutorialCompleted,
    isTutorialInProgress,
    getTutorialProgressPercentage
  };
};

export default useTutorialProgress; 