> [!NOTE]
> Ideally you might want to read this page on the [rendered website here](https://nerdymomocat-templates.github.io/webtrotion-astro-notion-cms-website-blog/posts/introducing-webtrotion/) to get a feel of how it looks like.

---

**Table of Contents**
1. [Acknowledgements](#acknowledgements)
2. [Why Webtrotion](#why-webtrotion)
3. [Why Notion and Astro](#why-notion-and-astro)
4. [Key Features](#key-features)
    - [Demo](#demo)
5. [Quick start](#quick-start)
    - [Notion Setup](#notion-setup)
    - [Github Setup](#github-setup)
6. [Preview](#preview)
8. [Notion Properties](#notion-properties)
9. [Local Run](#local-run)
10. [Extra Configuration Options](#extra-configuration-options)
11. [License](#license)
12. [Notes](#notes)

---

Webtrotion is a simple to install, configurable to $n^{th}$ limit starter built with the [Astro framework](https://astro.build/) in conjunction with [Notion](notion://www.notion.so/). Use it to create an easy-to-use blog **or website.**

[(Skip to features and setup)](#key-features)

![Webtrotion Cat](https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog/assets/125716950/250af1ba-5bbf-4ce5-b8d4-bdec168ffe1e)

---

# Acknowledgements

This theme is built based off three major contributions:

1. [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus)
2. [notion-astro-blog](https://github.com/otoyo/astro-notion-blog)
3. [And this person on fiverr who got me 80% there on how to integrate notion into cactus theme](https://www.fiverr.com/franklinshera?source=inbox)

# Why Webtrotion

Webtrotion was built with the simple idea - most notion based builders, require at least one of these four things:

- A custom domain, or being willing to use a vercel like domain
- Just have blogposts be editable in Notion while pages are edited in the repo
- Require some third party tools, or are not free to use.
- Are not configurable because they are either based off third parties like [super.so](http://super.so) or the configuring requires editing multiple code files.

And I did not want that. We want something that converts well into a static site, can be hosted on github for free using the [github.io](http://github.io) domain, and can have both pages and blog posts and be configured pretty easily.

## Why Notion *and* Astro

- I use Notion for all my notes, and it did not make sense for me to download them into an md file, carefully figure out the logistics and push/pull with other SSGs like Quartro, Eleventy, Hugo or Jekyll.
- I could have used another CMS but again, I use Notion, and it is easier to keep the content in one place. Notion also comes with interesting affordances that other CMS don’t: WYSIWYG for various components, block level permissions (to add drafts to post text), easy collaboration etc.
- There are some NextJS options that kinda fulfill this criteria but I do not know NextJS and I did not want to figure it out at the moment, for example: [Notion Next](https://github.com/tangly1024/NotionNext), [Morethan-log](https://github.com/morethanmin/morethan-log), and [Notion-Blog-NextJs](https://github.com/samuelkraft/notion-blog-nextjs)

---

# Key Features

- Astro v3.0
- **Integrates with Notion to create a website and not just a blog**
- **Single file configuration**
- TailwindCSS Utility classes **with Notion Color Matching for everything.**
- Accessible, semantic HTML markup
- Responsive & SEO-friendly
- Dark / Light mode, using Tailwind and CSS variables **that can be modified using a single config file**
- [Satori](https://github.com/vercel/satori) for creating open graph png images **that includes your featured image**
- Pagination
- [Automatic RSS feed](https://docs.astro.build/en/guides/rss)
- [Webmentions](https://webmention.io/)
- **Giscus comments**
- Auto-generated sitemap
- [Pagefind](https://pagefind.app/) static search library integration
- [Astro Icon](https://github.com/natemoo-re/astro-icon) svg icon component
- **API request output caching on Github Actions for fast build times**
- **Mini blog streams (idea copied from [Linus’s stream](https://stream.thesephist.com/))**

## Demo

Check out the [Demo](https://nerdymomocat-templates.github.io/webtrotion-astro-notion-cms-website-blog/), hosted on Github using Github actions

# Quick start

## Notion Setup

1. Duplicate [this database](https://nerdymomocat.notion.site/169b6e632b7448529120599281265ac5?v=2281c7ec6d3b4ac0961770ae696d4141&pvs=4) into your Notion account. Remember to duplicate it as a standalone new page, rather than into an existing page.
2. Create a [Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion)
3. [Get your API secret](https://developers.notion.com/docs/create-a-notion-integration#get-your-api-secret)
4. Give your [integration permission to the complete database](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions) you just duplicated
5. Get your database id of the database you duplicated. Database id is the 32 character alphanumeric string right after your workspace in the URL. It is the easiest to get this ID on a web browser rather than the Notion app.
![Getting database id from Notion](https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog/assets/125716950/c05f4dfe-1665-4d71-b257-590330ce7817)

## Github Setup

1. Create a new repo from [this template](https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog/generate) if you want to have a one and done standalone repository. If you want to be able to access and sync changes made in the template to your repository, choose to [fork it instead](https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog/generate).

📝 If you ***do not choose to add a custom domain***, the name of your repository matters. If the name of the repository you create is **<username>.github.io**; your website will be accessible at <username>.github.io if you use github actions. If you use any other name, the website will instead be hosted at <username>.github.io/<reponame>.

⚠️ When you first fork the repository, you will see that the github action output fails. This is because we haven’t added or changed notion integration information. Don’t worry, once you add those, it will run successfully.

2. In your repository settings:
    1. Uncheck template repository if it is checked.
    2. Turn on **Discussions** in features to use **[Giscus](https://giscus.app/)**
    3. Go to **Actions → General** and set it to *Allow All*
    4. Go to **Pages** and set **Source** as **Github Actions**
    5. Go to **Environments** → **github-pages**; Scroll down to **Environment Secrets**, click Add New Secret. Set name as **NOTION_API_SECRET** and the value to the API secret you obtained in [Notion Setup](#notion-setup).
3. Set up giscus as mentioned on the website [giscus.app](http://giscus.app). Keep the script it produces open as we will use it in the next step.
4. Go back to your cloned (forked or created through a template) repository.
5. Open file **`constants-config.json`** in the web UI. This file is the complete setup file for your website. For now, we will make four major modifications:
    1. Change `DATABASE_ID` to your database id that you obtained from Notion.
    2. Add your name to `AUTHOR` (this is used for HTML semantics and OG image generation)
    3. Add your socials (you can also remove the value for `this-github-repo`)
    4. Add your giscus information to the `GISCUS` key. If you do not want you use Giscus, remove value for `data-repo` in `GISCUS` and that will disable the feature.
6. Save the file and commit+merge to the main repo.
7. The github action by default runs every 8 hours or on commits to the repo. This can be modified in `.github/astro.yml` file. You can choose any cron duration.


🥳 And we are done! You can access your website on **<username>.github.io** or <username>.github.io/<reponame> depending on what you chose. Checkout all [Supported blocks](https://nerdymomocat-templates.github.io/webtrotion-astro-notion-cms-website-blog/posts/supported-blocks/) but tl;dr all blocks are supported except child databases and child pages. This specific page will show up as insecure because it has a direct HTML injection.

📝 Remember, the cron schedule is by default set to every 8 hours. You can change it to run every 2 hours or if you want to push out a change immediately, you can also [manually run the github action](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow) if you are deploying on github. The workflow name is “Deploy Github Pages”.

# Preview
<img width="990" alt="Light Mode Preview" src="https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog/assets/125716950/1746ba04-5dc8-4c30-bf43-78903fec3684">
Light mode preview
<img width="971" alt="Dark Mode Preview" src="https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog/assets/125716950/ac25c6e1-6020-42cc-a562-65be122de7f2">
Dark mode preview

# Notion Properties

ℹ️ Pages or posts are only published if: their **Published** property is **checked *AND*** if the explicit publish date is empty or is before the current date.


| Property | Usage |
| --- | --- |
| Page | Title of the page or post being rendered |
| Tags | Tags displayed for the post |
| Excerpt | Description used in OG images and RSS feeds |
| Collection | Collection in which the post/page goes. Anything tagged with main or your MENU_PAGES_COLLECTION is rendered as a page. |
| Published | Your post or page is only published when you tick publish |
| FeaturedImage | Image used to generate your page’s or post’s open graph image |
| Specific Slug | The template generates a slug using formula, but if you want a specific slug, you can specify it here |
| Explicit Publish Date | By default, the formula considers the date notion page was created to be publish date. You can override it by setting a date for this property. |
| Explicit Publish Date | By default, the formula considers the date notion page was last edited to be last edited date. You can override it by setting a date for this property. |
| Rank | Want to order single pages (Updates before Papers?) Set rank in ascending order |
| Related Pages | Set up related pages. This property does not anything at the moment. But I plan to use it to show “Similar pages” footnote later. |
| Publish On | Filter for whether you want this page to be published on a particular website or deployment. You most likely won’t need it, but it is useful in conjunction with PUBLISH_ON_FILTER to have two websites from the same database. |

⚠️ **Don’t rename the columns of DB.** They are used in the astro code. You can reorder the columns or add any other columns you want.

# Local Run

You can run the code locally by cloning the repo.

```bash
cd folder
export NOTION_API_SECRET=YOUR_KEY_HERE
npm install
npm run build #we need to build once because that is when all icons are downloaded
npm run dev
```

# Extra configuration options

| Key | Value |
| --- | --- |
| PUBLIC_GA_TRACKING_ID | Your google tracking property id. Steps [here](https://support.google.com/analytics/answer/9304153?hl=en&ref_topic=14088998&sjid=1644955229874584087-NC). |
| WEBMENTION_API_KEY | Key obtained from https://webmention.io/ |
| WEBMENTION_LINK | Link obtained from https://webmention.io/ |
| CUSTOM_DOMAIN | If you want to host the site somewhere else |
| BASE_PATH | Or subdomain inside the custom domain |
| HTML_DIRECTIVE | Embed html code blocks that start with this line directly into the page |
| THEME | Colors for light mode and dark mode |
| fontFamily-Google Fonts | Combined URL link for all fonts you want to use from google fonts. Remember to escape spaces in font names if needed |
| NUMBER_OF_POSTS_PER_PAGE | Number of posts in a page for pagination purposes |
| ENABLE_LIGHTBOX | Set to true if you want people to be able to click on your image to open in a new tab |
| REQUEST_TIMEOUT_MS | Timeout for API requests |
| MENU_PAGES_COLLECTION | Collection select value in Notion database that decides if these are pages or blogposts. Set this to value you use for pages. |
| HEADING_BLOCKS | Which top-level blocks blocks should form the table of contents on right |
| PUBLISH_ON_FILTER | Publish on filter select value in Notion database to only publish pages that have that select value or are empty. Can be useful if you want to create two websites from the same database (lab website + personal website). |
| FULL_PREVIEW_COLLECTIONS | Stream like view, where each post is a mini-blog in the same page as a scrollable page instead of being links to individual pages. Any Collection name added to this list will be rendered as stream view. |
| HIDE_UNDERSCORE_SLUGS_IN_LISTS | If the slug starts with _, hide those in post lists, rss and sitemap, but still render them, so that you can share them |
| HOME_PAGE_SLUG | By default is set to “home” but can be anything that you want for the renderer to recognize which is your home page from the database |
| OG_SETUP | Refers to open graph setup or those images you see when you share links. By default, it includes excerpts, and creates two columns if featured image is available |
| OPTIMIZE_IMAGES | Converts images to next-gen formats like webp for more responsive sites |
| REDIRECTS | Intentional redirects, especially if you are moving systems that astro should redirect to |

# License

MIT

# Notes
- 📝 If you ***do not choose to add a custom domain***, the name of your repository matters. If the name of the repository you create is **<username>.github.io**; your website will be accessible at <username>.github.io if you use github actions. If you use any other name, the website will instead be hosted at <username>.github.io/<reponame>.
- ⚠️ **Don’t rename the columns of DB.** They are used in the astro code. You can reorder the columns or add any other columns you want.
- 📝 Remember, the cron schedule is by default set to every 8 hours. You can change it to run every 2 hours or if you want to push out a change immediately, you can also [manually run the github action](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow) if you are deploying on github. The workflow name is “Deploy Github Pages”.
- ℹ️ **Aggressive Caching**
Remember that the setup uses aggressive caching for github actions. These caches are public. If you want to remove caches, you can go to [github action workflow](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow) and manually delete the caches
