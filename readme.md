# Crowdfunding app in Solana blockchain using Anchor framework with minimal FE
<div align="center">
  <img height="170x" src="https://pbs.twimg.com/media/FVUVaO9XEAAulvK?format=png&name=small" />

  <h1>Anchor</h1>

  <p>
    <strong>Solana Sealevel Framework</strong>
  </p>

  <p>
    <a href="https://github.com/project-serum/anchor/actions"><img alt="Build Status" src="https://github.com/project-serum/anchor/actions/workflows/tests.yaml/badge.svg" /></a>
    <a href="https://project-serum.github.io/anchor/"><img alt="Tutorials" src="https://img.shields.io/badge/docs-tutorials-blueviolet" /></a>
    <a href="https://discord.gg/PDeRXyVURd"><img alt="Discord Chat" src="https://img.shields.io/discord/889577356681945098?color=blueviolet" /></a>
    <a href="https://opensource.org/licenses/Apache-2.0"><img alt="License" src="https://img.shields.io/github/license/project-serum/anchor?color=blueviolet" /></a>
  </p>
</div>

## Requirement
```
npm 
node 15+
solana 
anchor 0.25+
```
## Set up
On the root directory:
```
npm i
```
For the frontend part:
```
cd frontend
npm i
```

## Instruction
To build:
```
anchor build
```
To deploy:
```
anchor deploy
```
To run the frontend react app (to use the updated idl copy the updated idl from `target/idl/solcrowdfunding.json` to `frontend/src/idl.json` ):
```
cd frontend
npm start
``` 
