'use client';

import { Share2, BookOpen, TrendingUp } from 'lucide-react';
import { EducationSnippet } from '@/lib/types';
import { Card } from './Card';
import { Button } from './Button';

interface EducationSnippetCardProps {
  snippet: EducationSnippet;
  onShare: (snippet: EducationSnippet) => void;
}

export function EducationSnippetCard({ snippet, onShare }: EducationSnippetCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{snippet.title}</h3>
              <p className="text-sm text-white/70">{snippet.category}</p>
            </div>
          </div>
        </div>
        
        <p className="text-white/80 text-sm leading-relaxed">
          {snippet.content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{snippet.shareCount} shares</span>
            </div>
            <div className="flex gap-1">
              {snippet.tags.map((tag, index) => (
                <span key={index} className="bg-white/10 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onShare(snippet)}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}
