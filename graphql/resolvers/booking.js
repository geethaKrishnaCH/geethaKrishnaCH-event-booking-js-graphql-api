import Booking from "../../models/booking.js";
import { transformBooking, transformEvent } from "./merger.js";
import { isAuthorized } from "../../helpers/auth.js";

const bookings = async (_, req) => {
  isAuthorized(req);
  const bookings = await Booking.find();
  return bookings.map((booking) => transformBooking(booking));
};
const createBooking = async ({ eventId }, req) => {
  isAuthorized(req);
  const { userId } = req;
  try {
    const booking = new Booking({
      event: eventId,
      user: userId,
    });
    await booking.save();
    return transformBooking(booking);
  } catch (err) {
    throw err;
  }
};
const cancelBooking = async ({ bookingId }, req) => {
  isAuthorized(req);
  const booking = await Booking.findById(bookingId).populate("event");
  const event = booking._doc.event;
  await Booking.deleteOne({ _id: bookingId });
  return transformEvent(event);
};

export default {
  bookings,
  createBooking,
  cancelBooking,
};
