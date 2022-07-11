import { bookedSeat } from '@prisma/client';

export default class ShowResponsePayload {
  bookedSeat : bookedSeat | undefined;
}
