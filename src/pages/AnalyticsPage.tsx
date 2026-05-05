import { usePatientStore } from '@/store/patientStore';
import { Card } from '@/components/ui/Card';
import { BarChart } from '@/components/Chart/BarChart';
import { LineChart } from '@/components/Chart/LineChart';
import './AnalyticsPage.css';

export const AnalyticsPage = () => {
  const { getStatusCounts, patients } = usePatientStore();
  const counts = getStatusCounts();

  const statusData = [
    { label: 'Active', value: counts.Active || 0, color: '#15803d' },
    { label: 'Recover', value: counts.Recovering || 0, color: '#2563eb' },
    { label: 'Critical', value: counts.Critical || 0, color: '#dc2626' },
    { label: 'Inactive', value: counts.Inactive || 0, color: '#64748b' },
  ];

  const departmentData = Array.from(new Set(patients.map((patient) => patient.department))).map((department) => ({
    label: department.slice(0, 4),
    value: patients.filter((patient) => patient.department === department).length,
  }));

  const ageData = [
    { label: '20-30', value: patients.filter((patient) => patient.age >= 20 && patient.age < 30).length },
    { label: '30-40', value: patients.filter((patient) => patient.age >= 30 && patient.age < 40).length },
    { label: '40-50', value: patients.filter((patient) => patient.age >= 40 && patient.age < 50).length },
    { label: '50-60', value: patients.filter((patient) => patient.age >= 50 && patient.age < 60).length },
    { label: '60+', value: patients.filter((patient) => patient.age >= 60).length },
  ];

  const monthlyVisits = [
    { label: 'Aug', value: 42 },
    { label: 'Sep', value: 38 },
    { label: 'Oct', value: 55 },
    { label: 'Nov', value: 48 },
    { label: 'Dec', value: 62 },
    { label: 'Jan', value: patients.length },
  ];

  const avgHeartRate = Math.round(
    patients.reduce((sum, patient) => sum + patient.vitals.heartRate, 0) / patients.length,
  );

  return (
    <div className="analytics">
      <div className="page-header">
        <span className="page-header__eyebrow">Analytics Studio</span>
        <h1>Performance patterns across care delivery.</h1>
        <p>
          Review census distribution, department balance, and visit trends to spot
          pressure before it affects throughput.
        </p>
      </div>

      <div className="analytics__kpis">
        <Card className="analytics__kpi">
          <span className="analytics__kpi-value">{patients.length}</span>
          <span className="analytics__kpi-label">Total Patients</span>
        </Card>
        <Card className="analytics__kpi">
          <span className="analytics__kpi-value">{avgHeartRate}</span>
          <span className="analytics__kpi-label">Avg Heart Rate (bpm)</span>
        </Card>
        <Card className="analytics__kpi">
          <span className="analytics__kpi-value">{patients.filter((patient) => patient.status === 'Critical').length}</span>
          <span className="analytics__kpi-label">Critical Cases</span>
        </Card>
        <Card className="analytics__kpi">
          <span className="analytics__kpi-value">{new Set(patients.map((patient) => patient.doctor)).size}</span>
          <span className="analytics__kpi-label">Active Doctors</span>
        </Card>
      </div>

      <Card className="analytics__overview" padding="lg">
        <div>
          <span className="analytics__overview-label">Care trend</span>
          <h2 className="analytics__overview-title">Throughput is strongest in pulmonology and cardiology this cycle.</h2>
        </div>
        <p className="analytics__overview-copy">
          Recovering and active cohorts remain the largest share of the population, which
          indicates stable treatment progression and room to focus care coordination on the
          smaller critical set.
        </p>
      </Card>

      <div className="analytics__charts">
        <Card className="analytics__chart">
          <h3 className="analytics__chart-title">Patient Status Distribution</h3>
          <BarChart data={statusData} height={220} />
        </Card>

        <Card className="analytics__chart">
          <h3 className="analytics__chart-title">Departments</h3>
          <BarChart data={departmentData} height={220} />
        </Card>

        <Card className="analytics__chart analytics__chart--wide">
          <h3 className="analytics__chart-title">Monthly Patient Visits</h3>
          <LineChart data={monthlyVisits} height={220} />
        </Card>

        <Card className="analytics__chart">
          <h3 className="analytics__chart-title">Age Distribution</h3>
          <BarChart data={ageData} height={220} />
        </Card>
      </div>
    </div>
  );
};
