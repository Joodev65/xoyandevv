# JjooooNime — Premium Anime Streaming

A modern, handcrafted anime streaming website built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies. Just premium UI and smooth performance.

## Features

- **Homepage** — Hero banner, latest updates, ongoing & completed anime, weekly schedule, genres
- **Anime Detail** — Full info, synopsis, episode list, recommendations, bookmark
- **Watch Page** — Professional player, server selector, quality selector, download links, episode navigation
- **Search** — Real-time search with debounce, genre filtering, pagination
- **Schedule** — Weekly anime release timeline with day tabs
- **History** — Continue watching, recently watched, progress tracking
- **Bookmarks** — Save favorites, sort by newest/oldest/A-Z
- **Settings** — Playback preferences, data management

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Vercel Serverless Function (Node.js)
- **API**: OtakuDesu API via Sanka Vollerei
- **Icons**: Lucide SVG (inline)
- **Fonts**: Inter, Poppins (Google Fonts)

## File Structure

```
/
├── index.html          # Homepage
├── anime.html          # Anime detail page
├── watch.html          # Watch/episode page
├── search.html         # Search & genre page
├── schedule.html       # Weekly schedule
├── history.html        # Watch history
├── bookmark.html       # Bookmarks
├── settings.html       # Settings
├── css/
│   └── style.css       # All styles (37KB)
├── js/
│   └── main.js         # All JavaScript (27KB)
├── api/
│   └── endpoint.js     # Vercel serverless API
└── README.md
```

## API Endpoints

All endpoints are served from `/api/endpoint?action=...`:

| Action | Parameters | Description |
|--------|-----------|-------------|
| `home` | — | Get ongoing & completed anime |
| `anime` | `id` | Get anime details |
| `watch` | `id` | Get episode streaming data |
| `search` | `q` | Search anime |
| `schedule` | — | Get weekly schedule |
| `genres` | — | Get all genres |
| `genre` | `id`, `page` | Get anime by genre |
| `completed` | `page` | Get completed anime |
| `ongoing` | `page` | Get ongoing anime |
| `movies` | — | Get movie anime |
| `batch` | `id` | Get batch download |
| `server` | `id` | Get server stream URL |
| `latest` | — | Get latest updates |
| `random` | — | Get random anime |

## Local Storage

- `jj_watch_history` — Watch history (max 50)
- `jj_bookmarks` — Saved bookmarks
- `jj_search_history` — Recent searches (max 10)
- `jj_theme` — Theme preference
- `jj_settings` — User settings
- `jj_continue_watching` — Continue watching (max 20)
- `jj_recently_viewed` — Recently viewed anime

## Design System

### Colors
- Background: `#070707`, `#0F0F0F`, `#151515`, `#181818`
- Primary: `#7C3AED` (Purple)
- Accent: `#8B5CF6`, `#3B82F6`, `#10B981`, `#EF4444`, `#FACC15`
- Text: `#FFFFFF`, `#9CA3AF`, `#6B7280`

### Features
- Glassmorphism cards with gradient borders
- Smooth hover animations (lift, scale, glow)
- Skeleton loading with shimmer effect
- Top progress loader
- Toast notifications
- Ripple button effects
- Keyboard navigation support
- Fully responsive (mobile, tablet, desktop, ultra-wide)

## Deployment

### Vercel
1. Push code to GitHub
2. Import to Vercel
3. Set framework preset to "Other"
4. Deploy

### Environment Variables
None required. The API uses the OtakuDesu endpoint directly.

## License

MIT License — Built with passion for the anime community.

## Credits

- API: [OtakuDesu](https://otakudesu.blog) via Sanka Vollerei
- Design: Inspired by Netflix, Crunchyroll, Apple TV+
- Icons: [Lucide](https://lucide.dev)
