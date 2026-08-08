const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 81; seed <= 90; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // wait for table to render
    await page.waitForSelector("td");

    const sum = await page.$$eval("td", tds =>
      tds.reduce((acc, td) => {
        const val = parseFloat(td.innerText);
        return isNaN(val) ? acc : acc + val;
      }, 0)
    );

    console.log(`Seed ${seed}: ${sum}`);
    total += sum;
  }

  console.log("FINAL TOTAL:", total);

  await browser.close();
})();
