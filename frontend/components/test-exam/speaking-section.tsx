'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Save } from 'lucide-react';

interface SpeakingSectionProps {
  prompt: string;
  preparationTime?: number;
  speakingTime?: number;
  onRecordingComplete: (audioBlob: Blob) => void;
}

export function SpeakingSection({
  prompt,
  preparationTime = 60,
  speakingTime = 120,
  onRecordingComplete
}: SpeakingSectionProps) {
  const [isPreparationMode, setIsPreparationMode] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(preparationTime);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeRemaining > 0 && (isPreparationMode || isRecording)) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (isPreparationMode) {
              setIsPreparationMode(false);
              setTimeRemaining(speakingTime);
              startRecording();
            } else if (isRecording) {
              stopRecording();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [timeRemaining, isPreparationMode, isRecording, speakingTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedChunks(chunks);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeRemaining(speakingTime);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isPreparationMode ? 'Preparation Time' : 'Speaking Time'}
        </h3>
        <div className="prose dark:prose-invert max-w-none mb-4">
          {prompt}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-mono">
            {formatTime(timeRemaining)}
          </div>
          
          <div className="space-x-2">
            {!isPreparationMode && !isRecording && audioUrl && (
              <Button onClick={playRecording}>
                <Play className="h-4 w-4 mr-2" />
                Play Recording
              </Button>
            )}
            
            {isRecording ? (
              <Button variant="destructive" onClick={stopRecording}>
                <Square className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            ) : !audioUrl && !isPreparationMode && (
              <Button onClick={startRecording}>
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            )}
          </div>
        </div>

        {isPreparationMode && (
          <p className="text-sm text-muted-foreground">
            Use this time to prepare your answer. Recording will start automatically
            when preparation time ends.
          </p>
        )}

        {isRecording && (
          <div className="flex items-center gap-2 text-destructive">
            <span className="animate-pulse">●</span>
            <span>Recording in progress</span>
          </div>
        )}

        {audioUrl && (
          <div className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              Recording saved
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}