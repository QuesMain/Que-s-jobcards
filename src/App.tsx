import React, { useState, useEffect } from 'react';
import { FileDown, RotateCcw } from 'lucide-react';

export default function JobCard() {
  const [jobData, setJobData] = useState({
    jobNumber: '',
    date: new Date().toISOString().split('T')[0],
    sapNumber: '',
    afNumber: '',
    client: '',
    location: '',
    requirement: '',
    arrivalTime: '',
    departureTime: '',
    hoursWorked: '',
    mileage: '',
    dayOfWeek: [] as string[],
    serviceType: [] as string[],
    workDescriptionNotes: '',
    workDescription: [] as { partNo: string; qty: string; description: string }[],
    technicianName: '',
    customerName: '',
  });

  useEffect(() => {
    const generateJobNumber = () => {
      let counter = parseInt(localStorage.getItem('quesJobCounter') || '3999', 10);
      counter += 1;
      localStorage.setItem('quesJobCounter', String(counter));
      return `QJC-${counter}`;
    };
    setJobData(prev => ({ ...prev, jobNumber: generateJobNumber() }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category: 'dayOfWeek' | 'serviceType', value: string) => {
    setJobData(prev => {
      const currentArray = prev[category] || [];
      const updated = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleWorkDescriptionChange = (index: number, field: string, value: string) => {
    setJobData(prev => {
      const updated = [...prev.workDescription];
      if (!updated[index]) updated[index] = { partNo: '', qty: '', description: '' };
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, workDescription: updated };
    });
  };

  const addWorkRow = () => {
    setJobData(prev => ({
      ...prev,
      workDescription: [...prev.workDescription, { partNo: '', qty: '', description: '' }]
    }));
  };

  const resetForm = () => {
    let counter = parseInt(localStorage.getItem('quesJobCounter') || '3999', 10);
    counter += 1;
    localStorage.setItem('quesJobCounter', String(counter));
    setJobData({
      jobNumber: `QJC-${counter}`,
      date: new Date().toISOString().split('T')[0],
      sapNumber: '', afNumber: '', client: '', location: '', requirement: '',
      arrivalTime: '', departureTime: '', hoursWorked: '', mileage: '',
      dayOfWeek: [], serviceType: [], workDescriptionNotes: '',
      workDescription: [], technicianName: '', customerName: '',
    });
  };

  const handlePrint = () => { window.print(); };

  const daysOfWeek = ['MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT', 'SUN', 'N/T', 'O/T'];
  const serviceTypes = [
    { label: 'DELIVERY', id: 'delivery' },
    { label: 'COURTESY CALL', id: 'courtesy' },
    { label: 'INSTALLATION', id: 'installation' },
    { label: 'WORKSHOP', id: 'workshop' },
    { label: 'BREAKDOWN', id: 'breakdown' },
    { label: 'PLANNED MAINT', id: 'plannedMaint' },
    { label: 'WARRANTY', id: 'warranty' },
    { label: 'OTHER', id: 'other' }
  ];

  // Safari-compatible checkbox: we render a visible div that we control ourselves
  const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      style={{
        width: 18, height: 18, minWidth: 18,
        border: '2px solid #9ca3af',
        borderRadius: 3,
        backgroundColor: checked ? '#111827' : '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '16px' }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        input, textarea, select { font-family: inherit; font-size: 14px; }
        .field-label { display: block; font-size: 11px; font-weight: 700; color: #111827; margin-bottom: 4px; letter-spacing: 0.05em; }
        .field-input {
          width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;
          font-size: 14px; color: #111827; background: #fff; outline: none;
          -webkit-appearance: none; appearance: none;
        }
        .field-input:focus { border-color: #111827; box-shadow: 0 0 0 2px rgba(17,24,39,0.15); }
        textarea.field-input { resize: none; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .checkbox-label { font-size: 11px; font-weight: 600; color: #111827; user-select: none; }
        .section-gap { margin-bottom: 20px; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 680px) { .two-col { grid-template-columns: 1fr; } }
        @media print {
          body { margin: 0; padding: 0; background: white; }
          .no-print { display: none !important; }
          .job-card { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
        .table-input {
          width: 100%; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px;
          font-size: 12px; -webkit-appearance: none; appearance: none; background: #fff;
        }
        .table-input:focus { border-color: #111827; outline: none; }
      `}</style>

      {/* Action Bar */}
      <div className="no-print" style={{ display: 'flex', gap: 12, marginBottom: 16, justifyContent: 'flex-end' }}>
        <button onClick={handlePrint} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
          backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: 6,
          fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>
          <FileDown size={16} /> Save as PDF
        </button>
        <button onClick={resetForm} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
          backgroundColor: '#374151', color: '#fff', border: 'none', borderRadius: 6,
          fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>
          <RotateCcw size={16} /> New Card
        </button>
      </div>

      {/* Job Card */}
      <div className="job-card" style={{
        backgroundColor: '#fff', borderRadius: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '24px 28px', maxWidth: 900, margin: '0 auto',
      }}>

        {/* Header */}
        <div style={{ borderBottom: '2px solid #111827', paddingBottom: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            {/* Logo */}
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>QUE'S</div>
              <div style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>Maintenance Services</div>
            </div>
            {/* Address */}
            <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.6, textAlign: 'center', flex: 1 }}>
              <div>Postnet Suite 027, Po Box 28004, Sunridge</div>
              <div>Port Elizabeth, Eastern Cape, 6008, South Africa</div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid #e5e7eb' }}>
                Cell: +27 (0) 71 873 1503 &nbsp;|&nbsp; Fax: +27 (0) 86 621 9355 &nbsp;|&nbsp; Email: ques.me@gmail.com
              </div>
            </div>
            {/* Job Number */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: '#111827' }}>{jobData.jobNumber}</div>
              <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>JOB CARD</div>
            </div>
          </div>
        </div>

        {/* Two Column Details */}
        <div className="two-col" style={{ marginBottom: 24 }}>

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="field-label">DATE</label>
              <input type="date" name="date" value={jobData.date} onChange={handleInputChange} className="field-input" />
            </div>
            <div className="grid-2">
              <div>
                <label className="field-label">SAP NUMBER</label>
                <input type="text" name="sapNumber" value={jobData.sapNumber} onChange={handleInputChange} placeholder="SAP #" className="field-input" />
              </div>
              <div>
                <label className="field-label">AF NUMBER</label>
                <input type="text" name="afNumber" value={jobData.afNumber} onChange={handleInputChange} placeholder="AF #" className="field-input" />
              </div>
            </div>
            <div>
              <label className="field-label">CLIENT</label>
              <textarea name="client" value={jobData.client} onChange={handleInputChange} rows={3} placeholder="Client details..." className="field-input" />
            </div>
            <div>
              <label className="field-label">LOCATION</label>
              <textarea name="location" value={jobData.location} onChange={handleInputChange} rows={2} placeholder="Job location..." className="field-input" />
            </div>
            <div>
              <label className="field-label">REQUIREMENT</label>
              <textarea name="requirement" value={jobData.requirement} onChange={handleInputChange} rows={2} placeholder="Job requirement..." className="field-input" />
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid-2">
              <div>
                <label className="field-label">ARRIVAL</label>
                <input type="time" name="arrivalTime" value={jobData.arrivalTime} onChange={handleInputChange} className="field-input" />
              </div>
              <div>
                <label className="field-label">DEPARTURE</label>
                <input type="time" name="departureTime" value={jobData.departureTime} onChange={handleInputChange} className="field-input" />
              </div>
            </div>
            <div className="grid-2">
              <div>
                <label className="field-label">HOURS WORKED</label>
                <input type="number" name="hoursWorked" value={jobData.hoursWorked} onChange={handleInputChange} step="0.5" placeholder="0" className="field-input" />
              </div>
              <div>
                <label className="field-label">MILEAGE</label>
                <input type="number" name="mileage" value={jobData.mileage} onChange={handleInputChange} placeholder="0" className="field-input" />
              </div>
            </div>

            {/* Days of Week */}
            <div>
              <label className="field-label" style={{ marginBottom: 8 }}>DAY OF WEEK</label>
              <div className="grid-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="checkbox-row" onClick={() => handleCheckboxChange('dayOfWeek', day)}>
                    <Checkbox checked={jobData.dayOfWeek.includes(day)} onChange={() => handleCheckboxChange('dayOfWeek', day)} />
                    <span className="checkbox-label">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="field-label" style={{ marginBottom: 8 }}>SERVICE TYPE</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {serviceTypes.map(service => (
                  <div key={service.id} className="checkbox-row" onClick={() => handleCheckboxChange('serviceType', service.id)}>
                    <Checkbox checked={jobData.serviceType.includes(service.id)} onChange={() => handleCheckboxChange('serviceType', service.id)} />
                    <span className="checkbox-label">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Description */}
        <div style={{ marginBottom: 24 }}>
          <label className="field-label" style={{ marginBottom: 6 }}>DESCRIPTION OF WORK DONE</label>
          <textarea
            name="workDescriptionNotes"
            value={jobData.workDescriptionNotes}
            onChange={handleInputChange}
            rows={3}
            placeholder="Describe the overall work completed..."
            className="field-input"
            style={{ marginBottom: 16 }}
          />

          <label className="field-label" style={{ marginBottom: 6 }}>PARTS USED</label>
          <div style={{ overflowX: 'auto', border: '1px solid #d1d5db', borderRadius: 6 }}>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #d1d5db' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700 }}>PART DESCRIPTION</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, width: 100 }}>PART NO</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, width: 70 }}>QTY</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(Math.max(jobData.workDescription.length, 5))].map((_, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '6px 8px' }}>
                      <input type="text" value={jobData.workDescription[index]?.description || ''} onChange={(e) => handleWorkDescriptionChange(index, 'description', e.target.value)} placeholder="Part description..." className="table-input" />
                    </td>
                    <td style={{ padding: '6px 8px' }}>
                      <input type="text" value={jobData.workDescription[index]?.partNo || ''} onChange={(e) => handleWorkDescriptionChange(index, 'partNo', e.target.value)} placeholder="Part #" className="table-input" />
                    </td>
                    <td style={{ padding: '6px 8px' }}>
                      <input type="number" value={jobData.workDescription[index]?.qty || ''} onChange={(e) => handleWorkDescriptionChange(index, 'qty', e.target.value)} placeholder="0" className="table-input" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addWorkRow} className="no-print" style={{
            marginTop: 8, padding: '4px 12px', fontSize: 12, fontWeight: 500,
            backgroundColor: '#e5e7eb', border: 'none', borderRadius: 4, cursor: 'pointer',
          }}>
            + Add Row
          </button>
        </div>

        {/* Signatures */}
        <div className="grid-2" style={{ paddingTop: 16, borderTop: '1px solid #d1d5db', gap: 24 }}>
          <div>
            <label className="field-label">TECHNICIAN'S NAME</label>
            <input type="text" name="technicianName" value={jobData.technicianName} onChange={handleInputChange} placeholder="Enter name..." className="field-input" style={{ marginBottom: 12 }} />
            <div style={{ borderTop: '2px solid #111827', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#9ca3af' }}>Signature</div>
          </div>
          <div>
            <label className="field-label">CUSTOMER NAME</label>
            <input type="text" name="customerName" value={jobData.customerName} onChange={handleInputChange} placeholder="Enter name..." className="field-input" style={{ marginBottom: 12 }} />
            <div style={{ borderTop: '2px solid #111827', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#9ca3af' }}>Signature</div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="no-print" style={{ marginTop: 16, textAlign: 'center', fontSize: 12, color: '#6b7280' }}>
        Job numbers auto-increment. Tap "New Card" for the next job.
      </div>
    </div>
  );
}
