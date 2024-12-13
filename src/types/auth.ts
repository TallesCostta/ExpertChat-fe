export interface LoginRequest {
  login: string;
  senha: string;
}

export interface RegisterRequest {
  usuDscNome: string;
  usuDscEmail: string;
  usuDscLogin: string;
  usuDscSenha: string;
  usuDscTelefone: string;
  usuDatNascimento: string;
}

export interface LoginResponse {
  httpStatusCode: number;
  httStatusDescribe: string;
  data: {
    accessToken: string;
    expiresIn: number;
  } | null;
  message: string;
}

export interface RegisterResponse {
  httpStatusCode: number;
  httStatusDescribe: string;
  data: {
    id: string;
    usuDscNome: string;
    usuDscEmail: string;
    usuDscLogin: string;
    usuDscSenha: string;
    usuDscTelefone: string;
    usuDatNascimento: string;
    usuFlgAceitePoliticaPrivacidade: boolean;
    roles: string[];
  } | null;
  message: string;
}

export interface AuthUser {
  login: string;
  accessToken: string;
  expiresIn: number;
  tokenExpiration: Date;
}