# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm run dev` - Start development server with cache cleaning
- `npm run build` - Production build with cache cleaning
- `npm run build:cached` - Build using existing cache (faster for iterative builds)
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run check` - Run Astro type checking

### Cache Management
The project uses extensive caching. During development:
- `predev` script automatically cleans cache folders
- Cache is stored in `tmp/` directory
- To manually clear cache: delete `tmp/` folder

## High-Level Architecture

### Core Stack
- **Astro** static site generator with TypeScript
- **Notion API** as headless CMS
- **Tailwind CSS** for styling
- **Pagefind** for search functionality

### Key Architectural Concepts

#### 1. Notion Integration Flow
```
Notion Database → API Client → Entry Cache → Page Generation → HTML Output
                              ↓
                        Block Renderer → Block HTML Cache
```

The system fetches content from Notion in two phases:
- **Entry fetching**: Gets page metadata and properties
- **Block fetching**: Gets page content blocks on-demand

#### 2. Custom Integration System
Custom Astro integrations in `src/integrations/` hook into the build lifecycle:
- **Pre-build**: Clean caches, prepare directories
- **During build**: Cache entries, download assets, render blocks
- **Post-build**: Generate search index, record timestamps

#### 3. Component Hierarchy
```
NotionBlocks.astro (orchestrator)
├── Paragraph, Heading1-3, Quote (text blocks)
├── NImage, Video, NAudio (media blocks)
├── Embed components (Twitter, YouTube, etc.)
└── RichText.astro (inline formatting handler)
```

Each Notion block type maps to a specific Astro component. The `NotionBlocks` component recursively renders nested content.

#### 4. Routing Strategy
- Dynamic catch-all routes handle Notion pages
- Special routes for posts, collections, and tags
- Pagination built into listing pages
- OG images generated on-demand via API route

### Configuration

All site configuration lives in `constants-config.json`:
- Database connection settings
- Feature flags (comments, search, analytics)
- Theme and styling options
- Social media links

Environment variable required:
- `NOTION_API_SECRET` - Notion integration token

### Development Tips

1. **Working with Notion Blocks**: When adding new block types, create a component in `src/components/notion-blocks/` and add the case to `NotionBlocks.astro`

2. **Caching Issues**: If content isn't updating, delete `tmp/` folder or use `npm run dev` which auto-cleans

3. **Testing Embeds**: Many embed components require API keys or proper URLs. Check `constants-config.json` for configuration

4. **Performance**: The build uses parallel processing. Keep async operations in integrations, not components

5. **Type Safety**: Notion API responses are typed in `src/lib/notion/responses.ts`. Update these when Notion API changes

### Task Management

Tasks and project TODOs are managed in `TODO.md` file. When working on this codebase:
- Check `TODO.md` for pending tasks and known issues
- Add new tasks or bugs to `TODO.md` as you discover them
- Mark completed tasks appropriately in the file

### Git Commit Guidelines

- Keep commit messages concise and to one line
- Write simple, clear commit messages without multi-line descriptions
- Example: `feat: Add rich animations to improve UX`

### Testing with Playwright

The project can be tested using Playwright MCP for visual regression testing and functionality verification:
- Use Playwright to capture screenshots before/after design changes
- Test interactive components and animations
- Verify responsive design across different viewport sizes
- Check that embeds and external content load properly