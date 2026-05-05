import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { HeartIcon, PressureIcon, ThermometerIcon } from './ui/Icons';
import type { Patient } from '@/types/patient';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
  onClick?: (patient: Patient) => void;
}

const statusVariantMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  Active: 'success',
  Recovering: 'info',
  Critical: 'danger',
  Inactive: 'neutral',
};

export const PatientCard = ({ patient, onClick }: PatientCardProps) => {
  return (
    <Card className="patient-card" hover={Boolean(onClick)} onClick={() => onClick?.(patient)}>
      <div className="patient-card__header">
        <img src={patient.avatar} alt="" className="patient-card__avatar" />
        <div className="patient-card__info">
          <h3 className="patient-card__name">{patient.firstName} {patient.lastName}</h3>
          <p className="patient-card__id">{patient.id} | {patient.age} years | {patient.gender}</p>
        </div>
        <Badge variant={statusVariantMap[patient.status] || 'neutral'}>{patient.status}</Badge>
      </div>

      <div className="patient-card__summary">
        <div className="patient-card__primary">
          <span className="patient-card__label">Condition</span>
          <span className="patient-card__primary-value">{patient.condition}</span>
        </div>
        <div className="patient-card__meta-grid">
          <div className="patient-card__detail">
            <span className="patient-card__label">Department</span>
            <span className="patient-card__value">{patient.department}</span>
          </div>
          <div className="patient-card__detail">
            <span className="patient-card__label">Doctor</span>
            <span className="patient-card__value">{patient.doctor}</span>
          </div>
          <div className="patient-card__detail">
            <span className="patient-card__label">Last Visit</span>
            <span className="patient-card__value">{patient.lastVisit}</span>
          </div>
          <div className="patient-card__detail">
            <span className="patient-card__label">Blood Type</span>
            <span className="patient-card__value">{patient.bloodType}</span>
          </div>
        </div>
      </div>

      <div className="patient-card__vitals">
        <div className="patient-card__vital">
          <span className="vital__icon"><HeartIcon /></span>
          <span className="vital__copy">
            <span className="vital__value">{patient.vitals.heartRate} bpm</span>
            <span className="vital__unit">Heart rate</span>
          </span>
        </div>
        <div className="patient-card__vital">
          <span className="vital__icon"><PressureIcon /></span>
          <span className="vital__copy">
            <span className="vital__value">{patient.vitals.bloodPressure}</span>
            <span className="vital__unit">Blood pressure</span>
          </span>
        </div>
        <div className="patient-card__vital patient-card__vital--wide">
          <span className="vital__icon"><ThermometerIcon /></span>
          <span className="vital__copy">
            <span className="vital__value">{patient.vitals.temperature}°F</span>
            <span className="vital__unit">Temperature</span>
          </span>
        </div>
      </div>
    </Card>
  );
};
