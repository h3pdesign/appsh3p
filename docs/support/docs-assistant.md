---
title: Docs assistant
description: A source-limited helper for finding answers in the h3p apps documentation.
---

# Docs assistant

This is a deliberately narrow helper for the documentation site. It points you to published h3p pages; it does not inspect private files, run commands, or send your content to an AI provider. For an interactive answer, search the site and include the linked page when opening a support request.

<div class="docs-helper" data-docs-helper>
  <label for="docs-helper-query">What are you trying to do?</label>
  <input id="docs-helper-query" type="search" placeholder="e.g. install Neon, compare apps, report a bug" autocomplete="off" data-docs-helper-input />
  <p class="docs-helper-status" data-docs-helper-status aria-live="polite">Try “install”, “privacy”, “release”, “Markdown”, or “support”.</p>
  <div class="docs-helper-results" data-docs-helper-results></div>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const root = document.querySelector('[data-docs-helper]')
  const input = root?.querySelector('[data-docs-helper-input]')
  const results = root?.querySelector('[data-docs-helper-results]')
  const status = root?.querySelector('[data-docs-helper-status]')
  if (!(input instanceof HTMLInputElement) || !(results instanceof HTMLElement) || !(status instanceof HTMLElement)) return
  const pages = [
    ['Install an app', 'Use an app installation guide and find the current access path.', '/apps/index', 'install access TestFlight'],
    ['Compare apps', 'Choose by platform, purpose, release status, and privacy model.', '/apps/compare', 'compare platform purpose privacy'],
    ['Code and Markdown help', 'Read the Neon Vision Editor overview, features, and writing guidance.', '/apps/neon-vision-editor/overview', 'code coding Markdown syntax writing'],
    ['Privacy and AI data', 'See the site-wide explanation of AI, local-first behavior, and data handling.', '/policies/ai-and-data', 'privacy AI data security'],
    ['Report a problem', 'Open the support path with the page and details that help reproduce the issue.', '/support/support-and-feedback', 'support bug issue feedback'],
    ['Release guidance', 'Find release documentation and the Release Assistant overview.', '/apps/release-assistant/overview', 'release workflow automation changelog']
  ]
  const render = () => {
    const query = input.value.trim().toLowerCase()
    const matches = query ? pages.filter((page) => `${page[0]} ${page[1]} ${page[3]}`.toLowerCase().includes(query)) : pages.slice(0, 4)
    results.innerHTML = matches.map((page) => `<a class="docs-helper-result" href="${page[2]}"><strong>${page[0]}</strong><span>${page[1]}</span></a>`).join('')
    status.textContent = query ? `${matches.length} source-limited suggestion${matches.length === 1 ? '' : 's'}` : 'Suggestions from this documentation site only.'
  }
  input.addEventListener('input', render)
  render()
})
</script>

<style>
.docs-helper { display: grid; gap: 10px; max-width: 720px; margin: 22px 0; padding: 18px; border: 1px solid var(--vp-c-divider); border-radius: 18px; background: var(--vp-c-bg-soft); }
.docs-helper label { font-weight: 700; }
.docs-helper input { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 11px 13px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.docs-helper input:focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.docs-helper-status { margin: 0; color: var(--vp-c-text-2); font-size: 13px; }
.docs-helper-results { display: grid; gap: 8px; }
.docs-helper-result { display: grid; gap: 3px; padding: 10px 12px; border: 1px solid var(--vp-c-divider); border-radius: 12px; text-decoration: none; }
.docs-helper-result span { color: var(--vp-c-text-2); font-size: 13px; }
</style>
