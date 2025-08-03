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