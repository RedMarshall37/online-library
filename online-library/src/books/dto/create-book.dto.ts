// DTO (Data Transfer Object) для создания книги
export class CreateBookDto {
  title: string; // Название книги
  author: string; // Автор книги
  description?: string; // Описание книги (необязательное поле)
}
