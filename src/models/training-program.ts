export class TrainingProgram {
  _id: {
    $oid: string
  };
  name: string;
  date_start: Date;
  date_end: Date;
  active: boolean = true;
}
