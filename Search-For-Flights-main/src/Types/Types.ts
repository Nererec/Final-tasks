import { ReactNode } from "react";

export type TchildrenProps = {  
    children: ReactNode;
}

export interface Iticket { // типы данных с серверв
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: string;
    startTime: string;
    endTime: string;
    duration: number;
    date?: string;
    transfers: string;
}

export type Tcompany = { // тип пропса в компоненте GlobalSvg
    company: string;
}

export interface IpropseTickets { // типы пропсов
    id: number;
    from: string;
    to: string;
    price: number;
    company: string;
    currency: string;
    startTime: string;
    endTime: string;
    duration: number;
    transfers: string;

}

export type TfetchTicketsError = {  // тип описывает структуру объекта ошибки запроса к серверу
    message: string;
  };

  export type TtikcetsState = { // типы для обработки запроса статусов к серверу
    listTickets: Iticket[];
    error: string | null;
    status: "loading" | "idle";
    btnCheap: Boolean;
    btnFast: Boolean;
    btnOptimal: Boolean;
    paramsFetch: IparamsFetch;
    displayFilterMenu: boolean;
  };

  export interface IparamsFetch {
    limit: number;
    companyP: string;
    companyR: string;
    companyS: string;
    transfers0: string; 
    transfers1: string;
    transfers2: string;
    transfers3: string;
    sortPrice: string;
    sortDuratuon: string;
  }
