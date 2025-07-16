import { SortType, CheckBoxType, ConnectionAmount, ConnectionText, CompanyName } from './types/types';

export const SortButtons: SortType[] = [SortType.Price, SortType.Duration, SortType.Connection]

export const ConnectionCheckboxes: CheckBoxType[] = [
  {
    id: ConnectionAmount.Zero,
    text: ConnectionText.Zero
  },
  {
    id: ConnectionAmount.One,
    text: ConnectionText.One
  },
  {
    id: ConnectionAmount.Two,
    text: ConnectionText.Two
  },
  {
    id: ConnectionAmount.Three,
    text: ConnectionText.Three
  },
]

export const CompanyCheckboxes: CheckBoxType[] = [
  {
    id: CompanyName.Victory,
    text: CompanyName.Victory
  },
  {
    id: CompanyName.RedWings,
    text: CompanyName.RedWings
  },
  {
    id: CompanyName.S7,
    text: CompanyName.S7
  },
]