import * as repo from "../repository/participantRepositoryPrisma";

export function getAllParticipants() {
  return repo.getAllParticipantsWithEvent();
}

export function getParticipantById(id: number) {
  return repo.getParticipantById(id);
}

export async function getAllParticipantsWithPagination(pageSize: number, pageNo: number) {
  const pageParticipants = await repo.getAllParticipantsWithEventPagination(pageSize, pageNo);
  if (pageParticipants.count == 0) {
    throw new Error("No participant found.");
  }
  return pageParticipants;
}

export function count() {
  return repo.countParticipant();
}
