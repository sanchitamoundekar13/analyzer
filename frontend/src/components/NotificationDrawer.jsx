import React from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Clock, 
  Volume2, 
  VolumeX, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingDown,
  CheckCircle2
} from 'lucide-react';

export const NotificationDrawer = () => {
  const { 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    notifications, 
    markAllNotificationsAsRead, 
    setActiveTimelineToken, 
    setActivePassToken, 
    tokens, 
    setSelectedCenterId, 
    setFarmerActiveView, 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    t 
  } = usePortal();

  if (!isNotificationDrawerOpen) return null;

  const handleActionClick = (notif) => {
    if (notif.tokenNumber) {
      const match = tokens.find(t => t.tokenNumber === notif.tokenNumber);
      if (match) {
        setActiveTimelineToken(match);
        setActivePassToken(match);
        setFarmerActiveView('timeline');
      }
    } else if (notif.centerId) {
      setSelectedCenterId(notif.centerId);
      setFarmerActiveView('recommend');
    }
    setIsNotificationDrawerOpen(false);
  };

  const handleListenNotif = (notif) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(`${notif.title}. ${notif.message}`, language);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-300 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 bg-[#0B2545] text-white flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="w-5 h-5 text-amber-400" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {t.smartNotifTitle || 'Notification Inbox'}
                </h3>
                <span className="text-[10px] text-slate-300">
                  {notifications.filter(n => !n.read).length} unread updates
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={markAllNotificationsAsRead}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-white/10 text-xs flex items-center space-x-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Notifications */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => {
                return (
                  <div
                    key={notif.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 transition ${
                      notif.read
                        ? 'bg-slate-50 border-slate-200 opacity-80'
                        : 'bg-white border-blue-200 shadow-sm border-l-4 border-l-[#0B2545]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                        <Bell className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{notif.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleListenNotif(notif)}
                        className="px-2 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded flex items-center space-x-1"
                      >
                        <Volume2 className="w-3 h-3 text-slate-600" />
                        <span>Listen</span>
                      </button>

                      {notif.actionText && (
                        <button
                          onClick={() => handleActionClick(notif)}
                          className="px-2.5 py-1 text-[10px] font-bold bg-[#0B2545] hover:bg-[#07172C] text-white rounded shadow-sm flex items-center space-x-1"
                        >
                          <span>{notif.actionText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500">
            Automated KisanSetu Telemetry • Governed by Ministry of Consumer Affairs
          </div>
        </div>
      </div>
    </div>
  );
};
