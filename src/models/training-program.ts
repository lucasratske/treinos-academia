export class TrainingProgram {
  _id: {
    $oid: string
  };
  name: string = "Programa de treinamento";
  date_start: Date;
  date_end: Date;
  active: boolean = true;
  userId: string;
}
