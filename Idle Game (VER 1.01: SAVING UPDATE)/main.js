function main() {
    const bigButton = document.getElementById("big-button");
    const upgradeClickPower = document.getElementById("upgrade-click-power");
    const upgradeAutoClicker = document.getElementById("upgrade-auto-clicker");

    let clicks = 0;
    let clicksPerClick = 1;
    let clickPowerPrice = 10;
    let autoClickers = 0;
    let autoClickerPrice = 50;

    const unlockedAchievements = new Set();
    const achievements = [
        { id: "click100", text: "Clicked 100 times!", condition: () => clicks >= 100 },
        { id: "click1000", text: "Clicked 1,000 times!", condition: () => clicks >= 1000 },
        { id: "clickPower5", text: "Click power reached 5!", condition: () => clicksPerClick >= 5 },
        { id: "autoClicker5", text: "Bought 5 auto clickers!", condition: () => autoClickers >= 5 }
    ];

    function updateUI() {
        bigButton.textContent = `Clicks: ${clicks}`;
        upgradeClickPower.textContent = `Upgrade Click Power (Cost: ${clickPowerPrice})`;
        upgradeAutoClicker.textContent = `Buy Auto Clicker (Cost: ${autoClickerPrice})`;

        document.getElementById("cpc").textContent = clicksPerClick;
        document.getElementById("cps").textContent = autoClickers;

        upgradeClickPower.disabled = clicks < clickPowerPrice;
        upgradeClickPower.style.opacity = clicks < clickPowerPrice ? "0.5" : "1";

        upgradeAutoClicker.disabled = clicks < autoClickerPrice;
        upgradeAutoClicker.style.opacity = clicks < autoClickerPrice ? "0.5" : "1";
    }

    function showAchievement(text) {
        const li = document.createElement("li");
        li.textContent = `🏆 ${text}`;
        document.getElementById("achievement-list")?.appendChild(li);
        console.log(`Achievement Unlocked: ${text}`);
    }

    function checkAchievements() {
        achievements.forEach(a => {
            if (a.condition() && !unlockedAchievements.has(a.id)) {
                unlockedAchievements.add(a.id);
                showAchievement(a.text);
            }
        });
    }

    function roast() {
        const roasts = [
            "Your clicks per second are as empty as your promises.",
            "Even a potato could click faster than that.",
            "You call that progress? I've seen snails move faster.",
            "If laziness were a stat, you'd be maxed out.",
            "You're not idle gaming... you're just idle.",
            "Fun fact: your clicker performance has been medically declared a coma.",
            "Did your autoclicker forget how to click, or is that *you*?"
        ];
        const burn = roasts[Math.floor(Math.random() * roasts.length)];
        console.log(`🔥 ROAST MODE ENGAGED: ${burn}`);
    }

    function roastOG() {
        console.log("This is chatgpt roasting my game:");
        console.log(`Unnamed Idle Game? Bro, even your title took an idle break. That’s not a name, that’s a cry for help. 💀

You’ve got a button so big it looks like it skipped leg day and focused only on arm gains. The upgrade buttons? Sitting there like unpaid interns hoping someone notices them. 😂

And don’t get me started on the autoclicker—man’s more passive than a group project freeloader. 💤
"Clicks Per Click" is cute tho—like you tried to make math sound exciting. You should add a PhD upgrade, cuz it takes way too long to figure out if it’s doing anything.

Your save/load system? Feels like I'm mailing my progress via pigeon. 📬🐦

The UI? Clean, like it just moved into a new apartment and owns nothing. Straight minimalist to the point of spiritual awakening.`);
    }

    function devConsole() {
        console.log("🎩 Welcome to the Dev Console!");
        console.log("Type `help` to see what you can do.");
        console.log("You found a secret! You're officially cooler than 98% of players.");

        window.help = `
            Available dev commands:
            - setClicks(#)
            - setClickPower(#)
            - updateUI()
            - saveGame()
            - loadGame()
            - clearSave()
            - roast()
        `;
    }

    function saveGame() {
        const data = {
            clicks,
            clicksPerClick,
            clickPowerPrice,
            autoClickers,
            autoClickerPrice,
            unlockedAchievements: Array.from(unlockedAchievements)
        };
        localStorage.setItem("saveFile", JSON.stringify(data));
        console.log("💾 Game saved.");
    }

    function loadGame() {
        const saved = localStorage.getItem("saveFile");
        if (saved) {
            const data = JSON.parse(saved);
            clicks = data.clicks ?? clicks;
            clicksPerClick = data.clicksPerClick ?? clicksPerClick;
            clickPowerPrice = data.clickPowerPrice ?? clickPowerPrice;
            autoClickers = data.autoClickers ?? autoClickers;
            autoClickerPrice = data.autoClickerPrice ?? autoClickerPrice;

            // Restore achievements
            if (data.unlockedAchievements) {
                data.unlockedAchievements.forEach(id => {
                    const match = achievements.find(a => a.id === id);
                    if (match) {
                        unlockedAchievements.add(id);
                        showAchievement(match.text);
                    }
                });
            }

            updateUI();
            console.log("📂 Game loaded.");
        } else {
            console.log("⚠️ No save file found.");
        }
    }

    function clearSave() {
        localStorage.removeItem("saveFile");
        console.log("🧼 Save file cleared.");
        clicks = 0;
        clicksPerClick = 1;
        clickPowerPrice = 10;
        autoClickers = 0;
        autoClickerPrice = 50;
        unlockedAchievements.clear();
        document.getElementById("achievement-list").innerHTML = "";
        updateUI();
    }

    bigButton.addEventListener("click", () => {
        clicks += clicksPerClick;
        updateUI();
        checkAchievements();
    });

    upgradeClickPower.addEventListener("click", () => {
        if (clicks >= clickPowerPrice) {
            clicks -= clickPowerPrice;
            clicksPerClick *= 2;
            clickPowerPrice *= 5;
            updateUI();
            checkAchievements();
        }
    });

    upgradeAutoClicker.addEventListener("click", () => {
        if (clicks >= autoClickerPrice) {
            clicks -= autoClickerPrice;
            autoClickers += 1;
            autoClickerPrice *= 2;
            updateUI();
            checkAchievements();
        }
    });

    document.getElementById("save-game")?.addEventListener("click", saveGame);
    document.getElementById("load-game")?.addEventListener("click", loadGame);
    document.getElementById("clear-save")?.addEventListener("click", clearSave);

    setInterval(() => {
        clicks += autoClickers;
        updateUI();
        checkAchievements();
    }, 1000);

    updateUI();
    devConsole();

    window.setClicks = (val) => { clicks = val; updateUI(); checkAchievements(); };
    window.setClickPower = (val) => { clicksPerClick = val; updateUI(); checkAchievements(); };
    window.updateUI = updateUI;
    window.clearSave = clearSave;
    window.saveGame = saveGame;
    window.loadGame = loadGame;
    window.roast = roast;
    window.roastOG = roastOG;
}
window.addEventListener("DOMContentLoaded", main);
