/**
 * StructuredDataGenerator.ts
 * 
 * 生成各种类型的结构化数据的工具库，用于SEO优化
 */

export interface StructuredDataOptions {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  organizationName?: string;
  organizationLogo?: string;
}

/**
 * 生成Article类型的结构化数据
 */
export function generateArticleSchema(options: StructuredDataOptions): Record<string, any> {
  const {
    url,
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    authorName = 'Nano-Banana.Run Team',
    organizationName = 'Nano-Banana.Run',
    organizationLogo = 'https://nano-banana.run/logo.png',
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': description,
    'image': imageUrl,
    'datePublished': datePublished || new Date().toISOString(),
    'dateModified': dateModified || new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': authorName,
    },
    'publisher': {
      '@type': 'Organization',
      'name': organizationName,
      'logo': {
        '@type': 'ImageObject',
        'url': organizationLogo,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * 生成WebPage类型的结构化数据
 */
export function generateWebPageSchema(options: StructuredDataOptions): Record<string, any> {
  const {
    url,
    title,
    description,
    datePublished,
    dateModified,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    'url': url,
    'name': title,
    'description': description,
    'datePublished': datePublished || new Date().toISOString(),
    'dateModified': dateModified || new Date().toISOString(),
    'isPartOf': {
      '@type': 'WebSite',
      '@id': 'https://nano-banana.run/#website',
      'name': 'Nano-Banana.Run',
      'description': 'The definitive resource for Nano-Banana AI image editing model',
      'url': 'https://nano-banana.run/',
    }
  };
}

/**
 * 生成Product类型的结构化数据 (用于模型介绍页)
 */
export function generateProductSchema(options: {
  url: string;
  name: string;
  description: string;
  imageUrl: string;
  brand?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: string;
    url: string;
  }[];
  review?: {
    reviewRating: number;
    author: string;
    reviewBody?: string;
  }[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}): Record<string, any> {
  const {
    url,
    name,
    description,
    imageUrl,
    brand = 'Nano-Banana',
    offers = [],
    review = [],
    aggregateRating,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': name,
    'description': description,
    'image': imageUrl,
    'url': url,
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web browser',
    'brand': {
      '@type': 'Brand',
      'name': brand,
    },
    ...(offers.length > 0 && {
      'offers': offers.map(offer => ({
        '@type': 'Offer',
        'price': offer.price,
        'priceCurrency': offer.priceCurrency,
        'availability': offer.availability,
        'url': offer.url,
      })),
    }),
    ...(review.length > 0 && {
      'review': review.map(r => ({
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': r.reviewRating,
          'bestRating': 5,
        },
        'author': {
          '@type': 'Person',
          'name': r.author,
        },
        ...(r.reviewBody && { 'reviewBody': r.reviewBody }),
      })),
    }),
    ...(aggregateRating && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': aggregateRating.ratingValue,
        'reviewCount': aggregateRating.reviewCount,
      },
    }),
  };
}

/**
 * 生成FAQ类型的结构化数据
 */
export function generateFAQSchema(options: {
  questions: {
    question: string;
    answer: string;
  }[];
}): Record<string, any> {
  const { questions } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer,
      },
    })),
  };
}

/**
 * 生成HowTo类型的结构化数据 (用于教程页面)
 */
export function generateHowToSchema(options: {
  name: string;
  description: string;
  image?: string;
  estimatedCost?: {
    currency: string;
    value: number;
  };
  totalTime?: string; // ISO 8601 format (例如 "PT1H30M")
  supply?: string[];
  tool?: string[];
  steps: {
    name: string;
    text: string;
    image?: string;
    url?: string;
  }[];
}): Record<string, any> {
  const {
    name,
    description,
    image,
    estimatedCost,
    totalTime,
    supply = [],
    tool = [],
    steps,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    ...(image && { 'image': image }),
    ...(estimatedCost && {
      'estimatedCost': {
        '@type': 'MonetaryAmount',
        'currency': estimatedCost.currency,
        'value': estimatedCost.value,
      },
    }),
    ...(totalTime && { 'totalTime': totalTime }),
    ...(supply.length > 0 && {
      'supply': supply.map(s => ({
        '@type': 'HowToSupply',
        'name': s,
      })),
    }),
    ...(tool.length > 0 && {
      'tool': tool.map(t => ({
        '@type': 'HowToTool',
        'name': t,
      })),
    }),
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      ...(step.image && { 'image': step.image }),
      ...(step.url && { 'url': step.url }),
    })),
  };
}

/**
 * 生成BreadcrumbList类型的结构化数据
 */
export function generateBreadcrumbSchema(options: {
  items: {
    name: string;
    item: string;
  }[];
}): Record<string, any> {
  const { items } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item,
    })),
  };
}

/**
 * 生成WebSite类型的结构化数据
 */
export function generateWebSiteSchema(options: {
  url: string;
  name: string;
  description: string;
  searchUrl?: string;
}): Record<string, any> {
  const {
    url,
    name,
    description,
    searchUrl,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    'url': url,
    'name': name,
    'description': description,
    ...(searchUrl && {
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': searchUrl,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

/**
 * 生成Organization类型的结构化数据
 */
export function generateOrganizationSchema(options: {
  url: string;
  name: string;
  logo: string;
  description: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string[];
  }[];
}): Record<string, any> {
  const {
    url,
    name,
    logo,
    description,
    sameAs = [],
    contactPoint = [],
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    'name': name,
    'url': url,
    'logo': logo,
    'description': description,
    ...(sameAs.length > 0 && { 'sameAs': sameAs }),
    ...(contactPoint.length > 0 && {
      'contactPoint': contactPoint.map(cp => ({
        '@type': 'ContactPoint',
        'telephone': cp.telephone,
        'contactType': cp.contactType,
        ...(cp.email && { 'email': cp.email }),
        ...(cp.areaServed && { 'areaServed': cp.areaServed }),
      })),
    }),
  };
}

/**
 * 组合多个结构化数据到一个数组中
 */
export function combineStructuredData(...schemas: Record<string, any>[]): Record<string, any>[] {
  return schemas.filter(Boolean);
}

/**
 * 生成SoftwareApplication类型的结构化数据（与Product并列，显式使用）
 */
export function generateSoftwareApplicationSchema(options: {
  name: string;
  url: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  image?: string;
  offers?: { price: string; priceCurrency: string };
}): Record<string, any> {
  const { name, url, description, applicationCategory = 'DesignApplication', operatingSystem = 'Web browser', image, offers } = options;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': name,
    'url': url,
    'description': description,
    'applicationCategory': applicationCategory,
    'operatingSystem': operatingSystem,
    ...(image && { 'image': image }),
    ...(offers && { 'offers': { '@type': 'Offer', 'price': offers.price, 'priceCurrency': offers.priceCurrency } })
  };
}

/**
 * 生成CreativeWorkSeries类型的结构化数据（用于教程系列/专栏）
 */
export function generateCreativeWorkSeriesSchema(options: {
  name: string;
  url: string;
  description: string;
  about?: string[];
  image?: string;
}): Record<string, any> {
  const { name, url, description, about = [], image } = options;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    'name': name,
    'url': url,
    'description': description,
    ...(about.length > 0 && { 'about': about.map(a => ({ '@type': 'Thing', 'name': a })) }),
    ...(image && { 'image': image })
  };
}
