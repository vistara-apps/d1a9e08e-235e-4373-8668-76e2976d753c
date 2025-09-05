'use client';

import { useState } from 'react';
import { Lock, CreditCard, Check } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { useUser } from '@/lib/hooks/useUser';

interface PremiumGateProps {
  contentId: string;
  contentType: 'guide' | 'contact' | 'pack';
  title: string;
  description: string;
  price: string;
  children: React.ReactNode;
  userId?: string;
}

export function PremiumGate({ 
  contentId, 
  contentType, 
  title, 
  description, 
  price, 
  children, 
  userId 
}: PremiumGateProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const { user, hasAccess, purchasePack } = useUser(userId);

  // If user has access, show the content
  if (hasAccess(contentId, true)) {
    return <>{children}</>;
  }

  const handlePurchase = async () => {
    setPurchasing(true);
    
    try {
      // In a real app, this would integrate with Base wallet for payment
      // For now, we'll simulate a successful purchase
      const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      const result = await purchasePack(contentId, mockTransactionHash);
      
      if (result) {
        setShowPurchaseModal(false);
        // Content will automatically show due to hasAccess check
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <Card className="relative overflow-hidden">
        {/* Blurred preview */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/70 to-transparent flex items-center justify-center">
          <div className="text-center p-6 max-w-sm">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-yellow-400" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-purple-200 text-sm mb-4">{description}</p>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold text-yellow-400">{price}</span>
              <span className="text-purple-300 text-sm">one-time</span>
            </div>
            
            <Button
              variant="primary"
              onClick={() => setShowPurchaseModal(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Unlock Now
            </Button>
            
            <p className="text-xs text-purple-400 mt-3">
              Secure payment via Base network
            </p>
          </div>
        </div>
      </Card>

      {/* Purchase Modal */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        title="Unlock Premium Content"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-purple-200">{description}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white">Price:</span>
              <span className="text-2xl font-bold text-yellow-400">{price}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/70">Network:</span>
              <span className="text-blue-400">Base</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Access:</span>
              <span className="text-green-400">Lifetime</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-purple-200">
              <Check className="w-4 h-4 text-green-400" />
              <span>Instant access after payment</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-purple-200">
              <Check className="w-4 h-4 text-green-400" />
              <span>Secure on-chain transaction</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-purple-200">
              <Check className="w-4 h-4 text-green-400" />
              <span>No recurring charges</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowPurchaseModal(false)}
              className="flex-1"
              disabled={purchasing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePurchase}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
              disabled={purchasing}
            >
              {purchasing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {price}
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-purple-400 text-center">
            By purchasing, you agree to our terms of service. Payment is processed securely on the Base network.
          </p>
        </div>
      </Modal>
    </>
  );
}
