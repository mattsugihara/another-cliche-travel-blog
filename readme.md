# Another cliché travel blog

This is just a place where I keep a journal of the places I go.

You can view it [here](http://anotherclichetravelblog.com).

## Installation

- Use homebrew to install whatever the latest version of Ruby is
- run `bundle install` to install the necessary gems

## To run

Run `bundle exec jekyll serve`

## To start a new trip

Run `python3 new_trip.py "<destination>"`

This creates `trips/<slug>/_posts/`, a `trips/<slug>/index.html` listing
page, and adds an entry to `_data/trips.yml` so the trip shows up in the
nav automatically. Flags: `--slug`, `--display-name`, `--cover-image`,
`--dry-run`.

## Writing a post

Post files live in `trips/<slug>/_posts/YYYY-MM-DD-title.md` - the date
comes from the filename. Front matter is just:

```
---
title: Some day
location: Bordeaux
---
```

`location` can be a single place, or a list for a day with multiple stops:
`location: [Bordeaux, Paris]`.

## Per-trip settings

Each trip's `trips/<slug>/index.html` holds a few optional front matter
fields, alongside `image`/`permalink`, that control how its day numbers
render:

- `start_at_zero: true` - day numbers start at 0 instead of 1
- `start_date: YYYY-MM-DD` - posts dated before this get no day number
  (for pre-trip filler posts, e.g. packing days before departure)
- `day_count: false` - disables day numbers for the whole trip (e.g.
  Shenanigans, which is a grab-bag of small outings, not one day-by-day trip)
