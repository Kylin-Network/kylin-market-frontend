# Kylin Oracle Market Front End

This is the front end for Kylin Oracle Market.
It's based on polkadot-js/apps.

## Development


To get started -

1. Clone the repo locally, via `git clone https://github.com/kylin-network/kylin-market-frontend`
2. Ensure that you have a recent LTS version of Node.js, for development purposes [Node >=10.13.0](https://nodejs.org/en/) is recommended.
3. Ensure that you have a recent version of Yarn, for development purposes [Yarn >=1.10.1](https://yarnpkg.com/docs/install) is required.
4. Install the dependencies by running `yarn`
5. Ready! Now you can launch the UI (assuming you have a local Polkadot Node running), via `yarn run start`
6. Access the UI via [http://localhost:3000](http://localhost:3000)

## Docker

You can run a docker container via -

```
docker run --rm -it --name polkadot-ui -e WS_URL=ws://someip:9944 -p 80:80 jacogr/polkadot-js-apps:latest
```

To build a docker container containing local changes -

```
docker build -t jacogr/polkadot-js-apps .
```

When using these Docker commands, you can access the UI via http://localhost:80 (or just http://localhost)
