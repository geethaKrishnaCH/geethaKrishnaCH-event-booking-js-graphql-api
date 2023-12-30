import Event from "../../models/event.js";
import User from "../../models/user.js";
import { dateToString } from "../../helpers/date.js";

export const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event.date),
    creator: user.bind(this, event.createdBy),
  };
};

export const transformBooking = (booking) => {
  return {
    ...booking._doc,
    event: singleEvent.bind(this, booking._doc.event),
    user: user.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => transformEvent(event));
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};
