'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

interface SanitizedContentProps {
  content: string;
  className?: string;
}

export default function SanitizedContent({ content, className = '' }: SanitizedContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content));
  }, [content]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
}