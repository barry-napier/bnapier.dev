import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

export async function GET(context: APIContext) {
  const posts = await getCollection('writing', ({ data }) => !data.draft);

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Barry Napier',
    description: 'Writing about software engineering, AI, and technology.',
    site: context.site ?? 'https://bnapier.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      link: `/writing/${post.id}/`,
      content: sanitizeHtml(post.body ?? '', {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
    customData: '<language>en-us</language>',
  });
}
