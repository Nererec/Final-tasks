const LIST_TYPES = {
  BACKLOG: "backlog",
  READY: "ready",
  IN_PROGRESS: "inProgress",
  FINISHED: "finished",
};

const LIST_COPY = {
  [LIST_TYPES.BACKLOG]: "Backlog",
  [LIST_TYPES.READY]: "Ready",
  [LIST_TYPES.IN_PROGRESS]: "In progress",
  [LIST_TYPES.FINISHED]: "Finished",
};

export { LIST_TYPES, LIST_COPY };
