'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { Button } from './ui/Button';

export function NotificationCenter() {
  const { notifications, removeNotification } = useUIStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-400/30';
      case 'error':
        return 'bg-red-500/10 border-red-400/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-400/30';
      case 'info':
      default:
        return 'bg-blue-500/10 border-blue-400/30';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`glass-card p-4 ${getBackgroundColor(notification.type)} shadow-lg`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">
                  {notification.message}
                </p>
                <p className="text-xs text-purple-300 mt-1">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              <Button
                variant="icon"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 p-1 hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
