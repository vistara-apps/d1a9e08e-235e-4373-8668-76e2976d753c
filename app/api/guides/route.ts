import { NextRequest, NextResponse } from 'next/server';
import { emergencyGuides } from '@/lib/data';
import { EmergencyGuide } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const premium = searchParams.get('premium');
    
    let filteredGuides: EmergencyGuide[] = emergencyGuides;
    
    // Filter by category
    if (category && category !== 'all') {
      filteredGuides = filteredGuides.filter(guide => 
        guide.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredGuides = filteredGuides.filter(guide =>
        guide.title.toLowerCase().includes(searchLower) ||
        guide.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
        guide.contentJson.summary.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by premium status
    if (premium !== null) {
      const isPremium = premium === 'true';
      filteredGuides = filteredGuides.filter(guide => guide.isPremium === isPremium);
    }
    
    return NextResponse.json({
      success: true,
      data: filteredGuides,
      total: filteredGuides.length,
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, content, keywords, isPremium = false } = body;
    
    // Validate required fields
    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new guide
    const newGuide: EmergencyGuide = {
      guideId: `guide-${Date.now()}`,
      title,
      category,
      contentJson: content,
      keywords: keywords || [],
      isPremium,
    };
    
    // In a real app, you would save this to a database
    // For now, we'll just return the created guide
    
    return NextResponse.json({
      success: true,
      data: newGuide,
      message: 'Guide created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guide' },
      { status: 500 }
    );
  }
}
