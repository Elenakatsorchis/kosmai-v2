import { brand } from "../data/brand.js?v=20260606-v2-ready";
import { homeContent } from "../data/homeContent.js?v=20260606-v2-ready";
import { aboutContent } from "../data/aboutContent.js?v=20260606-v2-ready";
import { methodIntro, methodSteps } from "../data/methodData.js?v=20260606-v2-ready";
import { ecosystemData } from "../data/ecosystemData.js?v=20260606-v2-ready";
import { differentiators, differentiatorsTitle } from "../data/differentiatorsData.js?v=20260606-v2-ready";
import { futureModules } from "../data/futureData.js?v=20260606-v2-ready";
import { escapeHtml, highlightWords, listChips, nl2Paragraphs } from "./utils.js?v=20260606-v2-ready";

function renderBrandMark() {
  return `
    <a class="brand-lockup" href="./" aria-label="${escapeHtml(brand.name)}">
      <img class="kosmai-logo" src="${escapeHtml(brand.logo.horizontal)}" alt="${escapeHtml(brand.logo.alt)}" />
    </a>
  `;
}

function renderHeader() {
  return `
    <header class="site-header" data-header>
      <div class="shell nav-shell">
        ${renderBrandMark()}
        <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="Abrir navegação">
          <span></span><span></span>
        </button>
        <nav class="site-nav" data-nav>
          ${brand.navigation
            .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
            .join("")}
        </nav>
      </div>
    </header>
  `;
}

function renderHero() {
  const { hero } = homeContent;

  return `
    <section class="hero section" id="top" aria-labelledby="hero-title">
      <div class="shell hero-grid">
        <div class="hero-copy reveal">
          ${hero.eyebrow ? `<p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>` : ""}
          <h1 id="hero-title">${escapeHtml(hero.headline)}</h1>
        </div>
        <div class="hero-visual reveal" aria-label="${escapeHtml(brand.assets.heroAlt)}">
          <img src="${escapeHtml(brand.assets.heroImage)}" alt="${escapeHtml(brand.assets.heroAlt)}" decoding="async" fetchpriority="high" />
          <div class="orbit-map" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div class="hero-narrative reveal">
          <p class="hero-subheadline">${escapeHtml(hero.subheadline)}</p>
          <p class="hero-complement">${escapeHtml(hero.complement)}</p>
          <div class="cta-row">
            <a class="button primary" href="${escapeHtml(hero.primaryCta.href)}">${escapeHtml(hero.primaryCta.label)}</a>
            <a class="button secondary" href="${escapeHtml(hero.secondaryCta.href)}">${escapeHtml(hero.secondaryCta.label)}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderManifesto() {
  const { manifesto } = homeContent;

  return `
    <section class="section manifesto" aria-label="${escapeHtml(manifesto.title)}">
      <div class="shell manifesto-grid">
        <div class="manifesto-copy reveal">
          ${manifesto.paragraphs
            .map((paragraph) => `<p>${highlightWords(paragraph, manifesto.highlightedWords)}</p>`)
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderChallenge() {
  const { challenge } = homeContent;

  return `
    <section class="section challenge" aria-labelledby="challenge-title">
      <div class="shell challenge-intro">
        <div class="section-heading reveal">
          <p class="eyebrow">${escapeHtml(challenge.eyebrow)}</p>
          <h2 id="challenge-title">${escapeHtml(challenge.title)}</h2>
        </div>
        <div class="section-body reveal">
          <p>${escapeHtml(challenge.text)}</p>
        </div>
      </div>
      <div class="shell challenge-grid">
        ${challenge.blocks
          .map(
            (block, index) => `
              <article class="insight-card reveal">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <p>${escapeHtml(block)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderMethod() {
  return `
    <section class="section method" id="metodo" aria-labelledby="method-title">
      <div class="shell section-heading centered reveal">
        <p class="eyebrow">Método</p>
        <h2 id="method-title">O Método KOSMAI</h2>
        <p>${escapeHtml(methodIntro)}</p>
      </div>
      <div class="shell method-track reveal">
        ${methodSteps
          .map(
            (step, index) => `
              <article class="method-step">
                <div class="step-index">${String(index + 1).padStart(2, "0")}</div>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderTrackCard(track, labels, index) {
  return `
    <article class="track-card">
      <header class="track-trigger">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(track.title)}</strong>
      </header>
      <div class="track-detail">
        <div class="detail-block">
          <small>${escapeHtml(labels.outcome)}</small>
          <p>${escapeHtml(track.outcome)}</p>
        </div>
        <div class="detail-grid">
          <div>
            <small>${escapeHtml(labels.formats)}</small>
            <div class="chip-row">${listChips(track.formats)}</div>
          </div>
          <div>
            <small>${escapeHtml(labels.sources)}</small>
            <div class="chip-row">${listChips(track.sources, "chip muted")}</div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderEcosystem() {
  const { ecosystem } = homeContent;
  const activeAudience = ecosystemData[0];

  return `
    <section class="section ecosystem" id="trilhas" aria-labelledby="ecosystem-title">
      <div class="shell ecosystem-heading reveal">
        <div>
          ${ecosystem.eyebrow ? `<p class="eyebrow">${escapeHtml(ecosystem.eyebrow)}</p>` : ""}
          <h2 id="ecosystem-title">${escapeHtml(ecosystem.title)}</h2>
        </div>
        <p>${escapeHtml(ecosystem.intro)}</p>
      </div>
      <div class="shell ecosystem-panel reveal" data-ecosystem>
        <aside class="audience-tabs" aria-label="Públicos">
          <div class="audience-helper">
            <p>${escapeHtml(ecosystem.helper)}</p>
          </div>
          <div role="tablist" aria-label="Públicos KOSMAI">
            ${ecosystemData
              .map(
                (item, index) => `
                  <button
                    type="button"
                    role="tab"
                    id="audience-tab-${index}"
                    aria-selected="${index === 0 ? "true" : "false"}"
                    aria-controls="audience-panel"
                    data-audience-index="${index}"
                  >
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <strong>${escapeHtml(item.audience)}</strong>
                  </button>
                `,
              )
              .join("")}
          </div>
        </aside>
        <div class="audience-content" id="audience-panel" role="tabpanel" aria-labelledby="audience-tab-0">
          <div class="audience-summary">
            <span>${escapeHtml(ecosystem.labels.tracks)}</span>
            <div class="audience-summary-copy">
              <h3 data-audience-title>${escapeHtml(activeAudience.audience)}</h3>
              <p data-audience-summary>${escapeHtml(activeAudience.summary)}</p>
            </div>
          </div>
          <div class="tracks-list" data-tracks-list>
            ${activeAudience.tracks.map((track, index) => renderTrackCard(track, ecosystem.labels, index)).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderJourneys() {
  const { journeys } = homeContent;

  return `
    <section class="section journeys" id="formatos" aria-labelledby="journeys-title">
      <div class="shell two-column">
        <div class="section-heading reveal">
          <p class="eyebrow">Formatos</p>
          <h2 id="journeys-title">${escapeHtml(journeys.title)}</h2>
        </div>
        <div class="section-body reveal">${nl2Paragraphs(journeys.text)}</div>
      </div>
      <div class="shell format-grid">
        ${journeys.formats
          .map(
            (format, index) => `
              <article class="format-card reveal">
                <span class="format-index">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>${escapeHtml(format.title)}</h3>
                  <p>${escapeHtml(format.text)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderKnowledge() {
  const { knowledge } = homeContent;

  return `
    <section class="section knowledge" aria-labelledby="knowledge-title">
      <div class="shell knowledge-layout">
        <div class="knowledge-copy reveal">
          <p class="eyebrow">Curadoria</p>
          <h2 id="knowledge-title">${escapeHtml(knowledge.title)}</h2>
          <p>${escapeHtml(knowledge.text)}</p>
        </div>
        <div class="knowledge-list reveal">
          ${knowledge.items
            .map(
              (item, index) => `
                <div>
                  <span>${String(index + 1).padStart(2, "0")}</span>
                  <p>${escapeHtml(item)}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderDifferentiators() {
  return `
    <section class="section differentiators" id="diferenciais" aria-labelledby="differentiators-title">
      <div class="shell section-heading reveal">
        <p class="eyebrow">Diferenciais</p>
        <h2 id="differentiators-title">${escapeHtml(differentiatorsTitle)}</h2>
      </div>
      <div class="shell differentiator-grid">
        ${differentiators
          .map(
            (item, index) => `
              <article class="differentiator-card reveal">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderEksd() {
  const { eksd } = homeContent;

  return `
    <section class="section eksd" aria-labelledby="eksd-title">
      <div class="shell eksd-panel reveal">
        <div class="eksd-brand">
          <img src="${escapeHtml(brand.endorsement.logo)}" alt="${escapeHtml(brand.endorsement.alt)}" loading="lazy" decoding="async" />
          <a href="${escapeHtml(brand.endorsement.websiteUrl)}" target="_blank" rel="noreferrer">${escapeHtml(brand.endorsement.website)}</a>
        </div>
        <div>
          <h2 id="eksd-title">${escapeHtml(eksd.title)}</h2>
          <p>${escapeHtml(eksd.text)}</p>
        </div>
      </div>
    </section>
  `;
}

function renderFutureModules() {
  return `
    <section class="future-strip" aria-label="Arquitetura preparada para expansão futura">
      <div class="shell future-inner reveal">
        <p>Arquitetura preparada para expansão</p>
        <div>${futureModules.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </div>
    </section>
  `;
}

function renderFinalCta() {
  const { finalCta } = homeContent;

  return `
    <section class="section final-cta" id="contato" aria-labelledby="contact-title">
      <div class="shell final-panel reveal">
        <div>
          <p class="eyebrow">Próximo passo</p>
          <h2 id="contact-title">${escapeHtml(finalCta.headline)}</h2>
          <p>${escapeHtml(finalCta.text)}</p>
        </div>
        <div class="contact-box">
          <a class="button primary" href="${escapeHtml(brand.contacts.emailUrl)}">${escapeHtml(finalCta.emailButton)}</a>
          <a class="button secondary light" href="${escapeHtml(brand.contacts.whatsappUrl)}" target="_blank" rel="noreferrer">${escapeHtml(finalCta.whatsappButton)}</a>
          <dl>
            <div>
              <dt>Telefone</dt>
              <dd>${escapeHtml(brand.contacts.phone)}</dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>${escapeHtml(brand.contacts.whatsapp)}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>${escapeHtml(brand.contacts.email)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="shell">
        ${renderBrandMark()}
        <div class="footer-copy">
          <p>${escapeHtml(brand.positioning)}</p>
          <a href="${escapeHtml(brand.social.linkedin)}" target="_blank" rel="noreferrer">LinkedIn KOSMAI</a>
        </div>
      </div>
    </footer>
  `;
}

function renderAboutHero() {
  const { hero } = aboutContent;

  return `
    <section class="section about-hero" id="top" aria-labelledby="about-title">
      <div class="shell about-hero-grid">
        <div class="section-heading reveal">
          <p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>
          <h1 id="about-title">${escapeHtml(hero.title)}</h1>
        </div>
        <div class="section-body reveal">
          <p>${escapeHtml(hero.text)}</p>
        </div>
      </div>
    </section>
  `;
}

function renderAboutSections() {
  return `
    <section class="section about-sections" aria-label="Visão e atuação da KOSMAI">
      <div class="shell about-section-grid">
        ${aboutContent.sections
          .map(
            (item) => `
              <article class="about-block reveal">
                <p class="eyebrow">${escapeHtml(item.eyebrow)}</p>
                <h2>${escapeHtml(item.title)}</h2>
                <p>${escapeHtml(item.text)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAboutMethod() {
  return `
    <section class="section method about-method" aria-labelledby="about-method-title">
      <div class="shell section-heading centered reveal">
        <p class="eyebrow">Método</p>
        <h2 id="about-method-title">${escapeHtml(aboutContent.methodTitle)}</h2>
        <p>${escapeHtml(methodIntro)}</p>
      </div>
      <div class="shell method-track reveal">
        ${methodSteps
          .map(
            (step, index) => `
              <article class="method-step">
                <div class="step-index">${String(index + 1).padStart(2, "0")}</div>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderFounderCard(founder) {
  const visual = founder.photo
    ? `<img src="${escapeHtml(founder.photo)}" alt="${escapeHtml(founder.name)}" loading="lazy" decoding="async" />`
    : `<div class="founder-placeholder" aria-hidden="true">${escapeHtml(founder.initials)}</div>`;

  return `
    <article class="founder-card reveal">
      ${visual}
      <div>
        <h3>${escapeHtml(founder.name)}</h3>
        <p>${escapeHtml(founder.role)}</p>
        <a href="${escapeHtml(founder.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </article>
  `;
}

function renderAboutExperience() {
  const { experience } = aboutContent;

  return `
    <section class="section about-experience" aria-labelledby="about-experience-title">
      <div class="shell two-column">
        <div class="section-heading reveal">
          <p class="eyebrow">${escapeHtml(experience.eyebrow)}</p>
          <h2 id="about-experience-title">${escapeHtml(experience.title)}</h2>
        </div>
        <div class="section-body reveal">
          <p>${escapeHtml(experience.intro)}</p>
        </div>
      </div>
      <div class="shell founder-grid">
        ${brand.founders.map((founder) => renderFounderCard(founder)).join("")}
      </div>
    </section>
  `;
}

export function renderSite() {
  return `
    ${renderHeader()}
    <main id="conteudo">
      ${renderHero()}
      ${renderManifesto()}
      ${renderEcosystem()}
      ${renderMethod()}
      ${renderChallenge()}
      ${renderJourneys()}
      ${renderDifferentiators()}
      ${renderEksd()}
      ${renderFinalCta()}
    </main>
    ${renderFooter()}
  `;
}

export function renderAboutSite() {
  return `
    ${renderHeader()}
    <main id="conteudo">
      ${renderAboutHero()}
      ${renderAboutSections()}
      ${renderAboutMethod()}
      ${renderAboutExperience()}
      ${renderFinalCta()}
    </main>
    ${renderFooter()}
  `;
}

export function renderTrackList(audienceIndex) {
  const labels = homeContent.ecosystem.labels;
  const audience = ecosystemData[audienceIndex] || ecosystemData[0];

  return {
    title: audience.audience,
    summary: audience.summary,
    html: audience.tracks.map((track, index) => renderTrackCard(track, labels, index)).join(""),
  };
}
