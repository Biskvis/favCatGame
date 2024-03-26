import React from 'react';
import { FaFacebookF, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const ShareButtons = ({ url, title }) => {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const whatsappShareUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className='flex flex-row gap-8 p-8 text-lg'>
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
        <span>Share on Facebook</span>
      </a>
      <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
        <span>Share on WhatsApp</span>
      </a>
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
        <FaTwitter />
        <span>Share on Twitter</span>
      </a>
    </div>
  );
};

export default ShareButtons;
