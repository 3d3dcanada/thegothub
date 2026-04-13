1. REST API (v3)

Primary production API.
Docs: https://docs.github.com/en/rest

Base URL:

https://api.github.com/


Auth: Personal Access Token (PAT)

Rate limit:

60 req/hr (unauthenticated)

5,000 req/hr (authenticated)

2. GraphQL API (v4)

More efficient for large aggregated queries.
Docs: https://docs.github.com/en/graphql

Endpoint:

https://api.github.com/graphql


Auth: Same Personal Access Token.

Better if:

You’re pulling repository metadata in bulk

You want fewer round trips

You want to shape responses precisely

3. GitHub Search API

Still part of REST, but different rate limits.

Example:

GET /search/repositories?q=stars:>1000


Rate limits (even with token):

30 requests/minute for search

If your app “scrapes all of GitHub,” it’s almost certainly using:

/search/repositories

/repos/:owner/:repo

/users

/languages

/readme

4. GitHub Archive / BigQuery (for massive indexing)

If you're truly indexing large portions of GitHub, the official scalable route is:

GH Archive

Google BigQuery public GitHub dataset

This is how large analytics platforms avoid REST rate limits.

Important Clarification

There is:

❌ No “global GitHub API key”

❌ No “scraping token”

❌ No project-specific crawler token

All third-party GitHub indexers (e.g., open source explorers) use:

Personal Access Tokens

Or GitHub Apps (server-to-server OAuth flow)

When You Would Use a GitHub App Instead

If this is production and multi-user:

Use a GitHub App:
https://github.com/settings/apps

GitHub Apps:

Get installation tokens

Have higher scaling limits

Are safer than PATs

Are meant for public apps