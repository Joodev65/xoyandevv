import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const BASE_URL = 'https://www.sankavollerei.com';
const CACHE = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function cache(key, data) {
  CACHE.set(key, { data, timestamp: Date.now() });
}

function getCache(key) {
  const entry = CACHE.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  CACHE.delete(key);
  return null;
}

function error(res, message, status = 500) {
  return res.status(status).json({
    status: 'error',
    message,
    statusCode: status,
    ok: false
  });
}

function success(res, data) {
  return res.status(200).json({
    status: 'success',
    creator: 'JjooooNime',
    statusCode: 200,
    statusMessage: 'OK',
    ok: true,
    data,
    pagination: data?.pagination || null
  });
}

async function fetchAPI(path) {
  const cacheKey = path;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    cache(cacheKey, data);
    return data;
  } catch (err) {
    console.error('API Fetch Error:', err);
    throw err;
  }
}

function normalizeAnime(anime) {
  return {
    title: anime.title || '',
    poster: anime.poster || '',
    animeId: anime.animeId || anime.slug || '',
    href: anime.href || `/anime/anime/${anime.animeId || anime.slug}`,
    otakudesuUrl: anime.otakudesuUrl || '',
    episodes: anime.episodes || null,
    score: anime.score || '',
    status: anime.status || '',
    releaseDay: anime.releaseDay || '',
    latestReleaseDate: anime.latestReleaseDate || '',
    lastReleaseDate: anime.lastReleaseDate || '',
    studios: anime.studios || '',
    season: anime.season || '',
    duration: anime.duration || '',
    type: anime.type || 'TV',
    genreList: anime.genreList || []
  };
}

function normalizeEpisode(episode) {
  return {
    title: episode.title || '',
    eps: episode.eps || episode.episode || 0,
    date: episode.date || '',
    episodeId: episode.episodeId || '',
    href: episode.href || '',
    otakudesuUrl: episode.otakudesuUrl || ''
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, id, q, page = 1 } = req.query;

  if (!action) {
    return error(res, 'Action parameter is required', 400);
  }

  try {
    switch (action) {
      case 'home': {
        const data = await fetchAPI('/anime/home');
        const normalized = {
          ongoing: data.data?.ongoing?.animeList?.map(normalizeAnime) || [],
          completed: data.data?.completed?.animeList?.map(normalizeAnime) || [],
          schedule: data.data?.schedule || []
        };
        return success(res, normalized);
      }

      case 'anime': {
        if (!id) return error(res, 'Anime ID is required', 400);
        const data = await fetchAPI(`/anime/anime/${id}`);
        const anime = data.data;
        if (!anime) return error(res, 'Anime not found', 404);

        const normalized = {
          ...normalizeAnime(anime),
          japanese: anime.japanese || '',
          synopsis: anime.synopsis || { paragraphs: [], connections: [] },
          episodeList: anime.episodeList?.map(normalizeEpisode) || [],
          recommendedAnimeList: anime.recommendedAnimeList?.map(normalizeAnime) || [],
          batch: anime.batch || null
        };
        return success(res, normalized);
      }

      case 'watch':
      case 'episode': {
        if (!id) return error(res, 'Episode ID is required', 400);
        const data = await fetchAPI(`/anime/episode/${id}`);
        const ep = data.data;
        if (!ep) return error(res, 'Episode not found', 404);

        return success(res, {
          title: ep.title || '',
          animeId: ep.animeId || '',
          releaseTime: ep.releaseTime || '',
          defaultStreamingUrl: ep.defaultStreamingUrl || '',
          hasPrevEpisode: ep.hasPrevEpisode || false,
          prevEpisode: ep.prevEpisode || null,
          hasNextEpisode: ep.hasNextEpisode || false,
          nextEpisode: ep.nextEpisode || null,
          server: ep.server || { qualities: [] },
          downloadUrl: ep.downloadUrl || { qualities: [] },
          info: ep.info || {}
        });
      }

      case 'search': {
        if (!q) return error(res, 'Search query is required', 400);
        const data = await fetchAPI(`/anime/search/${encodeURIComponent(q)}`);
        const results = data.data?.animeList?.map(normalizeAnime) || [];
        return success(res, { animeList: results });
      }

      case 'schedule': {
        const data = await fetchAPI('/anime/schedule');
        const schedule = data.data?.map(day => ({
          day: day.day || '',
          anime_list: day.anime_list?.map(anime => ({
            title: anime.title || '',
            slug: anime.slug || '',
            url: anime.url || '',
            poster: anime.poster || ''
          })) || []
        })) || [];
        return success(res, { schedule });
      }

      case 'genres': {
        const data = await fetchAPI('/anime/genre');
        const genres = data.data?.genreList?.map(g => ({
          title: g.title || '',
          genreId: g.genreId || '',
          href: g.href || '',
          otakudesuUrl: g.otakudesuUrl || ''
        })) || [];
        return success(res, { genreList: genres });
      }

      case 'genre': {
        if (!id) return error(res, 'Genre ID is required', 400);
        const data = await fetchAPI(`/anime/genre/${id}?page=${page}`);
        const animeList = data.data?.animeList?.map(normalizeAnime) || [];
        return success(res, { 
          animeList,
          pagination: data.data?.pagination || {
            currentPage: parseInt(page),
            hasPrevPage: parseInt(page) > 1,
            prevPage: parseInt(page) > 1 ? parseInt(page) - 1 : null,
            hasNextPage: true,
            nextPage: parseInt(page) + 1,
            totalPages: 100
          }
        });
      }

      case 'completed': {
        const data = await fetchAPI(`/anime/complete-anime?page=${page}`);
        const animeList = data.data?.animeList?.map(normalizeAnime) || [];
        return success(res, {
          animeList,
          pagination: data.data?.pagination || {
            currentPage: parseInt(page),
            hasPrevPage: false,
            prevPage: null,
            hasNextPage: true,
            nextPage: 2,
            totalPages: 65
          }
        });
      }

      case 'ongoing': {
        const data = await fetchAPI(`/anime/ongoing-anime?page=${page}`);
        const animeList = data.data?.animeList?.map(normalizeAnime) || [];
        return success(res, {
          animeList,
          pagination: data.data?.pagination || {
            currentPage: parseInt(page),
            hasPrevPage: false,
            prevPage: null,
            hasNextPage: true,
            nextPage: 2,
            totalPages: 7
          }
        });
      }

      case 'movies': {
        const data = await fetchAPI('/anime/movie-anime');
        const animeList = data.data?.animeList?.map(normalizeAnime) || [];
        return success(res, { animeList });
      }

      case 'batch': {
        if (!id) return error(res, 'Batch ID is required', 400);
        const data = await fetchAPI(`/anime/batch/${id}`);
        const batch = data.data;
        if (!batch) return error(res, 'Batch not found', 404);

        return success(res, {
          title: batch.title || '',
          animeId: batch.animeId || '',
          poster: batch.poster || '',
          japanese: batch.japanese || '',
          type: batch.type || '',
          score: batch.score || '',
          episodes: batch.episodes || 0,
          duration: batch.duration || '',
          studios: batch.studios || '',
          producers: batch.producers || '',
          aired: batch.aired || '',
          credit: batch.credit || '',
          genreList: batch.genreList || [],
          downloadUrl: batch.downloadUrl || { formats: [] }
        });
      }

      case 'server': {
        if (!id) return error(res, 'Server ID is required', 400);
        const data = await fetchAPI(`/anime/server/${id}`);
        return success(res, { url: data.data?.url || '' });
      }

      case 'latest': {
        const data = await fetchAPI('/anime/home');
        const ongoing = data.data?.ongoing?.animeList?.map(normalizeAnime) || [];
        return success(res, { animeList: ongoing.slice(0, 12) });
      }

      case 'random': {
        const data = await fetchAPI('/anime/schedule');
        const allAnime = [];
        data.data?.forEach(day => {
          day.anime_list?.forEach(anime => {
            allAnime.push({
              title: anime.title || '',
              slug: anime.slug || '',
              url: anime.url || '',
              poster: anime.poster || ''
            });
          });
        });

        const shuffled = allAnime.sort(() => 0.5 - Math.random()).slice(0, 10);
        return success(res, { animeList: shuffled });
      }

      default:
        return error(res, `Unknown action: ${action}`, 400);
    }
  } catch (err) {
    console.error('Handler Error:', err);
    return error(res, err.message || 'Internal server error');
  }
}
