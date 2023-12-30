import bookingResolvers from "./booking.js";
import eventResolvers from "./event.js";
import userResolvers from "./user.js";

export default {
  ...bookingResolvers,
  ...eventResolvers,
  ...userResolvers,
};
