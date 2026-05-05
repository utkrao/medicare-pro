export type PatientStatus = 'Active' | 'Inactive' | 'Critical' | 'Recovering';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  status: PatientStatus;
  condition: string;
  bloodType: string;
  lastVisit: string;
  nextAppointment: string | null;
  avatar: string;
  department: string;
  doctor: string;
  notes: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenLevel: number;
  };
}

export type ViewMode = 'grid' | 'list';

export interface PatientFilters {
  search: string;
  status: PatientStatus | 'All';
  department: string;
}
