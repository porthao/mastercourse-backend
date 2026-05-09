export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface JwtPayloadDto {
  id: number;
  name: string;
  email: string;
  role: string;
}
