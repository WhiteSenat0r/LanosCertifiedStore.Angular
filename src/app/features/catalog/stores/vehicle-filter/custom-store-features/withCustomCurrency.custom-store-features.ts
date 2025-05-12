import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { Currency } from '../../../models/enums/Currency.enum';

export function withCustomCurrency() {
  return signalStoreFeature(
    withState<{ currencyType: string; currencyArray: Currency[] }>({
      currencyType: Currency.USD,
      currencyArray: [Currency.USD, Currency.EUR, Currency.UA],
    }),
    withMethods((store) => ({
      changeCurrencyTypeState(newCurrencyType: string) {
        patchState(store, { currencyType: newCurrencyType });
      },
    }))
  );
}
