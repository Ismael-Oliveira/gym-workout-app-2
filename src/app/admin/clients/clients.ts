import { Category } from "src/app/personal/category/category";
import { Performance } from 'src/app/personal/performance/performance';

export class Client {
    id: number;
    name: string;
    birthDate: String;
    typeUser: string;
    email: string;
    dateCreated: Date;
    card: {
        id: number;
        categories: Array<Category>;
    };
    performances: Performance[];
}