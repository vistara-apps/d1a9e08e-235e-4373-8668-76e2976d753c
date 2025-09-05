import { NextRequest, NextResponse } from 'next/server';
import { ChecklistItem } from '@/lib/types';

// In a real app, this would be stored in a database
const checklists: Map<string, ChecklistItem[]> = new Map();

// GET /api/checklist - Get checklist items for a guide and user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const guideId = searchParams.get('guideId');
    const userId = searchParams.get('userId');

    if (!guideId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Guide ID and User ID are required' },
        { status: 400 }
      );
    }

    const key = `${userId}-${guideId}`;
    const userChecklist = checklists.get(key) || [];

    return NextResponse.json({
      success: true,
      data: userChecklist
    });
  } catch (error) {
    console.error('Error fetching checklist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch checklist' },
      { status: 500 }
    );
  }
}

// POST /api/checklist - Create or update checklist items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guideId, userId, items } = body;

    if (!guideId || !userId || !items) {
      return NextResponse.json(
        { success: false, error: 'Guide ID, User ID, and items are required' },
        { status: 400 }
      );
    }

    const key = `${userId}-${guideId}`;
    const checklistItems: ChecklistItem[] = items.map((item: any, index: number) => ({
      itemId: `${key}-${index}`,
      guideId,
      stepText: item.stepText,
      completed: item.completed || false,
      order: index
    }));

    checklists.set(key, checklistItems);

    return NextResponse.json({
      success: true,
      data: checklistItems
    });
  } catch (error) {
    console.error('Error creating/updating checklist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create/update checklist' },
      { status: 500 }
    );
  }
}

// PUT /api/checklist - Update specific checklist item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { guideId, userId, itemId, completed } = body;

    if (!guideId || !userId || !itemId || completed === undefined) {
      return NextResponse.json(
        { success: false, error: 'Guide ID, User ID, Item ID, and completed status are required' },
        { status: 400 }
      );
    }

    const key = `${userId}-${guideId}`;
    const userChecklist = checklists.get(key) || [];
    
    const itemIndex = userChecklist.findIndex(item => item.itemId === itemId);
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Checklist item not found' },
        { status: 404 }
      );
    }

    userChecklist[itemIndex].completed = completed;
    checklists.set(key, userChecklist);

    return NextResponse.json({
      success: true,
      data: userChecklist[itemIndex]
    });
  } catch (error) {
    console.error('Error updating checklist item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update checklist item' },
      { status: 500 }
    );
  }
}
