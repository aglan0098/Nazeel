export interface Prisoner {
  id: string;
  idNumber: string;
  fullName: string;
  nationality: string;
  gender: string;
  religion: string;
  birthDate: string;
  imageUrl?: string;
  cases: {
    caseType?: string;
    caseDate?: { gregorian?: string };
    endDate?: { gregorian?: string };
    judgmentType?: string;
  }[];
}
