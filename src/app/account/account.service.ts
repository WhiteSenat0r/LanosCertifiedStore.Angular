import { Injectable, signal } from '@angular/core';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUserSig = signal<User | undefined | null>(undefined);
}
