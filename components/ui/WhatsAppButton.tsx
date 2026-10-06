// Floating WhatsApp chat button, fixed to the bottom-right corner of the
// viewport — replaces the old "back to top" button in the same spot.
// Opens a chat with the business number in a new tab via the wa.me deep link.
import { FaWhatsapp } from "react-icons/fa6";

// +234 706 699 1031, in the digits-only/no-leading-zero format wa.me expects.
const WHATSAPP_NUMBER = "2347066991031";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
