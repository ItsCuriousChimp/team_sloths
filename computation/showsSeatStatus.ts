/* eslint-disable no-param-reassign */
import { show } from '@prisma/client';

const seatStatusForShow =
(shows : any, seatsInScreensForTheatreAndMovie : any, bookedSeats: any) : show => {
  // Map for total number of seats in each screen
  const totalSeatsMap = new Map<String, Number>();
  //  Fill values in total Seats Map
  seatsInScreensForTheatreAndMovie.forEach((eachScreen : any) => {
    if (!totalSeatsMap.has(eachScreen.screen.screenId)) {
      // eachScreen.screen.totalNumberOfSeats = eachScreen.screen.seat.length;
      totalSeatsMap.set(eachScreen.screen.id, eachScreen.screen.seat.length);
    }
  });

  // Map for booked seats according to each show
  const bookedSeatsMap = new Map<String, Number>();
  // Fill values in the bookedSeatsMap
  bookedSeats.forEach((eachShow : any) => {
    if (!bookedSeatsMap.has(eachShow.show.id)) {
      bookedSeatsMap.set(
        eachShow.show.id,
        eachShow.show.bookedSeat.length,
      );
    }
  });

  // Set status property in shows according to vacant seats
  for (let i : number = 0; i < shows.length; i += 1) {
    const totalNumberOfSeatsInScreen : any = totalSeatsMap.get(shows[i].show.screenId);
    const totalNumberOfBookedSeatsForMovie :any = bookedSeatsMap.get(shows[i].show.id);
    const emptySeats : number = totalNumberOfSeatsInScreen - totalNumberOfBookedSeatsForMovie;
    if (emptySeats === 0) {
      shows[i].show.status = 'Not Available';
    } else if (emptySeats <= 10) {
      shows[i].show.status = 'Filling Fast';
    } else {
      shows[i].show.status = 'Available';
    }
  }
  return shows;
};

export default seatStatusForShow;
