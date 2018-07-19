export interface AlertData {
  Date: string;
  Temperature: number;
  Cleared: string;
  ClearedDate: string;
}

export class Alert {
  constructor(
    public Date: string,
    public Temperature: number,
    public Cleared: string,
    public ClearedDate: string
  ) {}
}

export interface DayHistory {
  id: string;
  name: string;
}
