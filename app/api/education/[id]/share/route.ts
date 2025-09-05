import { NextRequest, NextResponse } from 'next/server';
import { educationSnippets } from '@/lib/data';

// POST /api/education/[id]/share - Share an education snippet
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { platform, userId } = body; // platform: 'farcaster', 'twitter', 'copy'
    
    const snippet = educationSnippets.find(s => s.snippetId === params.id);
    
    if (!snippet) {
      return NextResponse.json(
        { success: false, error: 'Education snippet not found' },
        { status: 404 }
      );
    }

    // In a real app, this would update the share count in the database
    snippet.shareCount += 1;

    // Log the share action for analytics
    console.log(`Snippet shared: ${snippet.snippetId} on ${platform} by ${userId || 'anonymous'}`);

    // Generate share content based on platform
    let shareContent = '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rightsguardian.app';
    
    switch (platform) {
      case 'farcaster':
        shareContent = `💡 Did you know? ${snippet.title}\n\n${snippet.content}\n\n#RightsGuardian #KnowYourRights\n${baseUrl}/education/${snippet.snippetId}`;
        break;
      case 'twitter':
        shareContent = `💡 ${snippet.title}\n\n${snippet.content}\n\n#RightsGuardian #KnowYourRights\n${baseUrl}/education/${snippet.snippetId}`;
        break;
      case 'copy':
        shareContent = `${snippet.title}\n\n${snippet.content}\n\nShared from RightsGuardian - ${baseUrl}`;
        break;
      default:
        shareContent = snippet.content;
    }

    return NextResponse.json({
      success: true,
      data: {
        snippet,
        shareContent,
        shareUrl: `${baseUrl}/education/${snippet.snippetId}`
      },
      message: 'Share content generated successfully'
    });
  } catch (error) {
    console.error('Error sharing education snippet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to share education snippet' },
      { status: 500 }
    );
  }
}
