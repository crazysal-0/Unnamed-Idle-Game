function main() {
    const bigButton = document.getElementById("big-button");
    const upgradeClickPower = document.getElementById("upgrade-click-power");
    const upgradeAutoClicker = document.getElementById("upgrade-auto-clicker");

    // Global game state
    window.clicks = 0;
    window.clicksPerClick = 1;
    window.clickPowerPrice = 10;

    window.autoClickers = 0;
    window.autoClickerPrice = 50;

    function updateUI() {
        bigButton.textContent = `Clicks: ${clicks}`;
        upgradeClickPower.textContent = `Upgrade Click Power (Cost: ${clickPowerPrice})`;
        upgradeAutoClicker.textContent = `Buy Auto Clicker (Cost: ${autoClickerPrice})`;

        // Button states
        upgradeClickPower.disabled = clicks < clickPowerPrice;
        upgradeClickPower.style.opacity = clicks < clickPowerPrice ? "0.5" : "1";

        upgradeAutoClicker.disabled = clicks < autoClickerPrice;
        upgradeAutoClicker.style.opacity = clicks < autoClickerPrice ? "0.5" : "1";
    }

    function devConsole() {
        console.log("Wow, you found the secret dev console! type help for a list of commands, there are hidden easter eggs too!");
        help = `
        Type setClicks(number) to set your click count.
        Type setClickPower(number) to set clicks per click.
        Type setAutoClickers(number)to set how many auto clickers you have.`;
    }

    // Console-accessible functions
    window.setClicks = function (value) {
        clicks = value;
        updateUI();
        console.log(`Clicks set to ${value}`);
    };

    window.setClickPower = function (value) {
        clicksPerClick = value;
        updateUI();
        console.log(`Click power set to ${value}`);
    };

    window.setAutoClickers = function (value) {
        autoClickers = value;
        updateUI();
        console.log(`Auto clickers set to ${value}`);
    };

    window.roast = function (value) {
        console.log("This is chatgpt roasting my game:")
        console.log("")
        console.log(`Unnamed Idle Game? Bro, even your title took an idle break. That’s not a name, that’s a cry for help. 💀

You’ve got a button so big it looks like it skipped leg day and focused only on arm gains. The upgrade buttons? Sitting there like unpaid interns hoping someone notices them. 😂

And don’t get me started on the autoclicker—man’s more passive than a group project freeloader. 💤
"Clicks Per Click" is cute tho—like you tried to make math sound exciting. You should add a PhD upgrade, cuz it takes way too long to figure out if it’s doing anything.

Your save/load system? Feels like I'm mailing my progress via pigeon. 📬🐦

The UI? Clean, like it just moved into a new apartment and owns nothing. Straight minimalist to the point of spiritual awakening.`)
    }

    bigButton.addEventListener("click", () => {
        clicks += clicksPerClick;
        updateUI();
    });

    upgradeClickPower.addEventListener("click", () => {
        if (clicks >= clickPowerPrice) {
            clicks -= clickPowerPrice;
            clicksPerClick *= 2;
            clickPowerPrice *= 5;
            updateUI();
        }
    });

    upgradeAutoClicker.addEventListener("click", () => {
        if (clicks >= autoClickerPrice) {
            clicks -= autoClickerPrice;
            autoClickers += 1;
            autoClickerPrice *= 2;
            updateUI();
        }
    });

    setInterval(() => {
        clicks += autoClickers;
        updateUI();
    }, 1000);

    updateUI();
    devConsole();
}

window.addEventListener("DOMContentLoaded", main);
