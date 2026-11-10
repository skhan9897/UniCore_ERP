import React, { useState } from 'react';
import CollectFeeModal from '../../components/modals/CollectFeeModal';
import { CreditCard, Plus, Search, DollarSign, AlertCircle, CheckCircle, Download, Receipt } from 'lucide-react';

const SAMPLE_TRANSACTIONS = [
  { receiptNo: 'REC-2026-981240', studentName: 'Sarah Jenkins', studentId: 'STU-2026-8492', feeType: 'Semester Tuition Fee', amount: '$1,200.00', date: '2026-11-10', mode: 'Credit Card', status: 'VERIFIED SUCCESSFUL' },
  { receiptNo: 'REC-2026-871239', studentName: 'Michael Chang', studentId: 'STU-2026-7321', feeType: 'Hostel & Mess Fee', amount: '$850.00', date: '2026-11-09', mode: 'UPI Gateway', status: 'VERIFIED SUCCESSFUL' },
  { receiptNo: 'REC-2026-651284', studentName: 'Emily Davis', studentId: 'STU-2026-9104', feeType: 'Examination Fee', amount: '$150.00', date: '2026-11-08', mode: 'Net Banking', status: 'VERIFIED SUCCESSFUL' },
];

const FeeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-purple-600" />
            Fees & Financial Ledger
          </h1>
          <p className="text-sm text-gray-500 mt-1">Total Collections: $1,450,800.00 • Pending Dues: $124,500.00</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Collect Fee / Issue Receipt</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Fee Collection</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">$1,450,800.00</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">↑ 14.2% vs last semester</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Pending Fee Dues</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">$124,500.00</h3>
          <p className="text-xs text-gray-500 mt-1">42 Defaulters flagged</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Payment Gateway Verification</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">100% Idempotent</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">✓ Instant Webhook Confirmation</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search receipt no, student, fee category..."
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Receipt No</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Fee Category</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Payment Mode</th>
                <th className="px-6 py-3">Verification</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SAMPLE_TRANSACTIONS.map((t) => (
                <tr key={t.receiptNo} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-purple-700">{t.receiptNo}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{t.studentName} <span className="text-xs text-gray-400">({t.studentId})</span></td>
                  <td className="px-6 py-4 text-gray-600">{t.feeType}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{t.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{t.mode}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      <CheckCircle className="w-3 h-3" />
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => alert(`Downloading Receipt ${t.receiptNo}`)} className="text-xs text-purple-600 hover:text-purple-800 font-semibold flex items-center justify-end gap-1 ml-auto">
                      <Receipt className="w-3.5 h-3.5" />
                      <span>PDF Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CollectFeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FeeManagement;
