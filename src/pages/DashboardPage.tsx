import { Link } from 'react-router-dom';
import { usePatientStore } from '@/store/patientStore';
import { useNotificationStore } from '@/store/notificationStore';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/StatCard';
import { PatientCard } from '@/components/PatientCard';
import { Button } from '@/components/ui/Button';
import { AlertIcon, PeopleIcon, PulseIcon, RecoveryIcon } from '@/components/ui/Icons';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { patients, getStatusCounts } = usePatientStore();
  const { addNotification } = useNotificationStore();
  const counts = getStatusCounts();

  const recentPatients = patients.slice(0, 4);
  const criticalPatients = patients.filter((patient) => patient.status === 'Critical').slice(0, 3);
  const appointmentsToday = patients.filter((patient) => patient.nextAppointment === '2025-04-29').length;
  const monitoredUnits = new Set(patients.map((patient) => patient.department)).size;

  const handleEmergencyAlert = () => {
    addNotification({
      title: 'Emergency Alert',
      message: 'Rapid response requested in ICU. Care escalation routed to the on-call team.',
      type: 'error',
    });
  };

  return (
    <div className="dashboard">
      <Card className="dashboard__hero" padding="lg">
        <div>
          <span className="dashboard__eyebrow">Operations Command</span>
          <h1 className="dashboard__hero-title">A sharper view of hospital flow and patient risk.</h1>
          <p className="dashboard__hero-copy">
            Track active care, triage pressure, and department performance from a single
            workspace built for healthcare operations teams.
          </p>
        </div>
        <div className="dashboard__hero-actions">
          <div className="dashboard__hero-metrics">
            <div>
              <span>Appointments today</span>
              <strong>{appointmentsToday || 4}</strong>
            </div>
            <div>
              <span>Monitored units</span>
              <strong>{monitoredUnits}</strong>
            </div>
          </div>
          <Button size="lg" onClick={handleEmergencyAlert}>
            Trigger escalation
          </Button>
        </div>
      </Card>

      <div className="dashboard__stats">
        <StatCard label="Total Patients" value={patients.length} icon={<PeopleIcon />} trend="+12%" trendUp={true} />
        <StatCard label="Active Cases" value={counts.Active || 0} icon={<PulseIcon />} trend="+5%" trendUp={true} />
        <StatCard label="Critical" value={counts.Critical || 0} icon={<AlertIcon />} trend="-2%" trendUp={false} />
        <StatCard label="Recovering" value={counts.Recovering || 0} icon={<RecoveryIcon />} trend="+8%" trendUp={true} />
      </div>

      <div className="dashboard__grid">
        <Card className="dashboard__section">
          <div className="dashboard__section-header">
            <h2>Recent Patients</h2>
            <Link to="/patients" className="dashboard__link">View all</Link>
          </div>
          <div className="dashboard__patients">
            {recentPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </Card>

        <Card className="dashboard__section">
          <div className="dashboard__section-header">
            <h2>Critical Alerts</h2>
            <Button size="sm" variant="danger" onClick={handleEmergencyAlert}>
              Test alert
            </Button>
          </div>
          {criticalPatients.length > 0 ? (
            <div className="dashboard__alerts">
              {criticalPatients.map((patient) => (
                <div key={patient.id} className="dashboard__alert">
                  <span className="dashboard__alert-dot" />
                  <div>
                    <strong>{patient.firstName} {patient.lastName}</strong>
                    <p>{patient.condition} - {patient.department}</p>
                  </div>
                  <span className="dashboard__alert-time">{patient.lastVisit}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard__empty">No critical alerts at this time.</p>
          )}
        </Card>

        <Card className="dashboard__section dashboard__section--wide">
          <div className="dashboard__section-header">
            <h2>Department Overview</h2>
            <span className="surface-note">Operational load by care unit</span>
          </div>
          <div className="dashboard__departments">
            {Array.from(new Set(patients.map((patient) => patient.department))).map((department) => {
              const departmentPatients = patients.filter((patient) => patient.department === department);
              const active = departmentPatients.filter((patient) => patient.status === 'Active').length;
              return (
                <div key={department} className="dashboard__dept">
                  <span className="dashboard__dept-name">{department}</span>
                  <div className="dashboard__dept-bar">
                    <div
                      className="dashboard__dept-fill"
                      style={{ width: `${(active / departmentPatients.length) * 100}%` }}
                    />
                  </div>
                  <span className="dashboard__dept-count">{departmentPatients.length} patients</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
