import { NextRequest, NextResponse } from 'next/server';
import { User, UserPreferences } from '@/lib/types';

// In a real app, this would be stored in a database
const users: Map<string, User> = new Map();

// GET /api/user - Get user profile and preferences
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    let user = users.get(userId);
    
    // Create default user if doesn't exist
    if (!user) {
      user = {
        userId,
        preferences: {
          categories: [],
          notifications: true,
        },
        purchasedPacks: [],
      };
      users.set(userId, user);
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/user - Update user preferences
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, preferences } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    let user = users.get(userId);
    
    if (!user) {
      user = {
        userId,
        preferences: {
          categories: [],
          notifications: true,
        },
        purchasedPacks: [],
      };
    }

    // Update preferences
    user.preferences = { ...user.preferences, ...preferences };
    users.set(userId, user);

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// POST /api/user/purchase - Handle premium pack purchase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, packId, transactionHash } = body;

    if (!userId || !packId) {
      return NextResponse.json(
        { success: false, error: 'User ID and pack ID are required' },
        { status: 400 }
      );
    }

    let user = users.get(userId);
    
    if (!user) {
      user = {
        userId,
        preferences: {
          categories: [],
          notifications: true,
        },
        purchasedPacks: [],
      };
    }

    // Add pack to purchased packs if not already owned
    if (!user.purchasedPacks.includes(packId)) {
      user.purchasedPacks.push(packId);
      users.set(userId, user);
    }

    // In a real app, you would verify the transaction on-chain
    console.log(`Purchase recorded: ${userId} bought ${packId} with tx: ${transactionHash}`);

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Purchase successful'
    });
  } catch (error) {
    console.error('Error processing purchase:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process purchase' },
      { status: 500 }
    );
  }
}
