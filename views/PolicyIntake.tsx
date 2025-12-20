import React, { useState, useRef } from 'react';
import { Plus, UploadCloud, Play, X, MapPin, FileText, Trash2 } from 'lucide-react';
import { PolicyData } from '../types';

interface PolicyIntakeProps {
  onRunSimulation: (data: PolicyData) => void;
}

const PREDEFINED_DEMOGRAPHICS = [
  "Low Income",
  "Single Parents",
  "Senior Citizens",
  "Veterans",
  "Students",
  "Non-Native Speakers",
  "Persons with Disabilities",
  "Small Business Owners",
  "Renters",
  "Homeowners",
  "Commuters"
];

const PolicyIntake: React.FC<PolicyIntakeProps> = ({ onRunSimulation }) => {
  const [title, setTitle] = useState("Downtown Zoning Reform Initiative 2024");
  const [description, setDescription] = useState("");
  const [demographics, setDemographics] = useState(['Low Income', 'Single Parents']);
  const [location, setLocation] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddDemographic = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !demographics.includes(value)) {
      setDemographics([...demographics, value]);
    }
    // Reset select to default
    e.target.value = "";
  };

  const removeDemographic = (tag: string) => {
    setDemographics(demographics.filter(d => d !== tag));
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunSimulation({
      title: title || "Untitled Policy Assessment",
      description: description || "No description provided.",
      location: location || "Unknown Location",
      demographics,
      fileName: selectedFile?.name,
      fileSize: selectedFile ? (selectedFile.size / 1024).toFixed(1) + ' KB' : undefined,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  const recentAssessments = [
    {
      title: "Public Park Renovation Plan B",
      location: "Seattle, WA",
      date: "2 days ago",
      score: 78,
      status: "High"
    },
    {
      title: "Downtown Traffic Congestion Tax",
      location: "New York, NY",
      date: "1 week ago",
      score: 45,
      status: "Low"
    },
    {
      title: "Suburban Library Funding Cut",
      location: "Chicago, IL",
      date: "2 weeks ago",
      score: 62,
      status: "Medium"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 50) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Policy Intake</h1>
          <p className="text-slate-500">Define the parameters for a new empathy simulation.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-sky-100 p-2 rounded-lg">
              <Plus className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Start a New Policy Assessment</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Policy Name - Simplified Label */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Policy Name</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-slate-900 placeholder-slate-400"
                placeholder="Ex: Downtown Zoning Reform Initiative 2024"
              />
            </div>

            {/* Description - Simplified Label */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Paste the executive summary or key policy points here..."
              ></textarea>
            </div>

            {/* Grid for Location & Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Location - Simplified Label */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-slate-900 placeholder-slate-400"
                    placeholder="Enter City, State..."
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Demographics - Simplified Label */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Demographics</label>
                <div className="space-y-3">
                  <select 
                    onChange={handleAddDemographic}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-slate-900 bg-white cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select demographics...</option>
                    {PREDEFINED_DEMOGRAPHICS.filter(d => !demographics.includes(d)).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {demographics.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md bg-sky-50 text-sm font-medium text-sky-700 border border-sky-100">
                        {tag}
                        <button type="button" onClick={() => removeDemographic(tag)} className="ml-1.5 hover:text-sky-900">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload - Simplified Label */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload Document</label>
              <div 
                onClick={handleFileClick}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                  selectedFile 
                    ? 'border-sky-200 bg-sky-50' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.txt"
                />

                {selectedFile ? (
                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-sky-100">
                      <FileText className="w-8 h-8 text-sky-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button 
                      onClick={handleRemoveFile}
                      className="p-2 hover:bg-red-100 rounded-full text-slate-400 hover:text-red-500 transition-colors ml-2"
                      title="Remove file"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="bg-sky-50 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-sky-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">Click to upload or drag and drop</h3>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOCX, or TXT (Max 10MB)</p>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm shadow-sky-200"
              >
                <Play className="w-4 h-4 fill-current" />
                Run Empathy Simulation
              </button>
            </div>

          </form>
        </div>

        {/* Recent Assessments Section */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Assessments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentAssessments.map((assessment, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                   <div className={`px-2 py-1 rounded-md text-xs font-bold border ${getScoreColor(assessment.score)}`}>
                    Score: {assessment.score}
                   </div>
                   <span className="text-xs text-slate-400">{assessment.date}</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1 leading-tight">{assessment.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {assessment.location}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PolicyIntake;