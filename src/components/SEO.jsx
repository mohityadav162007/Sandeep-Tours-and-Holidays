import React, { useEffect } from 'react';

const SEO = ({ title, description, keywords, url, image }) => {
    useEffect(() => {
        // Update Document Title
        document.title = title || 'Sandeep Tours & Holidays | Best Travel Agency in India';

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Explore incredible tour packages with Sandeep Tours & Holidays. We offer the best travel experiences, car rentals, and personalized tours across India.');
        }

        // Update Meta Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords || 'tours and travels, travel agency, tour packages, car rental, Sandeep Tours, India tourism');
        }

        // Update Open Graph Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', url || window.location.href);

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) ogImage.setAttribute('content', image || 'https://sandeeptoursandholidays.xyz/og-image.jpg');

        // Update Twitter Tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', title);

        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute('content', description);

    }, [title, description, keywords, url, image]);

    return null;
};

export default SEO;
