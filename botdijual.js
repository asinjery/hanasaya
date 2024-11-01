import fetch from 'node-fetch';
import readline from 'readline';
import { Telegraf, Markup } from 'telegraf'; // Mengimpor Markup untuk keyboard

// Membuat interface readline untuk pertanyaan
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mengambil input token bot dan chat ID dari pengguna
rl.question(`Input Token bot: `, (tokenbot) => {
  rl.question(`Input ChatID: `, (chatidtele) => {
    
    // Membuat bot Telegraf
    const bot = new Telegraf(tokenbot);
    const chatId = `${chatidtele}`;

    const sendMessageToTelegram = async (message) => {
      try {
        await bot.telegram.sendMessage(chatId, message);
      } catch (error) {
        console.error('Error sending message to Telegram:', error);
      }
    };

    const cekgrow = (cookie) => new Promise((resolve, reject) => {
      fetch('https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql', {
        method: 'POST',
        headers: {
          'accept': 'application/graphql-response+json, application/json',
          'accept-language': 'en-US,en;q=0.9',
          'authorization': cookie,
          'content-type': 'application/json',
          'origin': 'https://hanafuda.hana.network',
          'priority': 'u=1, i',
          'referer': 'https://hanafuda.hana.network/',
          'sec-ch-ua': '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 Edg/130.0.0.0'
        },
        body: JSON.stringify({
          'query': 'query GetGardenForCurrentUser {\n  getGardenForCurrentUser {\n    id\n    inviteCode\n    gardenDepositCount\n    gardenStatus {\n      id\n      activeEpoch\n      growActionCount\n      gardenRewardActionCount\n    }\n    gardenMilestoneRewardInfo {\n      id\n      gardenDepositCountWhenLastCalculated\n      lastAcquiredAt\n      createdAt\n    }\n    gardenMembers {\n      id\n      sub\n      name\n      iconPath\n      depositCount\n    }\n  }\n}',
          'operationName': 'GetGardenForCurrentUser'
        })
      })
      .then(res => res.json())
      .then(res => {
          resolve(res);
      })
      .catch(err => reject(err));
    });

    const genmodel = (cookie) => new Promise((resolve, reject) => {
      fetch('https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql', {
        method: 'POST',
        headers: {
          'accept': 'application/graphql-response+json, application/json',
          'accept-language': 'en-US,en;q=0.9',
          'authorization': cookie,
          'content-type': 'application/json',
          'origin': 'https://hanafuda.hana.network',
          'priority': 'u=1, i',
          'referer': 'https://hanafuda.hana.network/',
          'sec-ch-ua': '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 Edg/130.0.0.0'
        },
        body: JSON.stringify({
          'query': 'mutation issueGrowAction {\n  issueGrowAction\n}',
          'operationName': 'issueGrowAction'
        })
      })
      .then(res => res.json())
      .then(res => {
          resolve(res);
      })
      .catch(err => reject(err));
    });

    const getOTP1 = (cookie) => new Promise((resolve, reject) => {
      fetch('https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql', {
        method: 'POST',
        headers: {
          'accept': 'application/graphql-response+json, application/json',
          'accept-language': 'en-US,en;q=0.9',
          'authorization': cookie,
          'content-type': 'application/json',
          'origin': 'https://hanafuda.hana.network',
          'priority': 'u=1, i',
          'referer': 'https://hanafuda.hana.network/',
          'sec-ch-ua': '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 Edg/130.0.0.0'
        },
        body: JSON.stringify({
          'query': 'mutation commitGrowAction {\n  commitGrowAction\n}',
          'operationName': 'commitGrowAction'
        })
      })
      .then(res => res.json())
      .then(res => {
          resolve(res);
      })
      .catch(err => reject(err));
    });

    let cookie = '';
    let growCount = 0;
    let isCookieSet = false;
    let errorCount = 0;
    let isRunning = false;

    const drawLoadingBar = (current, total) => {
      const percentage = Math.round((current / total) * 100);
      const barLength = 30;
      const filledLength = Math.round(barLength * (current / total));
      const bar = '█'.repeat(filledLength) + '-'.repeat(barLength - filledLength);
      return { bar, percentage };
    };

    bot.start((ctx) => {
      ctx.reply('Selamat datang! Silakan masukkan cookie Anda dengan format: `/cookie <your_cookie>`', Markup.keyboard([
        ['Masukkan Cookie', 'Hentikan Proses']
      ]).oneTime().resize());
    });

    bot.hears('Masukkan Cookie', (ctx) => {
      ctx.reply('Silakan masukkan cookie Anda dengan format: `/cookie <your_cookie>`');
    });

    bot.hears('Hentikan Proses', (ctx) => {
      if (!isRunning) {
        ctx.reply('Tidak ada proses yang sedang berjalan.');
        return;
      }
      isCookieSet = false;
      isRunning = false;
      ctx.reply('Proses telah dihentikan.');
    });

    const withTimeout = (promise, ms) => {
      return new Promise((resolve, reject) => {
        const id = setTimeout(() => reject(new Error('Timeout')), ms);
        promise.then((value) => {
          clearTimeout(id);
          resolve(value);
        }, (error) => {
          clearTimeout(id);
          reject(error);
        });
      });
    };

    bot.on('text', async (ctx) => {
      if (!ctx.message.text.startsWith('/cookie')) {
        ctx.reply('Silakan masukkan cookie Anda dengan format: `/cookie <your_cookie>`');
        return;
      }

      cookie = ctx.message.text.split(' ').slice(1).join(' ');
      if (!cookie) {
        ctx.reply('Silakan berikan cookie yang valid.');
        return;
      }
      
      if (isRunning) {
        ctx.reply('Bot sedang berjalan. Silakan tunggu hingga proses selesai. Atau Klik hentikan pada menu dibawah');
        return;
      }

      isCookieSet = true;
      isRunning = true;
      ctx.reply('Cookie diterima! Sedang memeriksa jumlah grow...');

      await checkAndStartGacha(ctx);
    });

    const checkAndStartGacha = async (ctx) => {
      while (isCookieSet && isRunning) {
        try {
          const cektotalgrow = await withTimeout(cekgrow(cookie), 90000);
          growCount = cektotalgrow["data"]["getGardenForCurrentUser"]["gardenStatus"]["growActionCount"];
          
          if (growCount > 0) {
            ctx.reply(`Jumlah grow yang ditemukan: ${growCount}. Memulai proses gacha...`);
            await startGachaProcess(ctx);
          } else {
            ctx.reply('Tidak ada grow tersedia. Memeriksa kembali dalam 30 Menit');
            await new Promise(resolve => setTimeout(resolve, 1800000)); // Tunggu 30 menit
          }
        } catch (e) {
          ctx.reply('Terjadi kesalahan saat memeriksa jumlah grow. Silahkan update cookie!');
          return;
        }
      }
    };

    const startGachaProcess = async (ctx) => {
      let totalGacha = 0;
      for (let i = 0; i < growCount && isRunning; i++) {
        try {
          const resmodel = await genmodel(cookie);
          const rOTP = await getOTP1(cookie);
          const gacha = resmodel["data"]["issueGrowAction"];
          totalGacha += gacha;
          await sendMessageToTelegram(`BERHASIL GACHA: ${gacha}`);
          
          const { bar, percentage } = drawLoadingBar(i + 1, growCount);
          process.stdout.write(`\rBERHASIL GACHA \x1b[32m${gacha}\x1b[0m | Memuat: [${bar}] ${percentage}%`);
        } catch (e) {
          errorCount++;
          await sendMessageToTelegram(`TIMEOUT`);
          
          if (errorCount >= 5) {
            ctx.reply('Gacha dihentikan. Mohon perbarui cookie.');
            return;
          }
        }
      }
      
      console.log(`\nTotal gacha: \x1b[33m${totalGacha}\x1b[0m`);
      await sendMessageToTelegram(`Total gacha: ${totalGacha}`);
      ctx.reply('Proses gacha selesai! Kembali memeriksa jumlah grow dalam 30 Menit');
      await new Promise(resolve => setTimeout(resolve, 1800000)); // Tunggu 30 menit
      await checkAndStartGacha(ctx);
    };

    bot.launch({ timeout: 120 }).then(() => {
      console.log('Bot dimulai!');
    }).catch(err => {
      console.error('TIMEOUT');
    });

    rl.close(); // Menutup readline setelah semua input diambil
  });
});
