import { NextRequest, NextResponse } from 'next/server';
import { emergencyGuides } from '@/lib/data';
import { EmergencyGuide } from '@/lib/types';

// GET /api/guides - Get all emergency guides with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const premium = searchParams.get('premium');

    let filteredGuides = [...emergencyGuides];

    // Filter by category
    if (category) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredGuides = filteredGuides.filter(guide =>
        guide.title.toLowerCase().includes(searchTerm) ||
        guide.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
        guide.contentJson.summary.toLowerCase().includes(searchTerm)
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
      total: filteredGuides.length
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}

// POST /api/guides - Create a new emergency guide (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newGuide: EmergencyGuide = {
      guideId: `guide-${Date.now()}`,
      ...body,
    };

    // In a real app, this would save to a database
    // For now, we'll just return the created guide
    return NextResponse.json({
      success: true,
      data: newGuide
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guide' },
      { status: 500 }
    );
  }
}
