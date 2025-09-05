import { NextRequest, NextResponse } from 'next/server';
import { emergencyGuides } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const guide = emergencyGuides.find(g => g.guideId === params.id);
    
    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: guide,
    });
  } catch (error) {
    console.error('Error fetching guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guide' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const guide = emergencyGuides.find(g => g.guideId === params.id);
    
    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    // In a real app, you would update the guide in the database
    const updatedGuide = { ...guide, ...body };
    
    return NextResponse.json({
      success: true,
      data: updatedGuide,
      message: 'Guide updated successfully',
    });
  } catch (error) {
    console.error('Error updating guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update guide' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const guide = emergencyGuides.find(g => g.guideId === params.id);
    
    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    // In a real app, you would delete the guide from the database
    
    return NextResponse.json({
      success: true,
      message: 'Guide deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete guide' },
      { status: 500 }
    );
  }
}
