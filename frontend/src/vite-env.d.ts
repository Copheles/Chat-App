/// <reference types="vite/client" />

interface IAuthPayload {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

interface IUserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
}

interface IErrorResponse {
  message: string;
  status: string;
  statusCode: number;
}
