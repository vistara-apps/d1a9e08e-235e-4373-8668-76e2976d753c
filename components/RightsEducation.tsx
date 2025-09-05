'use client';

import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';
import { educationSnippets, categories } from '@/lib/data';
import { EducationSnippet } from '@/lib/types';
import { Share2, BookOpen, TrendingUp, Heart } from 'lucide-react';
import { shareContent } from '@/lib/utils';

export function RightsEducation() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedSnippets, setLikedSnippets] = useState<Set<string>>(new Set());

  const filteredSnippets = educationSnippets.filter(snippet => {
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (snippetId: string) => {
    const newLiked = new Set(likedSnippets);
    if (newLiked.has(snippetId)) {
      newLiked.delete(snippetId);
    } else {
      newLiked.add(snippetId);
    }
    setLikedSnippets(newLiked);
  };

  const handleShare = (snippet: EducationSnippet) => {
    shareContent(
      `Did You Know? ${snippet.title}`,
      snippet.content,
      window.location.href
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'criminal law': return '⚖️';
      case 'employment': return '💼';
      case 'housing': return '🏠';
      case 'consumer': return '🛒';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '📚';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Rights Education</h2>
        <p className="text-purple-300">Bite-sized legal knowledge to empower you</p>
      </div>

      <SearchBar 
        placeholder="Search education content..."
        onSearch={setSearchQuery}
      />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Topics
        </Button>
        {['Criminal Law', 'Employment', 'Housing', 'Consumer', 'Family'].map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Snippet */}
      {filteredSnippets.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-20">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">💡</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">
                Featured: {filteredSnippets[0].title}
              </h3>
              <p className="text-purple-100 mb-4">
                {filteredSnippets[0].content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-purple-300 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {filteredSnippets[0].shareCount} shares
                  </span>
                  <div className="flex space-x-1">
                    {filteredSnippets[0].tags.map(tag => (
                      <span key={tag} className="text-xs bg-purple-500 bg-opacity-50 px-2 py-1 rounded-full text-purple-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleShare(filteredSnippets[0])}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Education Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSnippets.slice(1).map(snippet => (
          <Card key={snippet.snippetId} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getCategoryIcon(snippet.category)}</div>
                  <div>
                    <h3 className="font-semibold text-white">{snippet.title}</h3>
                    <p className="text-sm text-purple-300">{snippet.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleLike(snippet.snippetId)}
                  className={`transition-colors duration-200 ${
                    likedSnippets.has(snippet.snippetId) 
                      ? 'text-red-400' 
                      : 'text-purple-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedSnippets.has(snippet.snippetId) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-purple-200 text-sm leading-relaxed">
                {snippet.content}
              </p>

              <div className="flex flex-wrap gap-1">
                {snippet.tags.map(tag => (
                  <span key={tag} className="text-xs bg-purple-500 bg-opacity-30 px-2 py-1 rounded-full text-purple-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white border-opacity-10">
                <span className="text-sm text-purple-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {snippet.shareCount} shares
                </span>
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleShare(snippet)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="p-6 text-center">
        <div className="space-y-4">
          <div className="text-4xl">🎓</div>
          <h3 className="text-lg font-bold text-white">Want to Learn More?</h3>
          <p className="text-purple-300">
            Get access to our complete rights education library with detailed guides, 
            interactive quizzes, and personalized learning paths.
          </p>
          <Button variant="primary">
            Upgrade to Premium
          </Button>
        </div>
      </Card>
    </div>
  );
}
