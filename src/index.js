const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const pkg = require("../package.json");
const qs = require("./helper/questions");
const storeKey = require("./helper/storeKey");
const tinypngKeys = require("./config/tinypngKeys");
const ImgMin = require("./imgMin");

program.version(pkg.version, "-v, --version");

program
  .command("imgMin")
  .alias("p")
  .option(
    "-k, --key [key]",
    `Tinypng's key. We will save your key if you entry it.`
  )
  .option(
    "-p, --path [path]",
    `Compress directory. By default, the /images in the current working directory are taken.
    Please enter an absolute path such as /Users/admin/Documents/xx...`
  )
  .description("Compress your images by tinypng.")
  .action(async options => {
    const conf = {};
    if (!options.key || typeof options.key !== "string") {
      if (!tinypngKeys.length) {
        console.log(
          chalk.red(
            `Please enter your tinypng's key by "gp p -k [key]" even once`
          )
        );
        return;
      }
      const answers = await inquirer.prompt(qs.choseKey);
      conf.key = answers.tinypngKey;
    } else {
      conf.key = options.key;
      // store the key
      storeKey(options.key);
    }

    if (options.path) {
      conf.imgMinPath = options.path;
    }

    const imgMin = new ImgMin(conf);
    imgMin.start();
  });

program
  .command("*")
  .description("Not supposed commander.")
  .action(() => program.help());

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}
