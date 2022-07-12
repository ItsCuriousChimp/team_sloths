import ShowModel from '../common/models/show.model';
import SeatModel from '../common/models/seat.model';

export default class ShowResponsePayload {
  id : String = ' ';

  theatreId : String = ' ';

  screenNumber : Date = new Date();

  show : ShowModel[] = [];

  seat : SeatModel[] = [];
}
