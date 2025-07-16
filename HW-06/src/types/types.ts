export interface TicketTime {
  startTime: string;
  endTime: string;
}

export enum CompanyName {
  Victory = 'Победа',
  RedWings = 'Red Wings',
  S7 = 'S7 Airlines'
}

export enum Currency {
  RUB = 'Р'
}

export enum SortType {
  Price = 'Самый дешевый',
  Duration = 'Самый быстрый',
  Connection = 'Самый оптимальный'
}

export enum ConnectionAmount {
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3'
}

export enum ConnectionText {
  Zero = 'Без пересадок',
  One = '1 пересадка',
  Two = '2 пересадки',
  Three = '3 пересадки'
}

export interface ConnectionType {
  amount: ConnectionAmount,
  text: ConnectionText
}

export interface TicketType {
  id: number;
  from: string;
  to: string;
  companyName: CompanyName;
  price: number;
  currency: Currency;
  time: TicketTime;
  duration: number;
  connectionAmount: ConnectionType;
}

export interface CheckBoxType {
  id: ConnectionAmount | CompanyName,
  text: ConnectionText | CompanyName
}

export enum FiltersTotal {
  Company = 3,
  Connection = 4
}

export enum FilterType {
  Company = 'company',
  Connection = 'connection'
}