import { CreditCard, CreditCardId } from '../models/credit-card';
import { GroupMembership } from '../models/group-membership';

export interface CreditCardRepository {
  getById(id: CreditCardId): Promise<CreditCard>;
  add(card: CreditCard): Promise<GroupMembership>;
  update(card: CreditCard): Promise<CreditCard>;
  deleteById(id: CreditCardId): Promise<void>;
}
