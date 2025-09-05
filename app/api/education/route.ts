import { NextRequest, NextResponse } from 'next/server';
import { educationSnippets } from '@/lib/data';
import { EducationSnippet } from '@/lib/types';

// GET /api/education - Get all education snippets with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const sortBy = searchParams.get('sortBy') || 'shareCount'; // shareCount, title

    let filteredSnippets = [...educationSnippets];

    // Filter by category
    if (category) {
      filteredSnippets = filteredSnippets.filter(snippet => 
        snippet.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredSnippets = filteredSnippets.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm) ||
        snippet.content.toLowerCase().includes(searchTerm) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort snippets
    filteredSnippets.sort((a, b) => {
      if (sortBy === 'shareCount') {
        return b.shareCount - a.shareCount;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit, 10);
      filteredSnippets = filteredSnippets.slice(0, limitNum);
    }

    return NextResponse.json({
      success: true,
      data: filteredSnippets,
      total: filteredSnippets.length
    });
  } catch (error) {
    console.error('Error fetching education snippets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education snippets' },
      { status: 500 }
    );
  }
}

// POST /api/education - Create a new education snippet (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newSnippet: EducationSnippet = {
      snippetId: `snippet-${Date.now()}`,
      shareCount: 0,
      ...body,
    };

    // In a real app, this would save to a database
    return NextResponse.json({
      success: true,
      data: newSnippet
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating education snippet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create education snippet' },
      { status: 500 }
    );
  }
}
