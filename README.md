# Sontimo TV

Sontimo Games için Discord Activity tabanlı canlı YouTube izleme ekranı.

## Ne yapar?

- Discord sesli kanalında açılan aktivite içinde YouTube canlı yayınını oynatır.
- YouTube kanal ID'si `config.js` içinde tutulur.
- Bot tarafı canlı yayını algılar, kanalı `🔴 CANLI` yapar ve davet gönderir.

## Yerel test

```bash
npx serve .
```

## Yayınlama

GitHub Pages üzerinde yayınlanır. `config.js` içindeki `channelId` alanına
YouTube kanal ID'si (`UC...`) yazılır ve `main` dalına push edilir.

Discord Developer Portal > Uygulama > Activities bölümünde Activity URL'si
olarak GitHub Pages adresi girilmelidir.
