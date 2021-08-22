export interface Book {
    title: string; 
    author: string;
    price: number;
    genres: string[];
    bookCover: string | File;
}