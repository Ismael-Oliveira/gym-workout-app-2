import { Exercise } from "../workout/exercise";

export class Category {
    id: number;
    name: string;
    planning: Array<Exercise>
}