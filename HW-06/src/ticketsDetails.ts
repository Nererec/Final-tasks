import { TicketType, CompanyName, Currency, ConnectionAmount, ConnectionText } from './types/types';

export const tickets: TicketType[] = [
  {
    id: 1,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.Victory,
    price: 12680,
    currency: Currency.RUB,
    time: {
      startTime: '12:00',
      endTime: '16:30'
    },
    duration: 270,
    connectionAmount: {amount: ConnectionAmount.One, text: ConnectionText.One}
  },
  {
    id: 2,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.RedWings,
    price: 21500,
    currency: Currency.RUB,
    time: {
      startTime: '14:00',
      endTime: '16:00'
    },
    duration: 120,
    connectionAmount: {amount: ConnectionAmount.Zero, text: ConnectionText.Zero}
  },
  {
    id: 3,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.S7,
    price: 23995,
    currency: Currency.RUB,
    time: {
      startTime: '4:50',
      endTime:  '13:30'
    },
    duration: 520,
    connectionAmount: {amount: ConnectionAmount.Two, text: ConnectionText.Two}
  },
  {
    id: 4,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.Victory,
    price: 30680,
    currency: Currency.RUB,
    time: {
      startTime: '18:00',
      endTime: '23:00'
    },
    duration: 300,
    connectionAmount: {amount: ConnectionAmount.One, text: ConnectionText.One}
  },
  {
    id: 5,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.RedWings,
    price: 20500,
    currency: Currency.RUB,
    time: {
      startTime: '10:00',
      endTime: '12:00'
    },
    duration: 120,
    connectionAmount: {amount: ConnectionAmount.Zero, text: ConnectionText.Zero}
  },
  {
    id: 6,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.S7,
    price: 20995,
    currency: Currency.RUB,
    time: {
      startTime: '14:50',
      endTime: '23:30'
    },
    duration: 520,
    connectionAmount: {amount: ConnectionAmount.Two, text: ConnectionText.Two}
  },
  {
    id: 7,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.Victory,
    price: 16680,
    currency: Currency.RUB,
    time: {
      startTime: '22:00',
      endTime: '03:30'
    },
    duration: 330,
    connectionAmount: {amount: ConnectionAmount.One, text: ConnectionText.One}
  },
  {
    id: 8,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.RedWings,
    price: 21500,
    currency: Currency.RUB,
    time: {
      startTime: '14:00',
      endTime: '16:00'
    },
    duration: 120,
    connectionAmount: {amount: ConnectionAmount.One, text: ConnectionText.One}
  },
  {
    id: 9,
    from: 'SVO',
    to: 'LED',
    companyName: CompanyName.S7,
    price: 23995,
    currency: Currency.RUB,
    time: {
      startTime: '4:50',
      endTime: '13:30'
    },
    duration: 520,
    connectionAmount: {amount: ConnectionAmount.Zero, text: ConnectionText.Zero}
  }
]