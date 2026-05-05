import { useState, type ChangeEvent } from 'react';
import { usePatientStore } from '@/store/patientStore';
import { PatientCard } from '@/components/PatientCard';
import { PatientListItem } from '@/components/PatientListItem';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Badge } from '@/components/ui/Badge';
import {
  GridIcon,
  HeartIcon,
  ListIcon,
  PressureIcon,
  SearchIcon,
  ThermometerIcon,
} from '@/components/ui/Icons';
import './PatientDetailsPage.css';

const statusVariantMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  Active: 'success',
  Recovering: 'info',
  Critical: 'danger',
  Inactive: 'neutral',
};

export const PatientDetailsPage = () => {
  const {
    getFilteredPatients,
    viewMode,
    setViewMode,
    filters,
    setFilters,
    getDepartments,
    clearFilters,
  } = usePatientStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const patients = getFilteredPatients();
  const departments = getDepartments();
  const activePatientId = selectedId && patients.some((patient) => patient.id === selectedId)
    ? selectedId
    : (patients[0]?.id ?? null);
  const selectedPatient = patients.find((patient) => patient.id === activePatientId) || null;

  const handleSearch = (value: string) => setFilters({ search: value });
  const handleStatusChange = (value: string) => setFilters({ status: value as 'Active' | 'Inactive' | 'Critical' | 'Recovering' | 'All' });
  const handleDeptChange = (value: string) => setFilters({ department: value });

  return (
    <div className="patients">
      <div className="page-header">
        <span className="page-header__eyebrow">Care Directory</span>
        <h1>Browse patients with context, not clutter.</h1>
        <p>
          Filter quickly, compare records in grid or list mode, and keep patient details
          visible while navigating the queue.
        </p>
      </div>

      <div className="patients__toolbar">
        <div className="patients__search">
          <Input
            placeholder="Search patients..."
            value={filters.search}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)}
            className="patients__search-input"
            helperText="Search by patient name, condition, or record ID"
          />
          <select
            className="patients__select"
            value={filters.status}
            onChange={(event) => handleStatusChange(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Recovering">Recovering</option>
            <option value="Critical">Critical</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            className="patients__select"
            value={filters.department}
            onChange={(event) => handleDeptChange(event.target.value)}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <button className="patients__clear" type="button" onClick={clearFilters}>
            Clear
          </button>
        </div>
        <div className="patients__toggle">
          <Toggle
            options={[
              { value: 'grid', label: 'Grid', icon: <GridIcon /> },
              { value: 'list', label: 'List', icon: <ListIcon /> },
            ]}
            value={viewMode}
            onChange={(value) => setViewMode(value as 'grid' | 'list')}
          />
        </div>
      </div>

      <div className="patients__resultsbar">
        <div className="patients__results">
          <SearchIcon />
          <span>{patients.length} patients found</span>
        </div>
        {selectedPatient && (
          <div className="patients__active">
            <span>Focused record</span>
            <strong>{selectedPatient.firstName} {selectedPatient.lastName}</strong>
          </div>
        )}
      </div>

      <div className="patients__workspace">
        <div className="patients__catalog">
          {viewMode === 'grid' ? (
            <div className="patients__grid">
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} onClick={(entry) => setSelectedId(entry.id)} />
              ))}
            </div>
          ) : (
            <div className="patients__list">
              {patients.map((patient) => (
                <PatientListItem key={patient.id} patient={patient} onClick={(entry) => setSelectedId(entry.id)} />
              ))}
            </div>
          )}
        </div>

        <aside className="patients__inspector">
          {selectedPatient ? (
            <>
              <div className="patients__inspector-top">
                <div className="patients__inspector-profile">
                  <img src={selectedPatient.avatar} alt="" className="patients__inspector-avatar" />
                  <div className="patients__inspector-copy">
                    <h2>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
                    <p>{selectedPatient.id} | {selectedPatient.age} years | {selectedPatient.gender}</p>
                  </div>
                </div>
                <Badge size="md" variant={statusVariantMap[selectedPatient.status] || 'neutral'}>
                  {selectedPatient.status}
                </Badge>
              </div>

              <div className="patients__inspector-grid">
                <div>
                  <span className="patients__label">Condition</span>
                  <strong>{selectedPatient.condition}</strong>
                </div>
                <div>
                  <span className="patients__label">Department</span>
                  <strong>{selectedPatient.department}</strong>
                </div>
                <div>
                  <span className="patients__label">Assigned doctor</span>
                  <strong>{selectedPatient.doctor}</strong>
                </div>
                <div>
                  <span className="patients__label">Blood type</span>
                  <strong>{selectedPatient.bloodType}</strong>
                </div>
                <div>
                  <span className="patients__label">Email</span>
                  <strong>{selectedPatient.email}</strong>
                </div>
                <div>
                  <span className="patients__label">Phone</span>
                  <strong>{selectedPatient.phone}</strong>
                </div>
              </div>

              <div className="patients__vitals">
                <div className="patients__vital-card">
                  <HeartIcon />
                  <div>
                    <span className="patients__label">Heart rate</span>
                    <strong>{selectedPatient.vitals.heartRate} bpm</strong>
                  </div>
                </div>
                <div className="patients__vital-card">
                  <PressureIcon />
                  <div>
                    <span className="patients__label">Blood pressure</span>
                    <strong>{selectedPatient.vitals.bloodPressure}</strong>
                  </div>
                </div>
                <div className="patients__vital-card patients__vital-card--wide">
                  <ThermometerIcon />
                  <div>
                    <span className="patients__label">Temperature</span>
                    <strong>{selectedPatient.vitals.temperature}°F</strong>
                  </div>
                </div>
              </div>

              <div className="patients__notes">
                <span className="patients__label">Clinical notes</span>
                <p>{selectedPatient.notes}</p>
              </div>

              <div className="patients__timeline">
                <div>
                  <span className="patients__label">Last visit</span>
                  <strong>{selectedPatient.lastVisit}</strong>
                </div>
                <div>
                  <span className="patients__label">Next appointment</span>
                  <strong>{selectedPatient.nextAppointment || 'Not scheduled'}</strong>
                </div>
                <div className="patients__timeline-card patients__timeline-card--wide">
                  <span className="patients__label">Oxygen level</span>
                  <strong>{selectedPatient.vitals.oxygenLevel}%</strong>
                </div>
              </div>
            </>
          ) : (
            <div className="patients__empty-state">
              <h2>No patient selected</h2>
              <p>Adjust the filters or select a record from the list to inspect details.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
