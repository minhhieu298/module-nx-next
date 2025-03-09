// components/SettingsPopup.jsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const SettingsPopup = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  if (!isOpen) return null;

  const handleDisplayClick = (e: any) => {
    e.preventDefault();
    router.push('/display');
    // Popup vẫn mở, chỉ URL thay đổi
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Settings</h3>
        <ul>
          <li>
            <a
              href="/display"
              onClick={handleDisplayClick}
              className={pathname === '/display' ? 'active' : ''}
            >
              Display
            </a>
          </li>
          {/* Các mục settings khác */}
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/account">Account</Link>
          </li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SettingsPopup;
