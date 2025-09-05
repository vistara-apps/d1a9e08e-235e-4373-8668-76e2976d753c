import { NextRequest, NextResponse } from 'next/server';
import { emergencyGuides } from '@/lib/data';

// GET /api/guides/[id] - Get a specific emergency guide
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const guide = emergencyGuides.find(g => g.guideId === params.id);
    
    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }

    // Log access for analytics (in a real app, this would go to a database)
    console.log(`Guide accessed: ${guide.guideId} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      data: guide
    });
  } catch (error) {
    console.error('Error fetching guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guide' },
      { status: 500 }
    );
  }
}

// PUT /api/guides/[id] - Update a specific emergency guide (admin only)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const guideIndex = emergencyGuides.findIndex(g => g.guideId === params.id);
    
    if (guideIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }

    // In a real app, this would update the database
    const updatedGuide = { ...emergencyGuides[guideIndex], ...body };
    
    return NextResponse.json({
      success: true,
      data: updatedGuide
    });
  } catch (error) {
    console.error('Error updating guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update guide' },
      { status: 500 }
    );
  }
}

// DELETE /api/guides/[id] - Delete a specific emergency guide (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const guideIndex = emergencyGuides.findIndex(g => g.guideId === params.id);
    
    if (guideIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }

    // In a real app, this would delete from the database
    return NextResponse.json({
      success: true,
      message: 'Guide deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete guide' },
      { status: 500 }
    );
  }
}
