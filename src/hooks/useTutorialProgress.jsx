import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './useAuth';

export const useTutorialProgress = () => {
  const { user } = useAuth();
  const [completedTutorials, setCompletedTutorials] = useState([]);
  const [inProgressTutorials, setInProgressTutorials] = useState([]);
  
  // Load progress from localStorage only once when user changes
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      try {
        const storedCompleted = localStorage.getItem(`completedTutorials_${userId}`);
        const storedInProgress = localStorage.getItem(`inProgressTutorials_${userId}`);
        
        if (storedCompleted) {
          setCompletedTutorials(JSON.parse(storedCompleted));
        }
        
        if (storedInProgress) {
          setInProgressTutorials(JSON.parse(storedInProgress));
        }
      } catch (error) {
        console.error('Error loading tutorial progress data:', error);
        // Reset progress data if there's an error
        setCompletedTutorials([]);
        setInProgressTutorials([]);
      }
    } else {
      // Reset when user logs out
      setCompletedTutorials([]);
      setInProgressTutorials([]);
    }
  }, [user]);
  
  // Debounced saving to localStorage to prevent excessive writes
  useEffect(() => {
    if (!user) return;
    
    const userId = user.uid;
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(`completedTutorials_${userId}`, JSON.stringify(completedTutorials));
        localStorage.setItem(`inProgressTutorials_${userId}`, JSON.stringify(inProgressTutorials));
      } catch (error) {
        console.error('Error saving tutorial progress data:', error);
      }
    }, 300); // Debounce time
    
    return () => clearTimeout(saveTimeout);
  }, [completedTutorials, inProgressTutorials, user]);
  
  // Mark a tutorial as started/in progress
  const startTutorial = useCallback((tutorialId) => {
    if (!user) return;
    
    setInProgressTutorials(prev => {
      if (prev.includes(tutorialId)) return prev;
      return [...prev, tutorialId];
    });
  }, [user]);
  
  // Mark a tutorial as completed
  const completeTutorial = useCallback((tutorialId) => {
    if (!user) return;
    
    // Update completed tutorials
    setCompletedTutorials(prev => {
      if (prev.includes(tutorialId)) return prev;
      const newCompleted = [...prev, tutorialId];
      
      // Immediately save to localStorage
      try {
        localStorage.setItem(`completedTutorials_${user.uid}`, JSON.stringify(newCompleted));
      } catch (error) {
        console.error('Error saving completed tutorials:', error);
      }
      
      return newCompleted;
    });
    
    // Remove from in-progress if it's there
    setInProgressTutorials(prev => {
      const filtered = prev.filter(id => id !== tutorialId);
      
      // Immediately save to localStorage
      try {
        localStorage.setItem(`inProgressTutorials_${user.uid}`, JSON.stringify(filtered));
      } catch (error) {
        console.error('Error saving in-progress tutorials:', error);
      }
      
      return filtered;
    });
  }, [user]);
  
  // Check if a tutorial is completed - memoized for performance
  const isTutorialCompleted = useCallback((tutorialId) => {
    return completedTutorials.includes(tutorialId);
  }, [completedTutorials]);
  
  // Check if a tutorial is in progress - memoized for performance
  const isTutorialInProgress = useCallback((tutorialId) => {
    return inProgressTutorials.includes(tutorialId);
  }, [inProgressTutorials]);
  
  // Get progress percentage - memoized for performance
  const getTutorialProgressPercentage = useCallback((totalTutorials) => {
    // Always read from localStorage to get the most up-to-date value
    if (user && totalTutorials > 0) {
      try {
        const storedCompleted = localStorage.getItem(`completedTutorials_${user.uid}`);
        if (storedCompleted) {
          const completedCount = JSON.parse(storedCompleted).length;
          return Math.round((completedCount / totalTutorials) * 100);
        }
      } catch (error) {
        console.error('Error reading completed tutorials for progress calculation:', error);
      }
    }
    
    // Fallback to state-based calculation
    return totalTutorials > 0 
      ? Math.round((completedTutorials.length / totalTutorials) * 100) 
      : 0;
  }, [user, completedTutorials.length]);
  
  // Return memoized object to prevent unnecessary re-renders
  return useMemo(() => ({
    completedTutorials,
    inProgressTutorials,
    startTutorial,
    completeTutorial,
    isTutorialCompleted,
    isTutorialInProgress,
    getTutorialProgressPercentage
  }), [
    completedTutorials,
    inProgressTutorials,
    startTutorial,
    completeTutorial,
    isTutorialCompleted,
    isTutorialInProgress,
    getTutorialProgressPercentage
  ]);
};

export default useTutorialProgress; 