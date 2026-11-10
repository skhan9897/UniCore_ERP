import React, { useState } from 'react';
import ButtonLoader from '../../components/loading/ButtonLoader';
import { Settings, Save, ShieldCheck, Database, Lock, CheckCircle } from 'lucide-react';

const SystemSettings = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    tenantIsolationMode: 'Strict Database & Routing Context',
    jwtExpirationHours: '24',
    sessionTimeoutMins: '30',
    maintenanceMode: false,
    auditLoggingEnabled: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-7 h-7 text-blue-600" />
            Global ERP System Configurations
          </h1>
          <p className="text-sm text-gray-500 mt-1">Multi-Tenant Isolation, JWT Security Policies & System Auditing</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>System configurations saved and synchronized successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b pb-2">Security & Tenant Rules</h3>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600">Tenant Isolation Policy</label>
            <input
              type="text"
              disabled
              value={settings.tenantIsolationMode}
              className="w-full px-3 py-2 border rounded-lg text-sm mt-1 bg-gray-50 text-blue-600 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600">JWT Token Expiry (Hours)</label>
              <input
                type="number"
                value={settings.jwtExpirationHours}
                onChange={(e) => setSettings({ ...settings, jwtExpirationHours: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600">Idle Session Timeout (Minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeoutMins}
                onChange={(e) => setSettings({ ...settings, sessionTimeoutMins: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition"
          >
            {saving ? <ButtonLoader text="Saving Configurations..." /> : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;
