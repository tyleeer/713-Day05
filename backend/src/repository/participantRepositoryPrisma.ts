import { PrismaClient } from "@prisma/client";
import type { PageParticipant } from "../models/participant";

const prisma = new PrismaClient();

export function getParticipantById(id: number) {
  return prisma.participant.findUnique({
    where: { id },
    include: {
      events: {
        select: {
          id: true,
          category: true,
          title: true,
          description: true,
          date: true,
          time: true,
        }
      }
    }
    // omit: {
    //   organizerId: true
    // }
  });
}

export function getAllParticipantsWithEvent() {
  return prisma.participant.findMany({
    include: {
      events: {
        select: {
          id: true,
          category: true,
          title: true,
          description: true,
          date: true,
          time: true,
        }
      }
    }
  });
}

export async function getAllParticipantsWithEventPagination(
  pageSize: number,
  pageNo: number
) {
  const participants = await prisma.participant.findMany({
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    include: {
      events: {
        select: {
          id: true,
          category: true,
          title: true,
          description: true,
          date: true,
          time: true,
        }
      }
    }
  });

  const count = await prisma.participant.count();
  return { count, participants } as PageParticipant;
}

export function countParticipant() {
  return prisma.participant.count();
}
