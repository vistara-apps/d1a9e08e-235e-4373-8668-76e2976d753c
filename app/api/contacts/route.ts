import { NextRequest, NextResponse } from 'next/server';
import { emergencyContacts } from '@/lib/data';
import { EmergencyContact } from '@/lib/types';

// GET /api/contacts - Get all emergency contacts with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const situationType = searchParams.get('situationType');
    const search = searchParams.get('search');
    const premium = searchParams.get('premium');

    let filteredContacts = [...emergencyContacts];

    // Filter by category
    if (category) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by situation type
    if (situationType) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.situationType.toLowerCase() === situationType.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.description.toLowerCase().includes(searchTerm) ||
        contact.category.toLowerCase().includes(searchTerm) ||
        contact.situationType.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by premium status
    if (premium !== null) {
      const isPremium = premium === 'true';
      filteredContacts = filteredContacts.filter(contact => contact.isPremium === isPremium);
    }

    return NextResponse.json({
      success: true,
      data: filteredContacts,
      total: filteredContacts.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Create a new emergency contact (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newContact: EmergencyContact = {
      contactId: `contact-${Date.now()}`,
      ...body,
    };

    // In a real app, this would save to a database
    return NextResponse.json({
      success: true,
      data: newContact
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
