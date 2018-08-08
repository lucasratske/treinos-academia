export class Workout {
  _id: {
    $oid: string
  };
  name: string;
  order: number;
  userId: string;
  trainingProgramId: string;
}
