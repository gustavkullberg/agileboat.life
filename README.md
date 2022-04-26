# :motor_boat: Agilbåt.life :motor_boat:
Agilbåt.life is a concept and lifestyle of how to repair and reconstruct your boat in the most time and cost-efficient manner.

## Test, Qa and Prod Environment
[https://agilbåt.life](https://agilbåt.life)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CI / CD

The app is using [Vercel](https://vercel.com/gustavkullberg/agileboat-life) to manage deployments.

On push to 
- `master`, the app is deployed on vercel to main environment ([https://agilbåt.life](https://agilbåt.life))
- `other branch`, the app is deployed to a temporary deployment with a randomly generated prefix. Example: [https://agileboat-life-mlksfx84r-gustavkullberg.vercel.app/](https://agileboat-life-mlksfx84r-gustavkullberg.vercel.app/)
