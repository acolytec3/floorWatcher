# A (completely serverless) Solana NFT Floor Price Notification Service

This is an experimental notification service for Solana NFT floor prices with the following goals:
1) Written entirely in the Deno runtime
2) Uses Deno Deploy only serverless functions for backend (cuz I don't want to run a server) 
3) Use Deno Fresh for a simple user front-end
4) Uses `ntfy.sh` for push notifications 
5) Uses Github Actions to trigger notifications

## Roadmap

- [ ] Build a front-end using Deno Fresh to allow users to subscribe to the notification service
- [ ] Allow users to create their own subscriptions
- [ ] Store subscriptions in FaunaDB
- [ ] Ensure scheduler endpoint only accepts incoming requests from Github
