export function normalizeBoxAlarms<T extends { slots?: Array<{ alarm?: Array<{ period?: number[] }> }> }>(box: T): T {
  if (!box?.slots) {
    return box;
  }

  box.slots = box.slots.map((slot) => {
    if (!slot?.alarm) {
      return slot;
    }

    slot.alarm = slot.alarm.map((alarm) => {
      if (!alarm?.period) {
        return alarm;
      }

      alarm.period = [...new Set(alarm.period)].sort((a, b) => a - b);
      return alarm;
    });

    return slot;
  });

  return box;
}
