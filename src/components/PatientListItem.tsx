import { Badge } from './ui/Badge';
import { HeartIcon, PressureIcon } from './ui/Icons';
import type { Patient } from '@/types/patient';
import './PatientListItem.css';

interface PatientListItemProps {
  patient: Patient;
  onClick?: (patient: Patient) => void;
}

const statusVariantMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  Active: 'success',
  Recovering: 'info',
  Critical: 'danger',
  Inactive: 'neutral',
};

export const PatientListItem = ({ patient, onClick }: PatientListItemProps) => {
  return (
    <div className="patient-list-item" onClick={() => onClick?.(patient)}>
      <img src={patient.avatar} alt="" className="patient-list-item__avatar" />
      <div className="patient-list-item__info">
        <h4 className="patient-list-item__name">{patient.firstName} {patient.lastName}</h4>
        <p className="patient-list-item__meta">{patient.id} • {patient.age} years • {patient.gender}</p>
      </div>
      <div className="patient-list-item__cell">{patient.condition}</div>
      <div className="patient-list-item__cell">{patient.department}</div>
      <div className="patient-list-item__cell">{patient.doctor}</div>
      <div className="patient-list-item__cell">{patient.lastVisit}</div>
      <Badge variant={statusVariantMap[patient.status] || 'neutral'}>{patient.status}</Badge>
      <div className="patient-list-item__vitals">
        <span><HeartIcon /> {patient.vitals.heartRate}</span>
        <span><PressureIcon /> {patient.vitals.bloodPressure}</span>
      </div>
    </div>
  );
};
