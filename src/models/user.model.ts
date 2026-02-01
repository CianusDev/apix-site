export enum Status {
  BUSY = "BUSY",
  AVAILABLE = "AVAILABLE",
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  status: Status;
};
