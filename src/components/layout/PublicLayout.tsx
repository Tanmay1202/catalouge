import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { BRAND_NAME, getWhatsAppLink, getWhatsAppNumber } from '../../config/constants';

export const PublicLayout: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const whatsappNumber = getWhatsAppNumber();

  return (
    <div className="min-h-screen flex flex-col bg-cream text-brand-dark">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Contact & Enquiry Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Enquire with Us"
        maxWidth="md"
      >
        <div className="space-y-5 text-sm text-brand-dark">
          <p className="text-warm-gray leading-relaxed">
            Have a question regarding custom finishes, bulk enquiries, or a specific piece in our collection? Reach out directly via WhatsApp for rapid assistance.
          </p>

          <div className="p-4 rounded-lg bg-ivory border border-brand-border space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-warm-gray">Direct WhatsApp</p>
                <p className="text-sm font-medium">
                  {whatsappNumber ? `+${whatsappNumber}` : 'Online Chat Support'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-brown/10 text-brand-brown flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-warm-gray">Email Enquiries</p>
                <p className="text-sm font-medium">care@aurellejewels.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-brown flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-warm-gray">Catalogue Studio</p>
                <p className="text-sm font-medium">{BRAND_NAME} Studio & Showroom</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 bg-[#128C7E] hover:bg-[#075E54] text-white"
              onClick={() => {
                window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
                setIsContactOpen(false);
              }}
              leftIcon={<MessageCircle className="w-4 h-4 fill-current" />}
            >
              Open WhatsApp Chat
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsContactOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
