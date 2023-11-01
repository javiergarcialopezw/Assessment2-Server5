import { HttpStatusCode } from "axios";

export class ReturnHelper<T> {
  status: HttpStatusCode;
  data: T[];
  message: string;

  constructor(status = HttpStatusCode.Ok, data: T[], message = "success") {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
