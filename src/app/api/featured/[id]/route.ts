import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Track click
    const featured = await prisma.featuredProject.update({
      where: { id },
      data: {
        clickCount: { increment: 1 },
      },
    });

    return NextResponse.json({ 
      success: true, 
      clickCount: featured.clickCount 
    });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const featured = await prisma.featuredProject.findUnique({
      where: { id },
    });

    if (!featured) {
      return NextResponse.json(
        { error: 'Featured project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(featured);
  } catch (error) {
    console.error('Error fetching featured project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const featured = await prisma.featuredProject.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.error('Error updating featured project:', error);
    return NextResponse.json(
      { error: 'Failed to update featured project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.featuredProject.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting featured project:', error);
    return NextResponse.json(
      { error: 'Failed to delete featured project' },
      { status: 500 }
    );
  }
}
