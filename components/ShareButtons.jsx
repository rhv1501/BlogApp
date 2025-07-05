"use client";
import { FaFacebook, FaLinkedin, FaTwitter, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ShareButtons({ title, url }) {
  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
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