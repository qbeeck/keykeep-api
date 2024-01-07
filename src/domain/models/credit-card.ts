import { UserId } from './user';

export type CreditCardEntryId = string;

export class CreditCardEntry {
  private _id: CreditCardEntryId;
  private _userId: UserId;
  private _cardholderName: string;
  private _hashedCardNumber: string;
  private _expiryDate: string;
  private _cvv: string | null;
  private _description: string;

  constructor(
    id: CreditCardEntryId,
    userId: UserId,
    cardholderName: string,
    hashedCardNumber: string,
    expiryDate: string,
    cvv: string | null,
    description: string,
  ) {
    this.validateCardholderName(cardholderName);
    this.validateHashedCardNumber(hashedCardNumber);
    this.validateExpiryDate(expiryDate);
    this.validateCVV(cvv);

    this._id = id;
    this._userId = userId;
    this._cardholderName = cardholderName;
    this._hashedCardNumber = hashedCardNumber;
    this._expiryDate = expiryDate;
    this._cvv = cvv;
    this._description = description;
  }

  private validateCardholderName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Cardholder name cannot be empty');
    }
  }

  private validateHashedCardNumber(number: string): void {
    if (!number || number.length < 8) {
      throw new Error('Invalid or weak hashed card number');
    }
  }

  private validateExpiryDate(date: string): void {
    if (!date || new Date(date) < new Date()) {
      throw new Error('Invalid or past expiry date');
    }
  }

  private validateCVV(cvv: string | null): void {
    const cvvRegex = /^[0-9]{3,4}$/;

    if (cvv === null) {
      return;
    }

    if (!cvvRegex.test(cvv)) {
      throw new Error('Invalid cvv');
    }
  }

  get id(): CreditCardEntryId {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
  }

  get cardholderName(): string {
    return this._cardholderName;
  }

  get hashedCardNumber(): string {
    return this._hashedCardNumber;
  }

  get expiryDate(): string {
    return this._expiryDate;
  }

  get cvv(): string | null {
    return this._cvv;
  }

  get description(): string {
    return this._description;
  }
}
