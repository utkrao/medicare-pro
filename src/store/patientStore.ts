import { create } from 'zustand';
import type { Patient, ViewMode, PatientFilters } from '@/types/patient';
import { patients as mockPatients } from '@/data/patients';

interface PatientStore {
  patients: Patient[];
  viewMode: ViewMode;
  filters: PatientFilters;
  isLoading: boolean;
  selectedPatient: Patient | null;

  setViewMode: (mode: ViewMode) => void;
  setFilters: (filters: Partial<PatientFilters>) => void;
  selectPatient: (patient: Patient | null) => void;
  clearFilters: () => void;
  getFilteredPatients: () => Patient[];
  getDepartments: () => string[];
  getStatusCounts: () => Record<string, number>;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: mockPatients,
  viewMode: 'grid',
  filters: { search: '', status: 'All', department: 'All' },
  isLoading: false,
  selectedPatient: null,

  setViewMode: (mode) => set({ viewMode: mode }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  selectPatient: (patient) => set({ selectedPatient: patient }),
  clearFilters: () => set({ filters: { search: '', status: 'All', department: 'All' } }),

  getFilteredPatients: () => {
    const { patients, filters } = get();
    return patients.filter((patient) => {
      const matchesSearch =
        !filters.search ||
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        patient.condition.toLowerCase().includes(filters.search.toLowerCase()) ||
        patient.id.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === 'All' || patient.status === filters.status;

      const matchesDepartment =
        filters.department === 'All' || patient.department === filters.department;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  },

  getDepartments: () => {
    const { patients } = get();
    return ['All', ...Array.from(new Set(patients.map((p) => p.department)))];
  },

  getStatusCounts: () => {
    const { patients } = get();
    return patients.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  },
}));
