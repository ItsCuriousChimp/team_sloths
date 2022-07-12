/* eslint-disable no-param-reassign */
import { show } from '@prisma/client';

const seatStatusForShow =
(shows : any, seatsInScreensForTheatreAndMovie : any, bookedSeats: any) : show => {
  // Map for total number of seats in each screen
  const totalSeatsMap = new Map<String, Number>();
  //  Fill values in total Seats Map
  seatsInScreensForTheatreAndMovie.forEach((eachScreen : any) => {
    if (!totalSeatsMap.has(eachScreen.screenId)) {
      // eachScreen.screen.totalNumberOfSeats = eachScreen.screen.seat.length;
      totalSeatsMap.set(eachScreen.id, eachScreen.seat.length);
    }
  });

  // Map for booked seats according to each show
  const bookedSeatsMap = new Map<String, Number>();
  // Fill values in the bookedSeatsMap
  bookedSeats.forEach((eachShow : any) => {
    if (!bookedSeatsMap.has(eachShow.id)) {
      bookedSeatsMap.set(
        eachShow.id,
        eachShow.bookedSeat.length,
      );
    }
  });

  // Set status property in shows according to vacant seats
  for (let i : number = 0; i < shows.length; i += 1) {
    const totalNumberOfSeatsInScreen : any = totalSeatsMap.get(shows[i].screenId);
    const totalNumberOfBookedSeatsForMovie :any = bookedSeatsMap.get(shows[i].id);
    const emptySeats : number = totalNumberOfSeatsInScreen - totalNumberOfBookedSeatsForMovie;
    if (emptySeats === 0) {
      shows[i].status = 'Not Available';
    } else if (emptySeats <= 10) {
      shows[i].status = 'Filling Fast';
    } else {
      shows[i].status = 'Available';
    }
  }
  return shows;
};

export default seatStatusForShow;
