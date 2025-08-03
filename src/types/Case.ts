// src/types/Case.ts

export interface CaseDate {
  hijri?: string;
  gregorian?: string;
}

export interface Penalty {
  type: string;
  details?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any; // يسمح بمرونة في الحقول حسب نوع العقوبة
}

export interface Case {
  id?: string;
  caseNumber?: string;
  caseType?: string;
  subType?: string;
  caseDate?: CaseDate;
  endDate?: CaseDate;
  judgmentNumber?: string;
  court?: string;
  judgmentDate?: string;
  judgmentType?: string;
  penalties?: Penalty[];
}
