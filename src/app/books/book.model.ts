export interface Book {
    title: string; 
    author: string;
    price: number;
    genre: string;
    bookCover: string | File;
}