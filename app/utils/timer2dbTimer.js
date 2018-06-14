// @flow
import type { Timer, DbTimer } from "../types/Timer";
import getElapsedTime from "./getElapsedTime";

export default function timer2dbTimer(timer: Timer): DbTimer {
  return {
    id: timer.id,
    name: timer.name || "",
    elapsed: getElapsedTime(
      timer.timing.baseTime,
      timer.timing.startedAt,
      timer.timing.stoppedAt
    )
  };
}
