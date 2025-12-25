import { HistoryItem } from '../types';

// In-memory storage (can be replaced with a database)
const historyStore: HistoryItem[] = [];

export function addHistoryItem(item: Omit<HistoryItem, 'id' | 'createdAt'>): HistoryItem {
  const newItem: HistoryItem = {
    ...item,
    id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    createdAt: new Date().toISOString()
  };
  
  historyStore.push(newItem);
  
  // Keep only last 100 items to prevent memory issues
  if (historyStore.length > 100) {
    historyStore.shift();
  }
  
  return newItem;
}

export function getHistoryItems(userId?: string): HistoryItem[] {
  if (userId) {
    return historyStore.filter(item => item.userId === userId);
  }
  return [...historyStore].reverse(); // Return most recent first
}

export function getHistoryItemById(id: string): HistoryItem | undefined {
  return historyStore.find(item => item.id === id);
}


