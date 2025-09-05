import { NextRequest, NextResponse } from 'next/server';
import { emergencyContacts } from '@/lib/data';
import { EmergencyContact } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const situationType = searchParams.get('situationType');
    const premium = searchParams.get('premium');
    
    let filteredContacts: EmergencyContact[] = emergencyContacts;
    
    // Filter by category
    if (category && category !== 'all') {
      filteredContacts = filteredContacts.filter(contact => 
        contact.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by situation type
    if (situationType) {
      filteredContacts = filteredContacts.filter(contact =>
        contact.situationType.toLowerCase().includes(situationType.toLowerCase())
      );
    }
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchLower) ||
        contact.description.toLowerCase().includes(searchLower) ||
        contact.category.toLowerCase().includes(searchLower) ||
        contact.situationType.toLowerCase().includes(searchLower)
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
      total: filteredContacts.length,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, category, situationType, description, isPremium = false } = body;
    
    // Validate required fields
    if (!name || !phone || !category || !situationType || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new contact
    const newContact: EmergencyContact = {
      contactId: `contact-${Date.now()}`,
      name,
      phone,
      email,
      category,
      situationType,
      description,
      isPremium,
    };
    
    // In a real app, you would save this to a database
    // For now, we'll just return the created contact
    
    return NextResponse.json({
      success: true,
      data: newContact,
      message: 'Contact created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
