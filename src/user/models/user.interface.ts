import { Card } from '../../card/model/card.interface';
import { Credential } from '../../credential/model/credential.interface';

export interface User {
  id?: number;
  email?: string;
  password?: string;
  publicKeyRSA?: string;
  credentials?: Credential[];
  cards?: Card[];
}
