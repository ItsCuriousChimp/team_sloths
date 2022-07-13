/* eslint-disable no-param-reassign */
import ShowModel from '../../common/models/show.model';

const seatStatusForShow =
(shows : any, seatsInScreensForTheatreAndMovie : any, bookedSeats: any) : ShowModel[] => {
  // Map for total number of seats in each screen
  const totalSeatsMap = new Map<String, Number>();
  //  Fill values in total Seats Map
  seatsInScreensForTheatreAndMovie.forEach((eachScreen : any) => {
    if (!totalSeatsMap.has(eachScreen.screenId)) {
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
    shows[i].totalSeats = totalNumberOfSeatsInScreen;
    shows[i].availableSeats = emptySeats;
    if (emptySeats === 0) {
      shows[i].availabilityStatus = 'Not Available';
    } else if (emptySeats <= 10) {
      shows[i].availabilityStatus = 'Filling Fast';
    } else {
      shows[i].availabilityStatus = 'Available';
    }
  }
  return shows;
};

export default seatStatusForShow;
