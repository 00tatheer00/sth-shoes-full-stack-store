import React from 'react';

interface JsonLdProps {
  type: 'Organization' | 'Product' | 'BreadcrumbList' | 'WebSite';
  data: any;
}

export const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  let schemaData: any = {};

  if (type === 'Organization') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Tatheer Chappalz',
      url: 'https://tatheerchappalz.com',
      logo: 'https://tatheerchappalz.com/images/logo.png',
      description: 'Authentic handmade Peshawari Chappal crafted by master cobblers in Peshawar, Pakistan.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Namak Mandi Bazaar, Opposite Jahangirpura',
        addressLocality: 'Peshawar',
        addressRegion: 'Khyber Pakhtunkhwa',
        addressCountry: 'PK',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-300-9876543',
        contactType: 'customer service',
        areaServed: 'PK',
        availableLanguage: ['en', 'ur'],
      },
      sameAs: [
        'https://facebook.com/tatheerchappalz',
        'https://instagram.com/tatheerchappalz',
      ],
    };
  } else if (type === 'Product') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      image: data.images || [data.featuredImage],
      description: data.description || data.shortDescription,
      sku: data.sku || `TC-${data.slug}`,
      brand: {
        '@type': 'Brand',
        name: 'Tatheer Chappalz',
      },
      offers: {
        '@type': 'Offer',
        url: `https://tatheerchappalz.com/product/${data.slug}`,
        priceCurrency: 'PKR',
        price: data.salePrice || data.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: data.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Tatheer Chappalz',
        },
      },
      aggregateRating: data.rating ? {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount || 42,
      } : undefined,
    };
  } else if (type === 'BreadcrumbList') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map((item: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `https://tatheerchappalz.com${item.url}`,
      })),
    };
  } else if (type === 'WebSite') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Tatheer Chappalz',
      url: 'https://tatheerchappalz.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://tatheerchappalz.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
