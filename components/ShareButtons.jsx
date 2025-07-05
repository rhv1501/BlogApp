"use client";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaCopy,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";

export default function ShareButtons({ title, url }) {
  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedinUrl, "_blank", "width=600,height=400");
  };
  const shareToWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      title
    )}%20${encodeURIComponent(url)}`;
    window.open(whatsappUrl, "_blank", "width=600,height=400");
  };
  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(telegramUrl, "_blank", "width=600,height=400");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };
  const shareToEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Check out this article: ${url}`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, "_blank");
  };

  const shareToinstagram = () => {
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      url
    )}`;
    window.open(instagramUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="my-24">
      <p className="text-black font-semibold my-4">
        Share this article on social media
      </p>
      <div className="flex gap-4">
        <button
          onClick={shareToFacebook}
          className="hover:scale-110 transition-transform"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={32} color="#1877F2" />
        </button>
        <button
          onClick={shareToTwitter}
          className="hover:scale-110 transition-transform"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={32} color="#1DA1F2" />
        </button>
        <button
          onClick={shareToLinkedIn}
          className="hover:scale-110 transition-transform"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={32} color="#0A66C2" />
        </button>
        <button
          onClick={shareToinstagram}
          className="hover:scale-110 transition-transform"
          aria-label="Share on Instagram"
        >
          <FaInstagram size={32} color="#E1306C" />
        </button>
        <button
          onClick={shareToWhatsApp}
          className="hover:scale-110 transition-transform"
          aria-label="Share on WhatsApp"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            width={32}
            height={32}
            className="hover:scale-110 transition-transform"
          />
        </button>
        <button
          onClick={shareToEmail}
          className="hover:scale-110 transition-transform"
          aria-label="Share on Email"
        >
          <HiOutlineMail size={32} color="#000" />
        </button>
        <button
          onClick={shareToTelegram}
          className="hover:scale-110 transition-transform"
          aria-label="Share on Telegram"
        >
          <FaTelegram size={32} color="#24A1DE" />
        </button>
        <button
          onClick={copyLink}
          className="hover:scale-110 transition-transform"
          aria-label="Copy link"
        >
          <FaCopy size={32} color="#666" />
        </button>
      </div>
    </div>
  );
}
