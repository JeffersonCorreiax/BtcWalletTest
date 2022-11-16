//Importando as dependencias
const bip39 = require("bip39");
const bip32 = require("bip32");
const bitcoin = require("bitcoinjs-lib");

//definir a rede, rede de testes do bitcoin

const network = bitcoin.networks.testnet


//derivação de carteiras HD - hierarquica deterministica
const path = `m/49'/1'/0'/0` //1' representa a testnet

//palavras que formam a seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path);
//conta nó a partir da raiz
let node = account.derive(0).derive(0);

//Gerar endereços
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address


console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);


