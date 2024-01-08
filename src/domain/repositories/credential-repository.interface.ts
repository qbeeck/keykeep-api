import { CredentialId } from '../models/credential';
import { CreditCard, CreditCardId } from '../models/credit-card';

export interface CredentialRepository {
  getById(id: CredentialId): Promise<Credential>;
  add(card: CreditCard): Promise<CreditCard>;
  update(card: CreditCard): Promise<CreditCard>;
  deleteById(id: CreditCardId): Promise<void>;
}
