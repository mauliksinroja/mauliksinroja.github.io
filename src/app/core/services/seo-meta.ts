import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Profile } from '../models';

const JSON_LD_ID = 'person-schema';

/**
 * Writes the page title, description, social share tags, canonical URL and
 * schema.org Person data. Runs during prerendering, so the static HTML that
 * search engines and link previews read already contains everything.
 */
@Injectable({ providedIn: 'root' })
export class SeoMeta {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(profile: Profile): void {
    const { seo, siteUrl } = profile;
    const shareImage = new URL(seo.shareImage, siteUrl).href;

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'author', content: profile.name });
    this.meta.updateTag({ name: 'theme-color', content: '#121212' });

    this.meta.updateTag({ property: 'og:type', content: 'profile' });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.shareDescription });
    this.meta.updateTag({ property: 'og:url', content: siteUrl });
    this.meta.updateTag({ property: 'og:image', content: shareImage });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: seo.twitterHandle });

    this.setCanonical(siteUrl);
    this.setPersonSchema(profile);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      head.appendChild(link);
    }
    link.href = url;
  }

  private setPersonSchema(profile: Profile): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      url: profile.siteUrl,
      email: `mailto:${profile.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.split(',')[0],
        addressRegion: profile.seo.region,
        addressCountry: profile.seo.countryCode,
      },
      knowsAbout: profile.seo.knowsAbout,
      alumniOf: profile.seo.alumniOf,
      sameAs: [
        profile.linkedIn.url,
        ...profile.socials.filter((s) => s.url.startsWith('https://')).map((s) => s.url),
        profile.upworkUrl,
      ],
    };

    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>(`script#${JSON_LD_ID}`);
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}
