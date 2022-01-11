import { Category } from "../category/category";

export class Exercise {
    id: number;
    nameExercise: string;
    loop: number;
    weight: number;
    series: number;
    category: Category;
}