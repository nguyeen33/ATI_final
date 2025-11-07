'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

import { ListeningTask } from '@/types/test-exam';

interface ListeningSectionProps {
  title: string;
  audioUrl: string;
  maxPlays: number;
  onPlayComplete?: () => void;
  task?: ListeningTask;
  onAnswer?: (questionId: string, answer: string) => void;
  answers?: Record<string, any>;
}

export function ListeningSection({
  title,
  audioUrl,
  maxPlays,
  onPlayComplete,
  task,
  onAnswer,
  answers = {}
}: ListeningSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setPlayCount(prev => prev + 1);
        if (onPlayComplete) {
          onPlayComplete();
        }
      });
    }
  }, [onPlayComplete]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else if (playCount < maxPlays) {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0];
      setVolume(value[0]);
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Plays remaining: {maxPlays - playCount}
        </p>
      </div>

      <audio ref={audioRef} src={audioUrl} />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={togglePlay}
            disabled={playCount >= maxPlays && !isPlaying}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              disabled={playCount >= maxPlays}
            />
          </div>
          
          <span className="text-sm tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-[100px]"
          />
        </div>
      </div>
    </Card>
  );
}