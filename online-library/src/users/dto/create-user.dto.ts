// DTO (Data Transfer Object) для создания нового пользователя
export class CreateUserDto {
  username: string; // Имя пользователя
  password: string; // Пароль пользователя
  email: string; // Электронная почта пользователя
}