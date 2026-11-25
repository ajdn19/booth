# Booth

Toronto nightclub tables, booked and negotiated. Guests pick a club, a night and a table, slide to make an offer to a promoter, then check out, split the deposit with their group and get a table pass.

This repo is built from the **Nightclub Table Booking App** design canvas (32 screens across four apps). The design source lives in [`design/`](design/) and is the reference for every screen.

| App | Status |
| --- | --- |
| Customer app (16 phone screens) | ✅ Built |
| Promoter console + phone app (desktop + 4 phone screens) | ✅ Built |
| Owner dashboard + phone app | Planned |
| Event host app | Planned |

All prices, ratings, promoters and chats are placeholder sample data from the design.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [React Router](https://reactrouter.com) for screen navigation
- Fonts: Archivo (display) and Instrument Sans (body) from Google Fonts
- Plain CSS tokens in `src/index.css`; screens keep the design's inline layout styles so they match the canvas 1:1

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

The customer app is phone-first. On a desktop browser it renders as a centered 430px column.

## Customer app routes

| Route | Screen |
| --- | --- |
| `/` | Discover Toronto |
| `/club` | Club page: night, table map, promoter, reviews |
| `/offer` | Slide to offer |
| `/requests` | My requests tonight |
| `/profile` | Profile & history |
| `/chat` | Chat with your promoter |
| `/checkout` | Bottles, add-ons, real total |
| `/booked` | You're booked |
| `/split` | Split the deposit with your group |
| `/pass` | Table pass & guest list |
| `/rate` | Rate your night |
| `/waitlist` | Sold out → waitlist |
| `/tonight` | Just opened & late deals |
| `/notifications` | Notifications |
| `/night-of` | Rides & your tab |
| `/settings` | Language, accessibility, payment |

## Promoter routes

| Route | Screen |
| --- | --- |
| `/promoter` | Promoter console (desktop): tonight's requests, table list, team chat |
| `/promoter/app` | Phone app: requests |
| `/promoter/app/chats` | Phone app: team and guest chats |
| `/promoter/app/guests` | Phone app: guest CRM |
| `/promoter/app/earnings` | Phone app: earnings & booking link |

## Project layout

```
design/                 design canvas source (.dc.html artboards + canvas.json)
scripts/dc-to-tsx.mjs   converts a design artboard into a starter React screen
src/lib/                shared hooks
src/screens/customer/   one component per customer screen
src/screens/promoter/   promoter console and phone app
```

## Next steps

- Port the owner and event host apps
- Pull shared pieces (tab bar, back button, pills, cards) into components
- Replace sample data with an API and shared booking state across screens
