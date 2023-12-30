import Event from "../../models/event.js";
import User from "../../models/user.js";

import { transformEvent } from "./merger.js";
import { dateToString } from "../../helpers/date.js";
import { isAuthorized } from "../../helpers/auth.js";

const events = async () => {
  try {
    const results = await Event.find();
    return results.map((event) => transformEvent(event));
  } catch (err) {
    throw err;
  }
};
const createEvent = async (args, req) => {
  isAuthorized(req);
  const { userId } = req;
  try {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      createdBy: userId,
    });
    await event.save();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found!");
    }
    user.createdEvents.push(event);
    await user.save();
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

export default {
  events,
  createEvent,
};
