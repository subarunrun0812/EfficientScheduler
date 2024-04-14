import { GetTentativeEventsInteractor } from "@/backend/application/getTentativeEvents/interactor";
import { EventRepository } from "@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get("user_id");
	if (!userId) {
		return NextResponse.json({}, { status: 400 });
	}

	const interactor = new GetTentativeEventsInteractor(new EventRepository());
	const result = await interactor.execute({ userId });
	return NextResponse.json(result);
}
