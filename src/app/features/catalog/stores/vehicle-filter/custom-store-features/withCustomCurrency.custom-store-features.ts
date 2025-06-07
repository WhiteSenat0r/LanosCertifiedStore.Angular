import {
  patchState,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Currency } from '../../../models/enums/Currency.enum';
import { CurrencyDataService } from '../../../services/currency-data.service';
import { computed, inject } from '@angular/core';

export function withCustomCurrency() {
  return signalStoreFeature(
    withState<{
      currencyType: string;
      currencyArray: Currency[];
      rateUAH: number;
      rateEUR: number;
    }>({
      currencyType: Currency.USD,
      currencyArray: [Currency.USD, Currency.EUR, Currency.UA],
      rateUAH: -1,
      rateEUR: -1,
    }),
    withComputed((store) => ({
      currentCurrencyHolder: computed<{
        type: string;
        rates: number[];
      }>(() => {
        return {
          type: store.currencyType(),
          rates: [store.rateUAH(), store.rateEUR()],
        };
      }),
    })),
    withMethods((store) => ({
      changeCurrencyTypeState(newCurrencyType: string) {
        patchState(store, { currencyType: newCurrencyType });
        console.log(store.currentCurrencyHolder());
      },
    })),
    withHooks({
      onInit(store, currencyData = inject(CurrencyDataService)) {
        currencyData.getExchangeRates().subscribe((rates) => {
          const rateUSD: number = rates?.['USD'];
          if (rateUSD !== undefined) {
            patchState(store, { rateEUR: 1 / rateUSD });
          } else {
            console.error('Курс для євро відносно долару не знайдено', rates);
          }
          const rateUAHToEUR: number = rates?.['UAH'];
          if (rateUAHToEUR !== undefined) {
            patchState(store, { rateUAH: rateUAHToEUR / rateUSD });
          } else {
            console.error('Курс для UAH відносно долару не знайдено', rates);
          }
        });
      },
    })
  );
}
