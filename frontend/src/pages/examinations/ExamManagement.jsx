import React, { useState } from 'react';
import PublishExamScheduleModal from '../../components/modals/PublishExamScheduleModal';
import { Calendar, Plus, Award, CheckCircle, FileText, Download } from 'lucide-react';

const ExamManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-7 h-7 text-amber-600" />
            Examinations & Results Governance
          </h1>
          <p className="text-sm text-gray-500 mt-1">Overall Pass Percentage: 96.8% • SGPA & CGPA Automatic Result Engine</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Publish Exam Schedule</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Student Pass Rate</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">96.8%</h3>
          <p className="text-xs text-gray-500 mt-1">2,372 students cleared all subjects</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Active Examinations</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">Fall 2026 Mid-Terms</h3>
          <p className="text-xs text-gray-500 mt-1">Nov 20 - Nov 30, 2026</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Grade System</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">10-Point Relative CGPA</h3>
          <p className="text-xs text-blue-600 font-medium mt-1">✓ Automated Marksheets & Transcripts</p>
        </div>
      </div>

      <PublishExamScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ExamManagement;
