export interface Notification {
  id: string;
  name: string;
  event: string;
  connection: string;
  sector: string;
  message: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Connection {
  id: string;
  name: string;
  isDefault: boolean;
  isConnected: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
}

export interface Sector {
  id: string;
  name: string;
}

export interface Variable {
  id: string;
  name: string;
  token: string;
  description: string;
}

// DTO para criação de contato alinhado ao backend
export interface ICreateContactInputDto {
  name: string;
  number: string;
  channel?: number; // valor 1 para ZAPPY
}

export enum ChannelKey {
  ZAPPY = 1
}