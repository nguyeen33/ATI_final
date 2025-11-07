'use client';

import { MatchingQuestion as MatchingQuestionType } from '@/types/test-exam/mock-test';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Props {
  id: string;
  question: string;
  pairs: Array<{
    item: string;
    match: string;
  }>;
  onAnswer: (id: string, value: string) => void;
  selectedAnswers?: string;
}

export function MatchingQuestion({
  id,
  question,
  pairs,
  onAnswer,
  selectedAnswers = ''
}: Props) {
  const [matches, setMatches] = useState<Record<string, string>>(
    () => {
      const selected = selectedAnswers.split(',').filter(Boolean);
      return pairs.reduce((acc, _, index) => {
        if (selected[index]) {
          const [item, match] = selected[index].split('::');
          acc[item] = match;
        }
        return acc;
      }, {} as Record<string, string>);
    }
  );

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleMatchClick = (match: string) => {
    if (selectedItem) {
      const newMatches = { ...matches };
      
      // Remove any existing match for the selected item
      Object.keys(newMatches).forEach(key => {
        if (newMatches[key] === match) {
          delete newMatches[key];
        }
      });
      
      // Add the new match
      newMatches[selectedItem] = match;
      setMatches(newMatches);
      setSelectedItem(null);

      // Convert matches to string format for saving
      const matchString = pairs
        .map(({ item }) => item in newMatches ? `${item}::${newMatches[item]}` : '')
        .join(',');
      onAnswer(id, matchString);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-4">{question}</h3>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          {pairs.map(({ item }) => (
            <Button
              key={item}
              variant={selectedItem === item ? "secondary" : "outline"}
              className="w-full justify-start"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          {pairs.map(({ match }) => (
            <Button
              key={match}
              variant="outline"
              className={`w-full justify-start ${
                Object.values(matches).includes(match)
                  ? "bg-primary/10"
                  : ""
              }`}
              onClick={() => handleMatchClick(match)}
              disabled={!selectedItem}
            >
              {match}
            </Button>
          ))}
        </div>
      </div>

      {selectedItem && (
        <p className="mt-4 text-sm text-muted-foreground">
          Select a match for: {selectedItem}
        </p>
      )}
    </div>
  );
}