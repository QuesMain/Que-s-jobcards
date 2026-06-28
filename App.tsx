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
    dayOfWeek: [],
    serviceType: [],
    workDescriptionNotes: '',
    workDescription: [],
    technicianName: '',
    customerName: '',
  });

  // Generate and manage job number on mount
  useEffect(() => {
    const generateJobNumber = () => {
      // Get or initialize counter from localStorage
      let counter = parseInt(localStorage.getItem('quesJobCounter') || '3999', 10);
      counter += 1;
      localStorage.setItem('quesJobCounter', counter);
      
      // Format: QJC-4000
      return `QJC-${counter}`;
    };
    
    setJobData(prev => ({
      ...prev,
      jobNumber: generateJobNumber()
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setJobData(prev => {
      const currentArray = prev[category] || [];
      const updated = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleWorkDescriptionChange = (index, field, value) => {
    setJobData(prev => {
      const updated = [...prev.workDescription];
      if (!updated[index]) {
        updated[index] = { partNo: '', qty: '', description: '' };
      }
      updated[index][field] = value;
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
    const generateJobNumber = () => {
      let counter = parseInt(localStorage.getItem('quesJobCounter') || '3999', 10);
      counter += 1;
      localStorage.setItem('quesJobCounter', counter);
      
      return `QJC-${counter}`;
    };
    
    setJobData({
      jobNumber: generateJobNumber(),
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
      dayOfWeek: [],
      serviceType: [],
      workDescriptionNotes: '',
      workDescription: [],
      technicianName: '',
      customerName: '',
    });
  };

  const handlePrint = () => {
    window.print();
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <style>{`
        @media print {
          body { margin: 0; padding: 0; background: white; }
          .no-print { display: none !important; }
          .job-card { background: white; box-shadow: none; margin: 0; }
          .job-card * { page-break-inside: avoid; }
        }
      `}</style>

      {/* Action Bar */}
      <div className="no-print flex gap-3 mb-4 justify-end">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition"
        >
          <FileDown size={16} />
          Save as PDF
        </button>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded text-sm font-medium hover:bg-gray-600 transition"
        >
          <RotateCcw size={16} />
          New Card
        </button>
      </div>

      {/* Job Card */}
      <div className="job-card bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
            {/* Left: Logo & Company Name */}
            <div>
              <h1 className="text-4xl font-black tracking-tight leading-tight">QUE'S</h1>
              <p className="text-sm text-gray-700 font-medium">Maintenance Services</p>
            </div>

            {/* Center: Address */}
            <div className="text-xs text-gray-700 leading-relaxed md:text-center flex-1">
              <div>Postnet Suite 027</div>
              <div>Po Box 28004</div>
              <div>Sunridge</div>
              <div>Port Elizabeth, Eastern Cape</div>
              <div>6008, South Africa</div>
              <div className="mt-2 pt-2 border-t border-gray-300">
                <div>Cell: +27 (0) 71 873 1503</div>
                <div>Fax: +27 (0) 86 621 9355</div>
                <div>Email: ques.me@gmail.com</div>
              </div>
            </div>

            {/* Right: Job Number */}
            <div className="text-right">
              <div className="text-2xl font-bold tracking-wider text-gray-900">{jobData.jobNumber}</div>
              <div className="text-xs text-gray-500 font-medium">QJC</div>
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left Column */}
          <div className="space-y-4">
            
            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">DATE</label>
              <input
                type="date"
                name="date"
                value={jobData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* SAP Number & AF Number */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">SAP NUMBER</label>
                <input
                  type="text"
                  name="sapNumber"
                  value={jobData.sapNumber}
                  onChange={handleInputChange}
                  placeholder="Enter SAP #"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">AF NUMBER</label>
                <input
                  type="text"
                  name="afNumber"
                  value={jobData.afNumber}
                  onChange={handleInputChange}
                  placeholder="Enter AF #"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Client */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">CLIENT</label>
              <textarea
                name="client"
                value={jobData.client}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter client details..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">LOCATION</label>
              <textarea
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                rows="2"
                placeholder="Enter location..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            {/* Requirement */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">REQUIREMENT</label>
              <textarea
                name="requirement"
                value={jobData.requirement}
                onChange={handleInputChange}
                rows="2"
                placeholder="Enter requirement..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            
            {/* Time & Mileage */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">ARRIVAL</label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={jobData.arrivalTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">DEPARTURE</label>
                <input
                  type="time"
                  name="departureTime"
                  value={jobData.departureTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">HOURS WORKED</label>
                <input
                  type="number"
                  name="hoursWorked"
                  value={jobData.hoursWorked}
                  onChange={handleInputChange}
                  step="0.5"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">MILEAGE</label>
                <input
                  type="number"
                  name="mileage"
                  value={jobData.mileage}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Days of Week */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">DAY OF WEEK</label>
              <div className="grid grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobData.dayOfWeek.includes(day)}
                      onChange={() => handleCheckboxChange('dayOfWeek', day)}
                      className="w-4 h-4 cursor-pointer appearance-none border-2 border-gray-400 rounded bg-white checked:bg-white checked:border-gray-600"
                    />
                    <span className="text-xs font-medium">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">SERVICE TYPE</label>
              <div className="grid grid-cols-2 gap-2">
                {serviceTypes.map(service => (
                  <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobData.serviceType.includes(service.id)}
                      onChange={() => handleCheckboxChange('serviceType', service.id)}
                      className="w-4 h-4 cursor-pointer appearance-none border-2 border-gray-400 rounded bg-white checked:bg-white checked:border-gray-600"
                    />
                    <span className="text-xs font-medium">{service.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Description Section */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-900 mb-2">DESCRIPTION OF WORK DONE</label>
          <textarea
            name="workDescriptionNotes"
            value={jobData.workDescriptionNotes}
            onChange={handleInputChange}
            rows="3"
            placeholder="Describe the overall work completed..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none mb-3"
          />
          
          <label className="block text-xs font-bold text-gray-900 mb-2">PARTS USED</label>
          <div className="overflow-x-auto border border-gray-300 rounded">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-3 py-2 text-left font-bold">PART DESCRIPTION</th>
                  <th className="px-3 py-2 text-left font-bold w-20">PART NO</th>
                  <th className="px-3 py-2 text-left font-bold w-16">QTY</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(Math.max(jobData.workDescription.length || 0, 5))].map((_, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={jobData.workDescription[index]?.description || ''}
                        onChange={(e) => handleWorkDescriptionChange(index, 'description', e.target.value)}
                        placeholder="Describe work completed..."
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={jobData.workDescription[index]?.partNo || ''}
                        onChange={(e) => handleWorkDescriptionChange(index, 'partNo', e.target.value)}
                        placeholder="Part #"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={jobData.workDescription[index]?.qty || ''}
                        onChange={(e) => handleWorkDescriptionChange(index, 'qty', e.target.value)}
                        placeholder="0"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addWorkRow}
            className="mt-2 px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 rounded transition no-print"
          >
            + Add Row
          </button>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-300">
          
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-2">TECHNICIAN'S NAME</label>
            <input
              type="text"
              name="technicianName"
              value={jobData.technicianName}
              onChange={handleInputChange}
              placeholder="Enter name..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black mb-3"
            />
            <div className="border-t-2 border-black h-16 flex items-center justify-center text-xs text-gray-500">
              Signature
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-900 mb-2">CUSTOMER NAME</label>
            <input
              type="text"
              name="customerName"
              value={jobData.customerName}
              onChange={handleInputChange}
              placeholder="Enter name..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black mb-3"
            />
            <div className="border-t-2 border-black h-16 flex items-center justify-center text-xs text-gray-500">
              Signature
            </div>
          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center text-xs text-gray-500 no-print">
        <p>Job numbers are automatically generated and increment sequentially. Click "New Card" for the next number.</p>
      </div>
    </div>
  );
}