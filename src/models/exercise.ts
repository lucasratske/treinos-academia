export class Exercise {
  _id: {
    $oid: string
  };
  name: string;
  repetitions: number;
  cycle: number;
  workoutId: number;
}
