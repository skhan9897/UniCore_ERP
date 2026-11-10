import React, { useState } from 'react';
import ButtonLoader from '../loading/ButtonLoader';
import { CreditCard, X, CheckCircle, Receipt } from 'lucide-react';

const CollectFeeModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [formData, setFormData] = useState({
    studentId: 'STU-2026-8492',
    studentName: 'Sarah Jenkins',
    amount: '1200.00',
    feeType: 'Semester Tuition Fee',
    paymentMode: 'Credit / Debit Card',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReceipt({
        receiptNo: `REC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(),
        amount: formData.amount,
        studentName: formData.studentName,
        studentId: formData.studentId,
        feeType: formData.feeType,
        paymentMode: formData.paymentMode,
        status: 'VERIFIED SUCCESSFUL'
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Collect Fee / Issue Receipt</h3>
              <p className="text-xs text-gray-500">Instant gateway verification & automated PDF receipt</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {receipt ? (
          <div className="space-y-4 border p-4 rounded-xl bg-gray-50 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-100 p-2.5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Payment Verified & Receipt Generated!</span>
            </div>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between border-b py-1">
                <span className="font-semibold text-gray-500">Receipt No:</span>
                <span className="font-mono font-bold text-blue-600">{receipt.receiptNo}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="font-semibold text-gray-500">Student Name:</span>
                <span>{receipt.studentName} ({receipt.studentId})</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="font-semibold text-gray-500">Fee Category:</span>
                <span>{receipt.feeType}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="font-semibold text-gray-500">Amount Paid:</span>
                <span className="font-bold text-gray-900">${receipt.amount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-gray-500">Status:</span>
                <span className="font-bold text-emerald-600">{receipt.status}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`Receipt ${receipt.receiptNo} downloaded as PDF`);
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
              >
                <Receipt className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border text-gray-600 hover:bg-gray-100 text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600">Student ID / Enrollment</label>
              <input
                type="text"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-purple-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">Student Name</label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">Fee Category</label>
                <select
                  value={formData.feeType}
                  onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-purple-500"
                >
                  <option>Semester Tuition Fee</option>
                  <option>Examination Fee</option>
                  <option>Hostel & Mess Fee</option>
                  <option>Transport Pass Fee</option>
                  <option>Library Fine</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Amount ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-purple-500 font-bold text-gray-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border text-gray-600 hover:bg-gray-100 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow"
              >
                {loading ? <ButtonLoader text="Verifying..." /> : 'Process Collection'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CollectFeeModal;
