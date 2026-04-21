import type { WebsiteConfig } from "./types"

export function generateWebsiteHTML(config: WebsiteConfig): string {
  const { formData, generatedContent: c } = config
  const d = formData
  const primary = d.primaryColor || "#1E3A8A"
  const businessName = d.name || "Mi Negocio"
  const address = [d.address, d.neighborhood, `Madrid ${d.postalCode}`].filter(Boolean).join(", ")
  const phone = d.phone || ""
  const whatsapp = (d.whatsapp || d.phone || "").replace(/[^0-9]/g, "")
  const email = d.email || ""
  const mapsQuery = encodeURIComponent(address || `${businessName} Madrid`)
  const waMessage = encodeURIComponent(c.whatsappMessage || "Hola! Me gustaría obtener más información sobre vuestros servicios.")

  const fontMap: Record<string, string> = {
    poppins: "Poppins",
    roboto: "Roboto",
    playfair: "Playfair+Display",
  }
  const fontName = fontMap[d.fontFamily] || "Roboto"

  const services = (c.services || []).slice(0, 6)
  const testimonials = (c.testimonials || []).slice(0, 3)

  const socialLinks = [
    d.instagram ? `<a href="https://instagram.com/${d.instagram.replace("@", "")}" target="_blank" rel="noopener noreferrer" class="social-link">Instagram</a>` : "",
    d.facebook ? `<a href="${d.facebook.startsWith("http") ? d.facebook : "https://facebook.com/" + d.facebook}" target="_blank" rel="noopener noreferrer" class="social-link">Facebook</a>` : "",
    d.twitter ? `<a href="https://twitter.com/${d.twitter.replace("@", "")}" target="_blank" rel="noopener noreferrer" class="social-link">Twitter / X</a>` : "",
  ].filter(Boolean).join("")

  const schemaMarkup = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "description": c.metaDescription,
    "url": d.website || "",
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": d.address,
      "addressLocality": d.neighborhood || "Madrid",
      "addressRegion": "Madrid",
      "postalCode": d.postalCode || "",
      "addressCountry": "ES"
    },
    "openingHours": d.openingHours,
    "image": "",
    "priceRange": "€€",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.4168",
      "longitude": "-3.7038"
    },
    "sameAs": [
      d.instagram ? `https://instagram.com/${d.instagram.replace("@", "")}` : null,
      d.facebook || null,
    ].filter(Boolean)
  })

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${c.metaDescription || ""}" />
  <meta name="keywords" content="${c.keywords || ""}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="${businessName} — Madrid" />
  <meta property="og:description" content="${c.metaDescription || ""}" />
  <meta property="og:type" content="business.business" />
  <meta property="og:locale" content="es_ES" />
  <title>${businessName} | ${c.tagline || "Negocio en Madrid"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <script type="application/ld+json">${schemaMarkup}</script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${primary};
      --primary-dark: color-mix(in srgb, ${primary} 80%, black);
      --primary-light: color-mix(in srgb, ${primary} 15%, white);
      --gold: #D4AF37;
      --dark: #0F172A;
      --surface: #FAFAFA;
      --white: #FFFFFF;
      --text: #374151;
      --muted: #6B7280;
      --border: #E5E7EB;
      --font-heading: '${fontName}', 'Inter', sans-serif;
      --font-body: 'Inter', '${fontName}', sans-serif;
      --radius: 12px;
      --shadow: 0 4px 24px rgba(0,0,0,0.08);
      --shadow-lg: 0 8px 48px rgba(0,0,0,0.12);
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-body);
      color: var(--text);
      background: var(--surface);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    img { max-width: 100%; height: auto; display: block; }
    a { text-decoration: none; color: inherit; }

    /* ── HEADER ────────────────────────────────────────────────────── */
    .header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 var(--border), 0 2px 16px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.15rem;
      color: var(--primary);
      text-decoration: none;
    }
    .logo-icon {
      width: 36px;
      height: 36px;
      background: var(--primary);
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    nav { display: flex; align-items: center; gap: 6px; }
    nav a {
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--muted);
      transition: all 0.2s;
    }
    nav a:hover { background: var(--primary-light); color: var(--primary); }
    .btn-nav-cta {
      padding: 9px 20px;
      background: var(--gold);
      color: var(--dark);
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 700;
      font-family: var(--font-heading);
      transition: all 0.2s;
      box-shadow: 0 2px 12px rgba(212,175,55,0.30);
    }
    .btn-nav-cta:hover { background: #E8C84A; transform: translateY(-1px); }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      border: none;
      background: transparent;
    }
    .hamburger span {
      width: 22px;
      height: 2px;
      background: var(--dark);
      border-radius: 2px;
      transition: all 0.3s;
    }
    .mobile-menu {
      display: none;
      position: fixed;
      top: 68px; left: 0; right: 0;
      background: white;
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      z-index: 999;
    }
    .mobile-menu.open { display: flex; flex-direction: column; gap: 4px; }
    .mobile-menu a {
      display: block;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text);
    }
    .mobile-menu a:hover { background: var(--primary-light); color: var(--primary); }
    .mobile-menu .btn-mobile-cta {
      margin-top: 8px;
      padding: 14px;
      background: var(--gold);
      color: var(--dark);
      text-align: center;
      border-radius: 10px;
      font-weight: 700;
    }

    /* Lang Toggle */
    .lang-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--primary-light);
      border-radius: 8px;
      padding: 4px;
    }
    .lang-btn {
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary);
      transition: all 0.2s;
    }
    .lang-btn.active {
      background: var(--primary);
      color: white;
    }

    /* ── HERO ────────────────────────────────────────────────────────── */
    .hero {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding-top: 68px;
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="80" cy="20" r="40" fill="rgba(255,255,255,0.03)"/><circle cx="10" cy="80" r="60" fill="rgba(255,255,255,0.02)"/></svg>') no-repeat;
      background-size: cover;
    }
    .hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 24px;
      position: relative;
      z-index: 1;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 100px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.9);
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 28px;
    }
    .hero-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--gold);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }
    .hero h1 {
      font-family: var(--font-heading);
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.1;
      color: white;
      margin-bottom: 20px;
      max-width: 700px;
    }
    .hero h1 .highlight { color: var(--gold); }
    .hero-sub {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: rgba(255,255,255,0.8);
      max-width: 560px;
      margin-bottom: 40px;
      line-height: 1.65;
    }
    .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 56px; }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: var(--gold);
      color: var(--dark);
      border-radius: var(--radius);
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.25s;
      box-shadow: 0 4px 24px rgba(212,175,55,0.35);
      border: none;
      cursor: pointer;
    }
    .btn-primary:hover { background: #E8C84A; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(212,175,55,0.45); }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 16px 32px;
      background: rgba(255,255,255,0.1);
      color: white;
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 1rem;
      border: 2px solid rgba(255,255,255,0.3);
      transition: all 0.25s;
      cursor: pointer;
    }
    .btn-secondary:hover { background: rgba(255,255,255,0.18); transform: translateY(-1px); }

    /* Hero stats */
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      max-width: 600px;
    }
    .stat-value {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--gold);
    }
    .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.6); margin-top: 2px; }

    /* ── SECTIONS COMMON ────────────────────────────────────────────── */
    section { padding: 96px 24px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-tag {
      display: inline-block;
      padding: 6px 16px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 100px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .section-title {
      font-family: var(--font-heading);
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      font-weight: 800;
      color: var(--dark);
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .section-sub {
      color: var(--muted);
      font-size: 1.05rem;
      max-width: 540px;
      line-height: 1.65;
    }
    .section-header { margin-bottom: 56px; }
    .section-header.center { text-align: center; }
    .section-header.center .section-sub { margin: 0 auto; }

    /* ── ABOUT ───────────────────────────────────────────────────────── */
    .about { background: white; }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 72px;
      align-items: center;
    }
    .about-image {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      aspect-ratio: 4/3;
      background: var(--primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .about-image-placeholder {
      text-align: center;
      color: var(--primary);
      padding: 32px;
    }
    .about-image-placeholder svg { width: 64px; height: 64px; margin: 0 auto 16px; opacity: 0.5; }
    .about-image-placeholder p { font-size: 0.9rem; color: var(--muted); }
    .about-text p {
      color: var(--text);
      margin-bottom: 16px;
      line-height: 1.75;
      font-size: 1rem;
    }
    .about-text p:last-child { margin-bottom: 0; }
    .about-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 28px;
      padding: 14px 28px;
      background: var(--primary);
      color: white;
      border-radius: var(--radius);
      font-weight: 700;
      font-family: var(--font-heading);
      transition: all 0.25s;
    }
    .about-cta:hover { background: var(--primary-dark); transform: translateY(-1px); }

    /* ── SERVICES ────────────────────────────────────────────────────── */
    .services-bg { background: var(--surface); }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .service-card {
      background: white;
      border-radius: 16px;
      padding: 28px 24px;
      border: 1px solid var(--border);
      transition: all 0.3s;
    }
    .service-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--primary);
    }
    .service-icon {
      font-size: 2.2rem;
      margin-bottom: 16px;
      display: block;
    }
    .service-name {
      font-family: var(--font-heading);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 10px;
    }
    .service-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }

    /* ── GALLERY ─────────────────────────────────────────────────────── */
    .gallery { background: white; }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .gallery-item {
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 4/3;
      background: var(--primary-light);
      position: relative;
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .gallery-item:hover img { transform: scale(1.05); }
    .gallery-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-light), rgba(212,175,55,0.1));
      color: var(--primary);
      font-size: 2.5rem;
    }

    /* ── TESTIMONIALS ────────────────────────────────────────────────── */
    .testimonials-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    }
    .testimonials-section .section-title { color: white; }
    .testimonials-section .section-tag {
      background: rgba(255,255,255,0.15);
      color: rgba(255,255,255,0.9);
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .testimonial-card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(8px);
      border-radius: 16px;
      padding: 28px;
      border: 1px solid rgba(255,255,255,0.15);
    }
    .stars { color: var(--gold); font-size: 1rem; margin-bottom: 16px; letter-spacing: 2px; }
    .testimonial-text {
      color: rgba(255,255,255,0.88);
      font-size: 0.93rem;
      line-height: 1.7;
      margin-bottom: 20px;
      font-style: italic;
    }
    .testimonial-author { display: flex; align-items: center; gap: 12px; }
    .author-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--gold);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--dark);
      flex-shrink: 0;
    }
    .author-name { font-weight: 600; color: white; font-size: 0.9rem; }
    .author-location { color: rgba(255,255,255,0.55); font-size: 0.78rem; margin-top: 2px; }

    /* ── CONTACT ─────────────────────────────────────────────────────── */
    .contact-section { background: var(--surface); }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    .contact-info { display: flex; flex-direction: column; gap: 20px; }
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 14px;
      border: 1px solid var(--border);
    }
    .contact-item-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: var(--primary-light);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 1.2rem;
    }
    .contact-item-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .contact-item-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--dark);
    }
    .contact-item-value a { color: var(--primary); }
    .maps-embed {
      border-radius: 16px;
      overflow: hidden;
      height: 100%;
      min-height: 380px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
    }
    .maps-embed iframe { width: 100%; height: 100%; border: none; }

    .btn-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 28px;
      background: #25D366;
      color: white;
      border-radius: var(--radius);
      font-weight: 700;
      font-family: var(--font-heading);
      font-size: 0.95rem;
      transition: all 0.25s;
      box-shadow: 0 4px 20px rgba(37,211,102,0.30);
    }
    .btn-whatsapp:hover { background: #20BA5A; transform: translateY(-2px); }

    .btn-call {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 28px;
      background: var(--primary);
      color: white;
      border-radius: var(--radius);
      font-weight: 700;
      font-family: var(--font-heading);
      font-size: 0.95rem;
      transition: all 0.25s;
    }
    .btn-call:hover { background: var(--primary-dark); transform: translateY(-2px); }

    .contact-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 24px; }

    /* ── FOOTER ─────────────────────────────────────────────────────── */
    footer {
      background: var(--dark);
      color: rgba(255,255,255,0.7);
      padding: 56px 24px 32px;
    }
    .footer-inner { max-width: 1200px; margin: 0 auto; }
    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }
    .footer-brand h3 {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 800;
      color: white;
      margin-bottom: 12px;
    }
    .footer-brand p { font-size: 0.9rem; line-height: 1.65; max-width: 300px; }
    .footer-col h4 {
      font-family: var(--font-heading);
      font-size: 0.8rem;
      font-weight: 700;
      color: rgba(255,255,255,0.4);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 16px;
    }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul li { font-size: 0.88rem; }
    .footer-col ul li a { color: rgba(255,255,255,0.65); transition: color 0.2s; }
    .footer-col ul li a:hover { color: var(--gold); }
    .social-link {
      display: inline-block;
      padding: 6px 14px;
      background: rgba(255,255,255,0.08);
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
      margin-right: 6px;
      margin-bottom: 6px;
      transition: all 0.2s;
    }
    .social-link:hover { background: var(--gold); color: var(--dark); }
    .footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 28px; }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.35);
    }
    .footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }
    .footer-legal a { color: rgba(255,255,255,0.35); transition: color 0.2s; }
    .footer-legal a:hover { color: var(--gold); }

    /* ── WHATSAPP FAB ────────────────────────────────────────────────── */
    .whatsapp-fab {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 900;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #25D366;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.45);
      transition: all 0.3s;
      cursor: pointer;
      text-decoration: none;
    }
    .whatsapp-fab:hover { transform: scale(1.12) translateY(-2px); background: #20BA5A; }
    .whatsapp-fab svg { width: 30px; height: 30px; fill: white; }

    /* ── COOKIE BANNER ──────────────────────────────────────────────── */
    .cookie-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 990;
      background: var(--dark);
      color: rgba(255,255,255,0.85);
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.2);
    }
    .cookie-banner.hidden { display: none; }
    .cookie-text { font-size: 0.85rem; line-height: 1.5; max-width: 700px; }
    .cookie-text a { color: var(--gold); text-decoration: underline; }
    .btn-cookie {
      padding: 10px 24px;
      background: var(--gold);
      color: var(--dark);
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.85rem;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .btn-cookie:hover { background: #E8C84A; }

    /* ── RESPONSIVE ─────────────────────────────────────────────────── */
    @media (max-width: 1024px) {
      .about-grid { gap: 48px; }
      .services-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-top { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 768px) {
      section { padding: 72px 20px; }
      nav { display: none; }
      .hamburger { display: flex; }
      .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .about-grid { grid-template-columns: 1fr; }
      .about-image { order: -1; }
      .services-grid { grid-template-columns: 1fr; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .testimonials-grid { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      .maps-embed { min-height: 280px; }
      .footer-top { grid-template-columns: 1fr; gap: 32px; }
      .footer-bottom { flex-direction: column; text-align: center; }
      .lang-toggle { display: none; }
    }
    @media (max-width: 480px) {
      .hero h1 { font-size: 2rem; }
      .hero-ctas { flex-direction: column; }
      .hero-stats { grid-template-columns: repeat(2, 1fr); }
      .gallery-grid { grid-template-columns: 1fr; }
      .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
      .contact-ctas { flex-direction: column; }
      .btn-whatsapp, .btn-call { width: 100%; justify-content: center; }
    }

    /* ── LANG CONTENT ────────────────────────────────────────────────── */
    [data-lang="en"] { display: none; }
    body.lang-en [data-lang="es"] { display: none; }
    body.lang-en [data-lang="en"] { display: block; }
    body.lang-en .hero h1 [data-lang="en"],
    body.lang-en .hero-sub [data-lang="en"] { display: inline; }

    /* animations */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in { animation: fadeInUp 0.6s ease both; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
  </style>
</head>
<body>

  <!-- COOKIE BANNER -->
  <div class="cookie-banner" id="cookieBanner">
    <p class="cookie-text">
      Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias.
      Si continúa navegando, consideramos que acepta su uso. Más información en nuestra
      <a href="#aviso-legal">política de privacidad</a>.
    </p>
    <button class="btn-cookie" onclick="document.getElementById('cookieBanner').classList.add('hidden'); localStorage.setItem('cookies_accepted','1')">
      Aceptar cookies
    </button>
  </div>

  <!-- WHATSAPP FAB -->
  ${whatsapp ? `<a href="https://wa.me/${whatsapp}?text=${waMessage}" target="_blank" rel="noopener noreferrer" class="whatsapp-fab" aria-label="Contactar por WhatsApp">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.561 4.141 1.542 5.875L.057 23.5a.5.5 0 00.609.609l5.625-1.485A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.999a10 10 0 01-5.128-1.415l-.368-.219-3.81 1.006 1.006-3.81-.219-.368A9.996 9.996 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 9.999-10 9.999z"/></svg>
  </a>` : ""}

  <!-- HEADER -->
  <header class="header" id="mainHeader">
    <div class="header-inner">
      <a href="#" class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 28 28" fill="none" width="20" height="20">
            <rect x="3" y="18" width="5" height="7" rx="1" fill="#D4AF37"/>
            <rect x="10" y="12" width="5" height="13" rx="1" fill="white"/>
            <rect x="17" y="7" width="5" height="18" rx="1" fill="#D4AF37"/>
            <rect x="24" y="15" width="3" height="10" rx="1" fill="white" opacity="0.6"/>
            <path d="M4 18 L12 12 L19 7 L26 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        ${businessName}
      </a>

      <nav>
        <a href="#sobre-nosotros">Sobre Nosotros</a>
        <a href="#servicios">Servicios</a>
        <a href="#testimonios">Opiniones</a>
        <a href="#contacto">Contacto</a>
        ${d.language === "both" ? `<div class="lang-toggle">
          <button class="lang-btn active" id="btnEs" onclick="setLang('es')">ES</button>
          <button class="lang-btn" id="btnEn" onclick="setLang('en')">EN</button>
        </div>` : ""}
        ${whatsapp ? `<a href="https://wa.me/${whatsapp}?text=${waMessage}" target="_blank" class="btn-nav-cta">${c.ctaText || "Contactar"}</a>` : ""}
      </nav>

      <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Menú">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu">
    <a href="#sobre-nosotros" onclick="closeMobileMenu()">Sobre Nosotros</a>
    <a href="#servicios" onclick="closeMobileMenu()">Servicios</a>
    <a href="#testimonios" onclick="closeMobileMenu()">Opiniones</a>
    <a href="#contacto" onclick="closeMobileMenu()">Contacto</a>
    ${whatsapp ? `<a href="https://wa.me/${whatsapp}?text=${waMessage}" target="_blank" class="btn-mobile-cta">${c.ctaText || "Contactar Ahora"}</a>` : ""}
  </div>

  <!-- HERO -->
  <section class="hero" id="inicio">
    <div class="hero-inner">
      <div class="hero-badge fade-in">
        <span class="hero-badge-dot"></span>
        <span>${d.neighborhood ? d.neighborhood + " · Madrid" : "Madrid, España"}</span>
      </div>

      <h1 class="fade-in delay-1">
        <span data-lang="es">${c.heroTitle || businessName}</span>
        <span data-lang="en" style="display:none">${c.heroTitleEn || businessName}</span>
        <br/>
        <span class="highlight">${c.tagline || ""}</span>
      </h1>

      <p class="hero-sub fade-in delay-2">
        <span data-lang="es">${c.heroSubtitle || ""}</span>
        <span data-lang="en" style="display:none">${c.heroSubtitleEn || ""}</span>
      </p>

      <div class="hero-ctas fade-in delay-3">
        ${whatsapp ? `<a href="https://wa.me/${whatsapp}?text=${waMessage}" target="_blank" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.139.561 4.141 1.542 5.875L.057 23.5a.5.5 0 00.609.609l5.625-1.485A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          <span data-lang="es">${c.ctaText || "Contactar Ahora"}</span>
          <span data-lang="en" style="display:none">${c.ctaTextEn || "Contact Now"}</span>
        </a>` : ""}
        <a href="#servicios" class="btn-secondary">
          <span data-lang="es">Ver nuestros servicios</span>
          <span data-lang="en" style="display:none">View our services</span>
        </a>
      </div>

      <div class="hero-stats fade-in">
        <div>
          <div class="stat-value">100%</div>
          <div class="stat-label"><span data-lang="es">Profesional</span><span data-lang="en" style="display:none">Professional</span></div>
        </div>
        <div>
          <div class="stat-value">24h</div>
          <div class="stat-label"><span data-lang="es">Respuesta</span><span data-lang="en" style="display:none">Response</span></div>
        </div>
        <div>
          <div class="stat-value">5★</div>
          <div class="stat-label"><span data-lang="es">Valoración</span><span data-lang="en" style="display:none">Rating</span></div>
        </div>
        <div>
          <div class="stat-value">Madrid</div>
          <div class="stat-label"><span data-lang="es">Local</span><span data-lang="en" style="display:none">Local</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about" id="sobre-nosotros">
    <div class="container">
      <div class="about-grid">
        <div class="about-image">
          <div class="about-image-placeholder">
            <svg viewBox="0 0 64 64" fill="none">
              <rect x="8" y="40" width="10" height="16" rx="2" fill="currentColor" opacity="0.3"/>
              <rect x="22" y="28" width="10" height="28" rx="2" fill="currentColor" opacity="0.5"/>
              <rect x="36" y="18" width="10" height="38" rx="2" fill="currentColor" opacity="0.7"/>
              <rect x="50" y="32" width="8" height="24" rx="2" fill="currentColor" opacity="0.4"/>
            </svg>
            <p>Añade aquí la foto de tu negocio</p>
          </div>
        </div>
        <div class="about-text">
          <span class="section-tag"><span data-lang="es">Sobre Nosotros</span><span data-lang="en" style="display:none">About Us</span></span>
          <h2 class="section-title">
            <span data-lang="es">${c.aboutTitle || "Quiénes Somos"}</span>
            <span data-lang="en" style="display:none">${c.aboutTitleEn || "Who We Are"}</span>
          </h2>
          ${(c.aboutParagraphs || []).map((p, i) => `
          <p data-lang="es">${p}</p>
          <p data-lang="en" style="display:none">${(c.aboutParagraphsEn || [])[i] || ""}</p>`).join("")}
          ${whatsapp ? `<a href="https://wa.me/${whatsapp}?text=${waMessage}" target="_blank" class="about-cta">
            <span data-lang="es">${c.ctaText || "Hablar con nosotros"}</span>
            <span data-lang="en" style="display:none">${c.ctaTextEn || "Talk to us"}</span>
            <span>→</span>
          </a>` : ""}
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="services-bg" id="servicios">
    <div class="container">
      <div class="section-header center">
        <span class="section-tag"><span data-lang="es">Servicios</span><span data-lang="en" style="display:none">Services</span></span>
        <h2 class="section-title"><span data-lang="es">Lo que ofrecemos</span><span data-lang="en" style="display:none">What we offer</span></h2>
        <p class="section-sub"><span data-lang="es">Servicios de calidad para tu negocio en Madrid.</span><span data-lang="en" style="display:none">Quality services for your business in Madrid.</span></p>
      </div>
      <div class="services-grid">
        ${services.map((s) => `
        <div class="service-card">
          <span class="service-icon">${s.icon || "⭐"}</span>
          <h3 class="service-name">
            <span data-lang="es">${s.name}</span>
            <span data-lang="en" style="display:none">${s.nameEn || s.name}</span>
          </h3>
          <p class="service-desc">
            <span data-lang="es">${s.description}</span>
            <span data-lang="en" style="display:none">${s.descriptionEn || s.description}</span>
          </p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- GALLERY -->
  <section class="gallery" id="galeria">
    <div class="container">
      <div class="section-header center">
        <span class="section-tag"><span data-lang="es">Galería</span><span data-lang="en" style="display:none">Gallery</span></span>
        <h2 class="section-title"><span data-lang="es">Nuestro espacio</span><span data-lang="en" style="display:none">Our space</span></h2>
      </div>
      <div class="gallery-grid">
        ${[1,2,3,4,5,6].map((i) => `
        <div class="gallery-item">
          <div class="gallery-placeholder">📸</div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonials-section" id="testimonios">
    <div class="container">
      <div class="section-header center">
        <span class="section-tag"><span data-lang="es">Testimonios</span><span data-lang="en" style="display:none">Reviews</span></span>
        <h2 class="section-title"><span data-lang="es">Lo que dicen nuestros clientes</span><span data-lang="en" style="display:none">What our clients say</span></h2>
      </div>
      <div class="testimonials-grid">
        ${testimonials.map((t) => `
        <div class="testimonial-card">
          <div class="stars">${"★".repeat(t.rating || 5)}</div>
          <p class="testimonial-text">
            <span data-lang="es">"${t.text}"</span>
            <span data-lang="en" style="display:none">"${t.textEn || t.text}"</span>
          </p>
          <div class="testimonial-author">
            <div class="author-avatar">${t.initials || "??"}</div>
            <div>
              <div class="author-name">${t.name}</div>
              <div class="author-location">${t.location || "Madrid"}</div>
            </div>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact-section" id="contacto">
    <div class="container">
      <div class="section-header">
        <span class="section-tag"><span data-lang="es">Contacto</span><span data-lang="en" style="display:none">Contact</span></span>
        <h2 class="section-title"><span data-lang="es">Habla con nosotros</span><span data-lang="en" style="display:none">Get in touch</span></h2>
        <p class="section-sub"><span data-lang="es">Estamos en Madrid y listos para atenderte. Elige cómo prefieres contactarnos.</span><span data-lang="en" style="display:none">We are in Madrid and ready to assist you. Choose how you prefer to contact us.</span></p>
      </div>
      <div class="contact-grid">
        <div>
          <div class="contact-info">
            ${phone ? `<div class="contact-item">
              <div class="contact-item-icon">📞</div>
              <div>
                <div class="contact-item-label">Teléfono</div>
                <div class="contact-item-value"><a href="tel:${phone}">${phone}</a></div>
              </div>
            </div>` : ""}
            ${email ? `<div class="contact-item">
              <div class="contact-item-icon">✉️</div>
              <div>
                <div class="contact-item-label">Email</div>
                <div class="contact-item-value"><a href="mailto:${email}">${email}</a></div>
              </div>
            </div>` : ""}
            ${address ? `<div class="contact-item">
              <div class="contact-item-icon">📍</div>
              <div>
                <div class="contact-item-label">Dirección</div>
                <div class="contact-item-value">${address}</div>
              </div>
            </div>` : ""}
            ${d.openingHours ? `<div class="contact-item">
              <div class="contact-item-icon">🕐</div>
              <div>
                <div class="contact-item-label"><span data-lang="es">Horario</span><span data-lang="en" style="display:none">Opening hours</span></div>
                <div class="contact-item-value">${d.openingHours}</div>
              </div>
            </div>` : ""}
          </div>
          <div class="contact-ctas">
            ${whatsapp ? `<a href="https://wa.me/${whatsapp}?text=${waMessage}" target="_blank" class="btn-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.139.561 4.141 1.542 5.875L.057 23.5a.5.5 0 00.609.609l5.625-1.485A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              <span data-lang="es">WhatsApp</span><span data-lang="en" style="display:none">WhatsApp</span>
            </a>` : ""}
            ${phone ? `<a href="tel:${phone}" class="btn-call">
              📞 <span data-lang="es">Llamar ahora</span><span data-lang="en" style="display:none">Call now</span>
            </a>` : ""}
          </div>
        </div>
        <div class="maps-embed">
          <iframe
            src="https://maps.google.com/maps?q=${mapsQuery}&output=embed&z=16"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            title="Localización de ${businessName} en Madrid"
          ></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer id="aviso-legal">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <h3>${businessName}</h3>
          <p><span data-lang="es">${c.metaDescription || `${businessName} en Madrid. Servicio profesional y de confianza.`}</span><span data-lang="en" style="display:none">${c.metaDescriptionEn || ""}</span></p>
          ${socialLinks ? `<div style="margin-top:16px">${socialLinks}</div>` : ""}
        </div>
        <div class="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#testimonios">Opiniones</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <ul>
            ${phone ? `<li><a href="tel:${phone}">${phone}</a></li>` : ""}
            ${email ? `<li><a href="mailto:${email}">${email}</a></li>` : ""}
            ${address ? `<li>${address}</li>` : ""}
          </ul>
        </div>
      </div>
      <hr class="footer-divider"/>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} ${businessName}. Todos los derechos reservados.</p>
        <div class="footer-legal">
          <a href="#">Aviso Legal</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    // Cookie banner
    if (localStorage.getItem('cookies_accepted')) {
      document.getElementById('cookieBanner').classList.add('hidden');
    }

    // Language toggle
    function setLang(lang) {
      document.body.classList.toggle('lang-en', lang === 'en');
      document.getElementById('btnEs').classList.toggle('active', lang === 'es');
      document.getElementById('btnEn').classList.toggle('active', lang === 'en');
      // Update all lang spans correctly
      document.querySelectorAll('[data-lang="es"]').forEach(el => {
        el.style.display = lang === 'en' ? 'none' : '';
      });
      document.querySelectorAll('[data-lang="en"]').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
      });
    }

    // Mobile menu
    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('open');
    }

    // Smooth scroll offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 72;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // Header shadow on scroll
    window.addEventListener('scroll', function() {
      const header = document.getElementById('mainHeader');
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 24px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 1px 0 #E5E7EB, 0 2px 16px rgba(0,0,0,0.05)';
      }
    });

    // Intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .testimonial-card, .contact-item, .gallery-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  </script>
</body>
</html>`
}
