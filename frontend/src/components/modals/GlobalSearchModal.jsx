import React, { useState } from 'react';
import { Search, GraduationCap, Users, BookOpen, CreditCard, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SAMPLE_RESULTS = [
  { id: 1, title: 'Sarah Jenkins (STU-2026-8492)', category: 'Students', type: 'student', link: '/students' },
  { id: 2, title: 'Dr. Robert Vance (Prof. Computer Science)', category: 'Faculty', type: 'faculty', link: '/faculty' },
  { id: 3, title: 'CS-401 Advanced Distributed Systems', category: 'Courses', type: 'course', link: '/academics' },
  { id: 4, title: 'Receipt REC-2026-981240 ($1,200 Tuition)', category: 'Finance', type: 'finance', link: '/finance' },
];

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filtered = query.trim() === '' ? SAMPLE_RESULTS : SAMPLE_RESULTS.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) || r.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (link) => {
    navigate(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden animate-fadeIn border border-gray-100">
        <div className="p-4 border-b flex items-center gap-3 bg-gray-50">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, faculty, courses, transactions..."
            className="w-full bg-transparent text-sm font-medium focus:outline-none text-gray-900"
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No matching records found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.link)}
                className="p-3 hover:bg-blue-50 rounded-xl cursor-pointer flex items-center justify-between group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    {item.type === 'student' && <GraduationCap className="w-4 h-4" />}
                    {item.type === 'faculty' && <Users className="w-4 h-4" />}
                    {item.type === 'course' && <BookOpen className="w-4 h-4" />}
                    {item.type === 'finance' && <CreditCard className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition">{item.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">{item.category}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
