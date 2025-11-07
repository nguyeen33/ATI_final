'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface WritingSectionProps {
  prompt: string;
  taskNumber: number;
  onSave: (content: string, wordCount: number) => void;
  initialContent?: string;
  minWords?: number;
}

export function WritingSection({
  prompt,
  taskNumber,
  onSave,
  initialContent = '',
  minWords = 250,
}: WritingSectionProps) {
  const [content, setContent] = useState(initialContent);
  const [wordCount, setWordCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSave = () => {
    onSave(content, wordCount);
    setLastSaved(new Date());
  };

  const getWordCountColor = () => {
    if (wordCount < minWords) {
      return 'text-destructive';
    }
    if (wordCount > minWords * 1.1) {
      return 'text-warning';
    }
    return 'text-success';
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Writing Task {taskNumber}</h3>
        <div className="prose dark:prose-invert max-w-none mb-4">
          {prompt}
        </div>
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing here..."
        className="min-h-[300px] mb-4"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={`text-sm ${getWordCountColor()}`}>
            Words: {wordCount} / {minWords}
          </span>
          {lastSaved && (
            <span className="text-sm text-muted-foreground">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        <Button onClick={handleSave} className="ml-auto">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </Card>
  );
}